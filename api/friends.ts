import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "./utils/validateRequestMethods";
import {AuthType} from "./databaseMethods/auth";
import {db} from "../index";
import {getUserDataByLogin} from "./databaseMethods/users";
import {AccessType} from "../enums/user";
import {ResponseError} from "../enums/responses";
import {updateUserData} from "./databaseMethods/user";
import {
    addToFriends,
    addToRequests,
    removeFromFriends,
    removeFromRequestIn,
    removeFromRequestOut
} from "./databaseMethods/friends";

const friends = express.Router();

friends.post('/add', (req: Request, res: Response) => {
    validateRequestWithAccess<{ login: string }>(req, res, db, AuthType.SESSION_KEY)
        .then(async ({ userData, body }) => {
            if (
                !userData.personalInfo.friends.value.some((friendLogin) => friendLogin === body.login) &&
                !userData.friendsRequestOut.some((friendLogin) => friendLogin === body.login) &&
                (userData.login !== body.login)
            ) {
                const userToAdd = await getUserDataByLogin(db, body.login);

                if (userToAdd && userToAdd.preferences.friends === AccessType.ALL) {
                    (userData.friendsRequestIn.some((friendLogin) => friendLogin === userToAdd.login)
                        ? addToFriends
                        : addToRequests
                    )(db, userData, userToAdd)
                        .then(() => res.status(200).send({ error: false, success: true }))
                        .catch(() => res.status(200).send({ error: true, message: ResponseError.SERVER_ERROR }))
                } else res.status(200).send({ error: true, message: ResponseError.NO_ACCESS })
            } else res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA })
        })
})

friends.post('/remove', (req: Request, res: Response) => {
    validateRequestWithAccess<{ login: string }>(req, res, db, AuthType.SESSION_KEY)
        .then(async ({ userData, body }) => {
            if (
                (userData.personalInfo.friends.value.some((friendLogin) => friendLogin === body.login) ||
                userData.friendsRequestOut.some((friendLogin) => friendLogin === body.login) ||
                userData.friendsRequestIn.some((friendLogin) => friendLogin === body.login)) &&
                (userData.login !== body.login)
            ) {
                const userToRemove = await getUserDataByLogin(db, body.login);

                if (userToRemove) {
                    (userData.personalInfo.friends.value.some((login) => login === body.login)
                        ? removeFromFriends :
                        userData.friendsRequestOut.some((login) => login === body.login) ?
                            removeFromRequestOut : removeFromRequestIn)(db, userData, userToRemove)
                        .then(() => res.status(200).send({ error: false, success: true }))
                        .catch(() => res.status(200).send({ error: true, message: ResponseError.SERVER_ERROR }))

                } else res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA })
            } else res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA })
        })
});

export default friends;