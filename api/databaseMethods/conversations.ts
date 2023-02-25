import {firestore} from "firebase-admin";
import {ConversationMemberRole, ConversationType} from "../../enums/conversations";
import {IConversation, IConversationMember} from "../../interfaces/conversations";
import {CONVERSATIONS, USERS} from "./COLLECTION_NAMES";
import * as crypto from "crypto";
import {ResponseError} from "../../enums/responses";
import {IPublicUserData, IUserData} from "../../interfaces/users";
import {AccessType} from "../../enums/user";
import {updateUserData} from "./user";
import {IError} from "../../interfaces/request";
import {
    checkGrossRole,
    checkRoleAccess,
    getConversationDataForCreate,
    getMemberDataByLogin
} from "../methods/conversation";
import {db} from "../../index";
import {getPublicUserDataByLoginList, getUserDataByLogin} from "./users";
import {checkIsFriendOf} from "../methods/user";
import Firestore = firestore.Firestore;
import QuerySnapshot = firestore.QuerySnapshot;
import members from "../conversation-api/members";

export const createConversation = function (
    db: Firestore,
    type: ConversationType,
    members: IConversationMember<any>[],
    name?: string
): Promise<IConversation<any>> {
    return new Promise<IConversation<any>>(async (resolve, reject) => {
        try {
            const id = crypto.randomUUID();
            const conversation: IConversation<any> = getConversationDataForCreate(
                id, type, members, name
            );
            members.forEach((member: IConversationMember<any>) => member.addedTime = Date.now())

            await db.collection(CONVERSATIONS).doc(id).set(conversation);
            resolve(conversation);
        }
        catch (error) {
            reject({ message: ResponseError.BAD_REQUEST })
        }
    })
}

export const checkMembersToCreateConversation = async function (
    db: Firestore,
    members: string[],
    withLogin: string
): Promise<IConversationMember<any>[] | false> {
    const conversationMembers: (IConversationMember<any>|boolean)[] = await Promise.all(members.map(async (login: string) => {
        const document = await db.collection(USERS).doc(login).get();
        const user: IUserData<string, string, string> = document.data() as IUserData<string, string, string>;
        if (user === undefined) return false;
        if (user.preferences.friends === AccessType.NO_ONE) return false;
        if (user.preferences.friends === AccessType.FRIENDS) {
            return user.personalInfo.friends.value.some((friend: string) => friend === withLogin);
        }
        return {
            login: user.login,
            role: ConversationMemberRole.SIMPLE
        };
    }));

    if (conversationMembers.every((member) => member)) {
        return conversationMembers as IConversationMember<any>[];
    } else {
        return false;
    }
}

export const getConversationData = function (
    db: Firestore,
    id: string,
    withLogin: string
): Promise<IConversation<any>> {
    return new Promise(async (resolve, reject) => {
        if (id && withLogin) {
            const conversation: IConversation<any> = (await db.collection(CONVERSATIONS).doc(id).get()).data() as IConversation<any>;
            return (conversation && conversation.members.some((member: IConversationMember<any>) => member.login === withLogin))
                ? resolve(conversation)
                : reject();
        }
        reject();
    })
}

export const setConversationToAllMembers = function (
    db: Firestore,
    members: IConversationMember<any>[],
    conversationId: string
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        await Promise.all(members.map(async (member: IConversationMember<any>) => {
            const document = await db.collection(USERS).doc(member.login).get();
            const user: IUserData<string, string, string> = document.data() as IUserData<string, string, string>;
            !user.conversations.some((id: string) => id === conversationId) && user.conversations.push(conversationId);
            return await updateUserData(db, user);
        }))

        resolve(true);
    })
}

export const updateConversationData = function (
    db: Firestore,
    conversation: IConversation<any>
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            await db.collection(CONVERSATIONS).doc(conversation.id).set(conversation);
            resolve(true);
        } catch (error: unknown) {
            reject({ message: (error as IError).message })
        }
    });
}

export const updateConversationField = function (
    db: Firestore,
    conversationId: string,
    field: { [key: string]: string }
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            await db.collection(CONVERSATIONS).doc(conversationId).update(field);
            resolve(true);
        } catch (error: unknown) {
            reject({ message: (error as IError).message })
        }
    });
}

export const deleteConversationFromAllMembers = function (
    db: Firestore,
    members: IConversationMember<any>[],
    conversationId: string
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        await Promise.all(members.map(async (member: IConversationMember<any>) => {
            const document = await db.collection(USERS).doc(member.login).get();
            const user: IUserData<string, string, string> = document.data() as IUserData<string, string, string>;
            user.conversations = user.conversations.filter((id: string) => id !== conversationId);
            return await updateUserData(db, user);
        }))

        resolve(true);
    })
}

export const deleteConversation = function (
    db: Firestore,
    conversationId: string,
    ownerLogin: string
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const conversation = await getConversationData(db, conversationId, ownerLogin);
            const owner = getMemberDataByLogin(conversation.members, ownerLogin);

            if ( owner && (
                owner.role === ConversationMemberRole.OWNER ||
                checkGrossRole(owner.role, conversation.preferences.delete)
            )
            ) {
                await deleteConversationFromAllMembers(db, conversation.members, conversationId);
                await db.collection(CONVERSATIONS).doc(conversationId).delete();
                resolve(true);
                return;
            }
        } catch (_) {
            reject();
        }
    });
}

export const updateConversationWithAddedUser = async function (
    conversation: IConversation<any>,
    addedUserData: IUserData<string, string, string>
) {
    if (conversation.members.every((member) => member.login !== addedUserData.login)) {
        conversation.members.push({
            login: addedUserData.login,
            role: ConversationMemberRole.SIMPLE,
            addedTime: Date.now(),
        });
        await updateConversationData(db, conversation);
    }

    if (addedUserData.conversations.every((id) => id !== conversation.id)) {
        addedUserData.conversations.push(conversation.id);
        await updateUserData(db, addedUserData);
    }
    return true;
}

export const checkAccessToAddToConversation = async function (
    userWhoAdds: IConversationMember<any> | null,
    conversation: IConversation<any>,
    userLoginToAdd: string
) {
    if (userWhoAdds && checkRoleAccess(userWhoAdds.role, conversation.preferences.members.add)) {
        const addedUserData = await getUserDataByLogin(db, userLoginToAdd);

        if (
            (addedUserData.preferences.conversations !== AccessType.NO_ONE) &&
            (
                (
                    (addedUserData.preferences.conversations === AccessType.FRIENDS) &&
                    checkIsFriendOf(userWhoAdds.login, addedUserData.personalInfo.friends)
                ) ||
                (addedUserData.preferences.conversations === AccessType.ALL)
            )
        ) {
            return addedUserData;
        }
    }

    return false;
}

export const getConversationsData = function (
    db: Firestore,
    conversationList: string[]
): Promise<IConversation<string>[]> {
    return new Promise<IConversation<string>[]>(async (resolve, reject) => {
        try {
            const documents = await db.collection(CONVERSATIONS)
                .where('id', 'in', conversationList)
                .get();

            resolve(documents.docs.map((doc) => doc.data() as IConversation<string>))
        } catch (_) {
            reject();
        }
    })
}

export const getFullConversationsData = function (
    db: Firestore,
    conversationsList: string[]
): Promise<IConversation<IPublicUserData<string>>[]> {
    return new Promise<IConversation<IPublicUserData<string>>[]>(async (resolve, reject) => {
        try {
            const documents: QuerySnapshot = await db.collection(CONVERSATIONS)
                .where('id', 'in', conversationsList)
                .get();

            const conversationsData: IConversation<IPublicUserData<string>>[] = documents.docs.map(
                (doc) => doc.data() as IConversation<IPublicUserData<string>>
            );
            const loginList = [...new Set(...conversationsData.map(
                (conversation) => conversation.members.map((member) => member.login))
            )]
            const usersPublicData = await getPublicUserDataByLoginList(db, loginList);

            for (let j = 0; j < conversationsData.length; j++) {
                const conversation = conversationsData[j];

                for (let x = 0; x < conversation.members.length; x++) {
                    const member = conversation.members[x];

                    for (let i = 0; i < usersPublicData.length; i++) {
                        const userData: IPublicUserData<string> = usersPublicData[i];

                        if (member.login === userData.login) {
                            member.data = userData;
                            break;
                        }
                    }
                }
            }

            resolve(conversationsData);
        } catch (_) {
            reject();
        }
    })
}