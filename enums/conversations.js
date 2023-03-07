"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMemberRole = exports.ConversationType = void 0;
var ConversationType;
(function (ConversationType) {
    ConversationType["SINGLE"] = "SINGLE";
    ConversationType["GROUP"] = "GROUP";
})(ConversationType = exports.ConversationType || (exports.ConversationType = {}));
var ConversationMemberRole;
(function (ConversationMemberRole) {
    ConversationMemberRole["OWNER"] = "OWNER";
    ConversationMemberRole["MODERATOR"] = "MODERATOR";
    ConversationMemberRole["SIMPLE"] = "SIMPLE";
})(ConversationMemberRole = exports.ConversationMemberRole || (exports.ConversationMemberRole = {}));
