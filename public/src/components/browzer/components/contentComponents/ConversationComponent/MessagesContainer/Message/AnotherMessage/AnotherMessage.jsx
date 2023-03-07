"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AnotherMessage_module_scss_1 = __importDefault(require("./AnotherMessage.module.scss"));
const helpers_1 = require("../../../../../../../../../../utils/helpers");
const AnotherMessage = (props) => {
    return (<div className={[
            AnotherMessage_module_scss_1.default.container,
            props.message.loading ? AnotherMessage_module_scss_1.default.loading : '',
            props.message.error ? AnotherMessage_module_scss_1.default.error : '',
        ].join(' ')}>
            <div className={AnotherMessage_module_scss_1.default.info}>
                <div className={AnotherMessage_module_scss_1.default.headerInfo}>
                    <div className={AnotherMessage_module_scss_1.default.name}>
                        [ {props.message.from.name} ]
                    </div>
                    <div className={AnotherMessage_module_scss_1.default.time}>
                        {(0, helpers_1.getStringDate)(props.message.creationTime)}
                    </div>
                    <div className={AnotherMessage_module_scss_1.default.changed}>{props.message.changed ? '(изм.)' : ''}</div>
                </div>
                <div className={AnotherMessage_module_scss_1.default.message}>
                    {props.message.text}
                </div>
            </div>
        </div>);
};
exports.default = AnotherMessage;
