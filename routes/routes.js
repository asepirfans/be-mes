"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_routes_1 = __importDefault(require("./base_routes"));
const auth_controller_1 = __importDefault(require("../controllers/auth_controller"));
const device_controller_1 = __importDefault(require("../controllers/device_controller"));
const auth_middleware_1 = require("../middlewares/auth_middleware");
const parameter_controller_1 = __importDefault(require("../controllers/parameter_controller"));
const pickplace_controller_1 = __importDefault(require("../controllers/pickplace_controller"));
const tesing_controller_1 = __importDefault(require("../controllers/tesing_controller"));
const troubleshoot_controller_1 = __importDefault(require("../controllers/troubleshoot_controller"));
const resetprod_controller_1 = __importDefault(require("../controllers/resetprod_controller"));
const quality_controller_1 = __importDefault(require("../controllers/quality_controller"));
const availability_controller_1 = __importDefault(require("../controllers/availability_controller"));
const performance_controller_1 = __importDefault(require("../controllers/performance_controller"));
const parameter_middleware_1 = __importDefault(require("../middlewares/parameter_middleware"));
const troubleshoot_middleware_1 = require("../middlewares/troubleshoot_middleware");
const quality_middleware_1 = require("../middlewares/quality_middleware");
const oee_controller_1 = __importDefault(require("../controllers/oee_controller"));
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const role_middleware_1 = require("../middlewares/role_middleware");
const user_middleware_1 = require("../middlewares/user_middleware");
const material_controller_1 = __importDefault(require("../controllers/material_controller"));
const material_middleware_1 = __importDefault(require("../middlewares/material_middleware"));
const authC = new auth_controller_1.default();
const deviceC = new device_controller_1.default();
const resetProdC = new resetprod_controller_1.default();
const parameterC = new parameter_controller_1.default();
const pickplaceC = new pickplace_controller_1.default();
const testingC = new tesing_controller_1.default();
const troubleshootC = new troubleshoot_controller_1.default();
const qualityC = new quality_controller_1.default();
const availabilityC = new availability_controller_1.default();
const performanceC = new performance_controller_1.default();
const oeeC = new oee_controller_1.default();
const userC = new user_controller_1.default();
const materialC = new material_controller_1.default();
class Routes extends base_routes_1.default {
    constructor() {
        super();
        this.routes();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.send("Hello World!");
        });
        //Auth
        this.router.post("/login", auth_middleware_1.validateLogin, authC.login);
        this.router.post("/register", auth_middleware_1.validateRegister, authC.register);
        this.router.get("/logout", auth_middleware_1.auth, authC.logout);
        //User
        this.router.get("/user/index", auth_middleware_1.auth, role_middleware_1.onlyAdmin, userC.index);
        this.router.put("/user/update/:id", auth_middleware_1.auth, role_middleware_1.onlyAdmin, user_middleware_1.validateUserUpdate, userC.update);
        this.router.delete("/user/destroy/:id", auth_middleware_1.auth, role_middleware_1.onlyAdmin, userC.destroy);
        //Device
        this.router.post("/devices/input", deviceC.input);
        this.router.get("/devices/monitor/:machine", auth_middleware_1.auth, deviceC.monitorProduction);
        this.router.get("/devices/status", auth_middleware_1.auth, deviceC.statusPlant);
        //Reset Production
        this.router.post("/resetproduction/:machine", auth_middleware_1.auth, resetProdC.reset);
        //Testing
        this.router.get("/testing/index", auth_middleware_1.auth, testingC.index);
        this.router.get("/testing/latest", auth_middleware_1.auth, testingC.latest);
        //Pick and Place
        this.router.get("/pickplace/index", auth_middleware_1.auth, pickplaceC.index);
        this.router.get("/pickplace/latest", auth_middleware_1.auth, pickplaceC.latest);
        //Parameter
        this.router.get("/parameter/:machine", auth_middleware_1.auth, parameterC.index);
        this.router.get("/parameter/latest/:machine", auth_middleware_1.auth, parameterC.latest);
        this.router.post("/parameter/new", auth_middleware_1.auth, parameter_middleware_1.default, parameterC.new);
        this.router.post("/parameter/reset/:machine", auth_middleware_1.auth, parameterC.reset);
        //Quality
        this.router.get("/quality/index/:machine", auth_middleware_1.auth, qualityC.index);
        this.router.get("/quality/latest/:machine", auth_middleware_1.auth, qualityC.latest);
        this.router.put("/quality/defect/:id", auth_middleware_1.auth, quality_middleware_1.validateQualityDefect, qualityC.defect);
        //Availability
        this.router.get("/availability/index/:machine", auth_middleware_1.auth, availabilityC.index);
        this.router.get("/availability/latest/:machine", auth_middleware_1.auth, availabilityC.latest);
        //Performance
        this.router.get("/performance/index/:machine", auth_middleware_1.auth, performanceC.index);
        this.router.get("/performance/latest/:machine", auth_middleware_1.auth, performanceC.latest);
        //OEE
        this.router.get("/oee/index/:machine", auth_middleware_1.auth, oeeC.index);
        this.router.get("/oee/latest/:machine", auth_middleware_1.auth, oeeC.latest);
        //Troubleshoot
        this.router.get("/troubleshoot/:machine", auth_middleware_1.auth, troubleshootC.index);
        this.router.post("/troubleshoot/new", auth_middleware_1.auth, troubleshoot_middleware_1.validateTroubleshoot, troubleshootC.new);
        this.router.put("/troubleshoot/update/:id", auth_middleware_1.auth, troubleshootC.update);
        //Material
        this.router.get("/material/index/:machine", auth_middleware_1.auth, materialC.index);
        this.router.get("/material/latest/:machine", auth_middleware_1.auth, materialC.latest);
        this.router.put("/material/update/:machine/:method", material_middleware_1.default, materialC.update);
    }
}
exports.default = Routes;
