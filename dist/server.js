"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./lib/app"));
const pool_1 = __importDefault(require("./lib/utils/pool"));
const PORT = process.env.PORT || 7890;
app_1.default.listen(PORT, () => {
    console.log(`Server started! Running on ${PORT}.`);
});
process.on('exit', () => {
    console.log('Goodbye!');
    pool_1.default.end();
});
//# sourceMappingURL=server.js.map