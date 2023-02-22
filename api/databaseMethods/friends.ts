import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {updateUserData} from "./user";
import {IUserData} from "../../interfaces/users";
import {addUniqueValueTo, getWithoutValue} from "../../utils/helpers";

export const addToFriends = async function (db: Firestore, userData: IUserData, userToAdd: IUserData) {
    userData.friendsRequestIn = getWithoutValue<string>(userData.friendsRequestIn, userToAdd.login);
    userToAdd.friendsRequestOut = getWithoutValue<string>(userToAdd.friendsRequestOut, userData.login);

    userData.personalInfo.friends.value = addUniqueValueTo<string>(userData.personalInfo.friends.value, userToAdd.login);
    userToAdd.personalInfo.friends.value = addUniqueValueTo<string>(userToAdd.personalInfo.friends.value, userData.login);

    return await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToAdd)
    ]);
}

export const addToRequests = async function (db: Firestore, userData: IUserData, userToAdd: IUserData) {
    userData.friendsRequestOut = addUniqueValueTo<string>(userData.friendsRequestOut, userToAdd.login);
    userToAdd.friendsRequestIn = addUniqueValueTo<string>(userToAdd.friendsRequestIn, userData.login);

    return await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToAdd)
    ])
}

export const removeFromFriends = async function (db: Firestore, userData: IUserData, userToRemove: IUserData) {
    const userFriends = userData.personalInfo.friends.value;
    const userToRemoveFriends = userToRemove.personalInfo.friends.value;

    userData.personalInfo.friends.value = getWithoutValue<string>(userFriends, userToRemove.login);
    userToRemove.personalInfo.friends.value = getWithoutValue<string>(userToRemoveFriends, userData.login);

    userData.friendsRequestIn = addUniqueValueTo<string>(userData.friendsRequestOut, userToRemove.login);
    userToRemove.friendsRequestOut = addUniqueValueTo<string>(userToRemove.friendsRequestIn, userData.login);

    return await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToRemove)
    ])
}

export const removeFromRequestOut = async function (db: Firestore, userData: IUserData, userToRemove: IUserData) {
    userData.friendsRequestOut = getWithoutValue<string>(userData.friendsRequestOut, userToRemove.login);
    userToRemove.friendsRequestIn = getWithoutValue<string>(userToRemove.friendsRequestIn, userData.login);

    return await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToRemove)
    ])
}

export const removeFromRequestIn = async function (db: Firestore, userData: IUserData, userToRemove: IUserData) {
    userData.friendsRequestIn = getWithoutValue<string>(userData.friendsRequestIn, userToRemove.login);
    userToRemove.friendsRequestOut = getWithoutValue<string>(userToRemove.friendsRequestOut, userData.login);

    return await Promise.all([
        updateUserData(db, userData),
        updateUserData(db, userToRemove)
    ])
}