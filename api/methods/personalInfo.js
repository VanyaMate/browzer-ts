"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePersonalInfoItem = void 0;
const changePersonalInfoItem = function (personalItem, data) {
    return new Promise((resolve) => {
        personalItem.value = data.value || personalItem.value;
        personalItem.hidden = typeof data.hidden === "boolean" ? data.hidden : personalItem.hidden;
        resolve(true);
    });
};
exports.changePersonalInfoItem = changePersonalInfoItem;
