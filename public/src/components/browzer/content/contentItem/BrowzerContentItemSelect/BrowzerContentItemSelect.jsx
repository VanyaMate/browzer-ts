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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const BrowzerContentItemSelect_module_scss_1 = __importDefault(require("./BrowzerContentItemSelect.module.scss"));
const ShowedOptions_1 = __importDefault(require("./ShowedOptions/ShowedOptions"));
const ControlButtons_1 = __importDefault(require("./ControlButtons/ControlButtons"));
const HiddenOptions_1 = __importDefault(require("./HiddenOptions/HiddenOptions"));
const ComponentSelector_1 = __importDefault(require("../../../UI/ComponentSelector"));
const BrowzerContentItemSelect = (props) => {
    const [showedOptions, hiddenOptions] = (0, react_1.useMemo)(() => {
        const components = [[], []];
        for (let i = 0; i < props.block.components.length; i++) {
            components[i < 3 ? 0 : 1].push(props.block.components[i]);
        }
        return components;
    }, [props.block.components]);
    const activeHiddenOption = (0, react_1.useMemo)(() => {
        return hiddenOptions.some((option) => option.id === props.active);
    }, [hiddenOptions, props.active]);
    const [dropdownHidden, setDropdownHidden] = (0, react_1.useState)(true);
    const [addComponentMenuHidden, setAddComponentMenuHidden] = (0, react_1.useState)(true);
    return (<div className={BrowzerContentItemSelect_module_scss_1.default.container}>
            <ShowedOptions_1.default showedOptions={showedOptions} active={props.active} setActive={props.setActive} index={props.index}/>
            <ControlButtons_1.default index={props.index} setDropdownHidden={setDropdownHidden} setAddComponentMenuHidden={setAddComponentMenuHidden} addComponentMenuHidden={addComponentMenuHidden} componentsAmount={props.block.components.length} activeHiddenOption={activeHiddenOption}/>
            {props.block.components.length > 3 ? <HiddenOptions_1.default dropdownHidden={dropdownHidden} hiddenOptions={hiddenOptions} setDropdownHidden={setDropdownHidden} index={props.index} active={props.active} setActive={props.setActive}/> : ''}
            <ComponentSelector_1.default hide={addComponentMenuHidden} index={props.index} successHandler={() => {
            setAddComponentMenuHidden(true);
            setDropdownHidden(false);
        }} errorHandler={() => { }}/>
        </div>);
};
exports.default = BrowzerContentItemSelect;
