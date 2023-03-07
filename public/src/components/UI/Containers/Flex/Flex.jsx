"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Flex_module_scss_1 = __importDefault(require("./Flex.module.scss"));
const Flex = (props) => {
    return (<div className={[
            Flex_module_scss_1.default.flexRow,
            props.className || '',
            props.jcr ? Flex_module_scss_1.default.flexRow_jcRight : '',
            props.jcl ? Flex_module_scss_1.default.flexRow_jcLeft : '',
            props.dr ? Flex_module_scss_1.default.flexRow_dr : '',
            props.dc ? Flex_module_scss_1.default.flexRow_dc : '',
            props.ps ? Flex_module_scss_1.default.flexRow_ps : '',
            props.pm ? Flex_module_scss_1.default.flexRow_pm : '',
            props.pb ? Flex_module_scss_1.default.flexRow_pb : '',
            props.ms ? Flex_module_scss_1.default.flexRow_ms : '',
            props.mm ? Flex_module_scss_1.default.flexRow_mm : '',
            props.mb ? Flex_module_scss_1.default.flexRow_mb : '',
            props.cmhs ? Flex_module_scss_1.default.flexRow_cmhs : '',
            props.cmhm ? Flex_module_scss_1.default.flexRow_cmhm : '',
            props.cmvs ? Flex_module_scss_1.default.flexRow_cmvs : '',
            props.cmvm ? Flex_module_scss_1.default.flexRow_cmvm : '',
        ].join(' ')} style={props.style}>
            {props.children}
        </div>);
};
exports.default = Flex;
