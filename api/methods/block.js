"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorder = exports.getContainer = exports.addContainerTo = exports.removeContainerFrom = exports.createContainerData = void 0;
const crypto = __importStar(require("crypto"));
const createContainerData = function (name, type) {
    return {
        name,
        type,
        data: {},
        id: crypto.randomUUID()
    };
};
exports.createContainerData = createContainerData;
const removeContainerFrom = function (containers, id) {
    return containers.filter((container) => container.id !== id);
};
exports.removeContainerFrom = removeContainerFrom;
const addContainerTo = function (containers, container) {
    return [...containers, container];
};
exports.addContainerTo = addContainerTo;
const getContainer = function (containers, id) {
    return containers.filter((container) => container.id === id)[0];
};
exports.getContainer = getContainer;
const reorder = function (containers, id, order) {
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].id === id) {
            const container = containers.splice(i, 1)[0];
            containers.splice(order, 0, container);
            break;
        }
    }
    return containers;
};
exports.reorder = reorder;
