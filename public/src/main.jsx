"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketClientManager = void 0;
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_1 = __importDefault(require("./App"));
const SocketClientManager_1 = __importDefault(require("./SocketClientManager"));
const react_redux_1 = require("react-redux");
const index_1 = require("./store/index");
exports.socketClientManager = new SocketClientManager_1.default('localhost:3000');
client_1.default.createRoot(document.getElementById('root')).render(<react_1.default.StrictMode>
        <react_redux_1.Provider store={index_1.store}>
            <App_1.default />
        </react_redux_1.Provider>
    </react_1.default.StrictMode>);
