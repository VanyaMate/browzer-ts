import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {updateUserData} from "./user";
import {IUserData} from "../../interfaces/users";
import {addUniqueValueTo, getWithoutValue} from "../../utils/helpers";
import {NotificationType} from "../../enums/notifications";
import {addNotification} from "./notifications";

export const addToFriends = async function (
    db: Firestore,
    userData: IUserData<string, string, string>,
    userToAdd: IUserData<string, string, string>
) {
    userData.friendsRequestIn = getWithoutValue<string>(userData.friendsRequestIn, userToAdd.login);
    userToAdd.friendsRequestOut = getWithoutValue<string>(userToAdd.friendsRequestOut, userData.login);

    userData.personalInfo.friends.value = addUniqueValueTo<string>(userData.personalInfo.friends.value, userToAdd.login);
    userToAdd.personalInfo.friends.value = addUniqueValueTo<string>(userToAdd.personalInfo.friends.value, userData.login);

    const notification = await addNotification(db, userToAdd, NotificationType.FRIEND_ACCEPT, {
        icon: userData.avatar,
        title: userData.login,
        message: 'Теперь друзья',
        data: {}
    })

    await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToAdd)
    ]);

    return notification;
}

export const addToRequests = async function (
    db: Firestore,
    userData: IUserData<string, string, string>,
    userToAdd: IUserData<string, string, string>
) {
    userData.friendsRequestOut = addUniqueValueTo<string>(userData.friendsRequestOut, userToAdd.login);
    userToAdd.friendsRequestIn = addUniqueValueTo<string>(userToAdd.friendsRequestIn, userData.login);

    const notification = await addNotification(db, userToAdd, NotificationType.FRIEND_IN_REQUEST, {
        icon: userData.avatar,
        title: userData.login,
        message: 'Хочет дружить',
        data: {}
    })

    await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToAdd)
    ])

    return notification;
}

export const removeFromFriends = async function (
    db: Firestore,
    userData: IUserData<string, string, string>,
    userToRemove: IUserData<string, string, string>
) {
    const userFriends = userData.personalInfo.friends.value;
    const userToRemoveFriends = userToRemove.personalInfo.friends.value;

    userData.personalInfo.friends.value = getWithoutValue<string>(userFriends, userToRemove.login);
    userToRemove.personalInfo.friends.value = getWithoutValue<string>(userToRemoveFriends, userData.login);

    userData.friendsRequestIn = addUniqueValueTo<string>(userData.friendsRequestOut, userToRemove.login);
    userToRemove.friendsRequestOut = addUniqueValueTo<string>(userToRemove.friendsRequestIn, userData.login);

    const notification = await addNotification(db, userToRemove, NotificationType.FRIEND_REMOVE, {
        icon: userData.avatar,
        title: userData.login,
        message: 'Больше не друг',
        data: {}
    })

    await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToRemove)
    ])

    return notification;
}

export const removeFromRequestOut = async function (
    db: Firestore,
    userData: IUserData<string, string, string>,
    userToRemove: IUserData<string, string, string>
) {
    userData.friendsRequestOut = getWithoutValue<string>(userData.friendsRequestOut, userToRemove.login);
    userToRemove.friendsRequestIn = getWithoutValue<string>(userToRemove.friendsRequestIn, userData.login);

    const notification = await addNotification(db, userToRemove, NotificationType.FRIEND_IN_REQUEST_CANCELED, {
        icon: userData.avatar,
        title: userData.login,
        message: 'Отменил заявку в друзья',
        data: {}
    })

    await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToRemove)
    ])

    return notification;
}

export const removeFromRequestIn = async function (
    db: Firestore,
    userData: IUserData<string, string, string>,
    userToRemove: IUserData<string, string, string>
) {
    userData.friendsRequestIn = getWithoutValue<string>(userData.friendsRequestIn, userToRemove.login);
    userToRemove.friendsRequestOut = getWithoutValue<string>(userToRemove.friendsRequestOut, userData.login);

    const notification = await addNotification(db, userToRemove, NotificationType.FRIEND_OUT_REQUEST_CANCELED, {
        icon: userData.avatar,
        title: userData.login,
        message: 'Отменил вашу заявку в друзья',
        data: {}
    })

    await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToRemove)
    ])

    return notification;
}