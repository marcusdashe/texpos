"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./app/models"));
dotenv_1.default.config();
const corsOptions = {
    origin: "http://localhost:3000",
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
// Parse request of content-type: application/json
app.use(express_1.default.json());
// Parse request of content-type: application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
models_1.default.sequelize
    .sync({ force: false })
    .then(() => console.log("Sync DB Successfully..."))
    .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.json({ message: "Express + Typescript + Postgresql Web Service" });
});
const tutorial_routes_1 = __importDefault(require("./app/routes/tutorial.routes"));
(0, tutorial_routes_1.default)(app);
app.listen(port !== "undefined" ? port : 8000, () => {
    console.log(`[Server]: Server is running on http://localhost:${port}`);
});
