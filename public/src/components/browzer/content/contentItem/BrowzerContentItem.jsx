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
const BrowzerContentItem_module_scss_1 = __importDefault(require("./BrowzerContentItem.module.scss"));
const BrowzerContentItemsList_1 = __importDefault(require("../../../../common/BrowzerContentItemsList"));
const BrowzerContentItemSelect_1 = __importDefault(require("./BrowzerContentItemSelect/BrowzerContentItemSelect"));
const NoComponentsContent_1 = __importDefault(require("../../components/contentComponents/noComponents/NoComponentsContent"));
const Component_1 = __importDefault(require("../../components/contentComponents/Component"));
const BrowzerContentItem = (props) => {
    var _a, _b;
    const [active, setActive] = (0, react_1.useState)(((_a = props.block.components.find((c) => c.id === props.block.active)) === null || _a === void 0 ? void 0 : _a.id) || ((_b = props.block.components[0]) === null || _b === void 0 ? void 0 : _b.id));
    return (<div className={[BrowzerContentItem_module_scss_1.default.container, props.block.components.length ? BrowzerContentItem_module_scss_1.default.noBorder : ''].join(' ')}>
            {props.block.components.length ?
            <>
                        <BrowzerContentItemSelect_1.default block={props.block} index={props.index} active={active} setActive={setActive}/>
                        {props.block.components.map((componentData) => {
                    const ComponentContent = BrowzerContentItemsList_1.default[componentData.type].Component;
                    return <Component_1.default key={componentData.id} active={active === componentData.id}>
                                    <ComponentContent componentData={componentData}/>
                                </Component_1.default>;
                })}
                    </> :
            <NoComponentsContent_1.default index={props.index}/>}
        </div>);
};
exports.default = BrowzerContentItem;
