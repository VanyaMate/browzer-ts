"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestWithAccess = exports.validateRequest = void 0;
const responses_1 = require("../../enums/responses");
const validationMethods_1 = require("../../utils/validationMethods");
const auth_1 = require("../databaseMethods/auth");
const helpers_1 = require("../../utils/helpers");
const authHeadersExits = function (headers) {
    var _a;
    const [login, key] = ((_a = headers.auth) === null || _a === void 0 ? void 0 : _a.split(':')) || [];
    return (key && (0, validationMethods_1.validLogin)(login)) ? [login, key] : null;
};
const validateRequestHeaders = function (headers) {
    return authHeadersExits(headers);
};
const validateRequestBody = function (body) {
    return typeof (body) === 'string' ? JSON.parse(body) : body;
};
function validateRequest(request, response) {
    return new Promise((resolve) => {
        try {
            const headers = request.headers;
            const validHeaders = validateRequestHeaders(headers);
            const validBody = validateRequestBody(request.body);
            resolve({
                auth: validHeaders || null,
                body: validBody
            });
        }
        catch (_) {
            response.status(200).send({ error: true, message: responses_1.ResponseError.BAD_REQUEST });
        }
    });
}
exports.validateRequest = validateRequest;
const validateRequestWithAccess = function (req, res, db, authType) {
    return new Promise((resolve, reject) => {
        validateRequest(req, res)
            .then((data) => __awaiter(this, void 0, void 0, function* () {
            (0, auth_1.checkUserAccess)(db, data.auth, authType)
                .then((userData) => {
                resolve({ userData, body: (0, helpers_1.convertJsonTo)(data.body) });
            })
                .catch((error) => reject(error.message));
        }))
            .catch((error) => reject(error.message));
    });
};
exports.validateRequestWithAccess = validateRequestWithAccess;
