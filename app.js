"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const config_1 = __importDefault(require("./config/config"));
const routes_1 = __importDefault(require("./routes/routes"));
const quality_stream_1 = __importDefault(require("./stream/quality_stream"));
const availability_stream_1 = __importDefault(require("./stream/availability_stream"));
const performance_stream_1 = __importDefault(require("./stream/performance_stream"));
const oee_stream_1 = __importDefault(require("./stream/oee_stream"));
class App {
    app;
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.connection();
        this.plugins();
        this.routes();
        this.streams();
    }
    connection() {
        new config_1.default().connect();
    }
    plugins() {
        this.app.use((0, cors_1.default)());
        // this.app.use(morgan("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.send("Ini BACKEND");
        });
        this.app.use("/api", new routes_1.default().router);
    }
    streams() {
        new quality_stream_1.default();
        new availability_stream_1.default();
        new performance_stream_1.default();
        new oee_stream_1.default();
    }
}
const port = process.env.SERVER_PORT || 5000;
const app = new App().app;
app.listen(port, () => console.log(`Server running on port ${port}`));
exports.default = app;
