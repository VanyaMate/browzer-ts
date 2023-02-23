import {firestore} from "firebase-admin";
import {ConversationMemberRole, ConversationType} from "../../enums/conversations";
import {IConversation, IConversationMember} from "../../interfaces/conversations";
import {CONVERSATIONS, USERS} from "./COLLECTION_NAMES";
import * as crypto from "crypto";
import {ResponseError} from "../../enums/responses";
import {IUserData} from "../../interfaces/users";
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
import {getUserDataByLogin} from "./users";
import {checkIsFriendOf} from "../methods/user";
import Firestore = firestore.Firestore;

export const createConversation = function (
    db: Firestore,
    type: ConversationType,
    members: IConversationMember[],
    name?: string
): Promise<IConversation> {
    return new Promise<IConversation>(async (resolve, reject) => {
        try {
            const id = crypto.randomUUID();
            const conversation: IConversation = getConversationDataForCreate(
                id, type, members, name
            );
            members.forEach((member: IConversationMember) => member.addedTime = Date.now())

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
): Promise<IConversationMember[] | false> {
    const conversationMembers: (IConversationMember|boolean)[] = await Promise.all(members.map(async (login: string) => {
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
        return conversationMembers as IConversationMember[];
    } else {
        return false;
    }
}

export const getConversationData = function (
    db: Firestore,
    id: string,
    withLogin: string
): Promise<IConversation> {
    return new Promise(async (resolve, reject) => {
        if (id && withLogin) {
            const conversation: IConversation = (await db.collection(CONVERSATIONS).doc(id).get()).data() as IConversation;
            return (conversation && conversation.members.some((member: IConversationMember) => member.login === withLogin))
                ? resolve(conversation)
                : reject();
        }
        reject();
    })
}

export const setConversationToAllMembers = function (
    db: Firestore,
    members: IConversationMember[],
    conversationId: string
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        await Promise.all(members.map(async (member: IConversationMember) => {
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
    conversation: IConversation
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
    members: IConversationMember[],
    conversationId: string
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        await Promise.all(members.map(async (member: IConversationMember) => {
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
            const conversation: IConversation = await getConversationData(db, conversationId, ownerLogin);
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
    conversation: IConversation,
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
    userWhoAdds: IConversationMember | null,
    conversation: IConversation,
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