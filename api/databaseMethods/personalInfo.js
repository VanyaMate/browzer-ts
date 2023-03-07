"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeItem = void 0;
const validateRequestMethods_1 = require("../utils/validateRequestMethods");
const helpers_1 = require("../../utils/helpers");
const auth_1 = require("./auth");
const user_1 = require("./user");
const responses_1 = require("../../enums/responses");
const personalInfo_1 = require("../methods/personalInfo");
const changeItem = function (req, res, db, itemName, validMethod) {
    (0, validateRequestMethods_1.validateRequest)(req, res)
        .then((data) => {
        const body = (0, helpers_1.convertJsonTo)(data.body);
        if (validMethod(body.value)) {
            (0, auth_1.checkUserAccess)(db, data.auth, auth_1.AuthType.SESSION_KEY)
                .then((userData) => {
                const personalItem = userData.personalInfo[itemName];
                return (0, personalInfo_1.changePersonalInfoItem)(personalItem, body)
                    .then(() => (0, user_1.updateUserData)(db, userData))
                    .then(() => res.status(200).send({ error: false, success: true }));
            })
                .catch((error) => res.status(200).send({ error: true, message: error.message }));
        }
        else {
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
        }
    });
};
exports.changeItem = changeItem;
