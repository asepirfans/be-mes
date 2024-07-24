"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const availability_model_1 = require("../models/availability_model");
const statusplant_model_1 = require("../models/statusplant_model");
const get_parameter_1 = require("../utils/get_parameter");
class AvailabilityStream {
    pickPlaceData;
    testingData;
    timePickPlace;
    timeTesting;
    timeRunPickPlace;
    timeRunTesting;
    timeDownPickPlace;
    timeDownTesting;
    constructor() {
        this.timePickPlace = 0;
        this.timeTesting = 0;
        this.timeRunPickPlace = 0;
        this.timeRunTesting = 0;
        this.timeDownPickPlace = 0;
        this.timeDownTesting = 0;
        this.countingTime();
    }
    async streamStatus() {
        // const watchStream = StatusPlant.watch();
        // watchStream.on("change", async (change : ChangeStreamDocumentInterface) => {
        //   if (change.operationType === "update") {
        //   }
        // });
        const newestDocument = await statusplant_model_1.StatusPlant.findOne({}, null, {
            sort: { _id: -1 },
        });
        if (newestDocument) {
            this.pickPlaceData = newestDocument.pickplace;
            this.testingData = newestDocument.testing;
        }
    }
    countingTime() {
        setInterval(() => {
            this.streamStatus();
            this.setAvailability("p&place");
            this.setAvailability("testing");
        }, 1000);
    }
    async setAvailability(machine) {
        const availability = await availability_model_1.Availability.findOne({
            machine: machine,
            state: true,
        });
        const { loading_time: loadingTime, state: stateParameter } = await (0, get_parameter_1.getParameter)(machine);
        if (machine === "p&place") {
            if (!availability || !stateParameter) {
                this.timePickPlace = 0;
                this.timeRunPickPlace = 0;
                this.timeDownPickPlace = 0;
                return;
            }
            if (this.timePickPlace < loadingTime * 60) {
                if (this.pickPlaceData?.pb_start && !this.pickPlaceData?.pb_stop) {
                    this.timePickPlace++;
                    this.timeRunPickPlace++;
                    await availability_model_1.Availability.findOneAndUpdate({ $and: [{ machine: machine }, { state: true }] }, { $set: { operation_time: this.timePickPlace, running_time: this.timeRunPickPlace } });
                }
                else if (!this.pickPlaceData?.pb_start &&
                    this.pickPlaceData?.pb_stop) {
                    this.timePickPlace++;
                    this.timeDownPickPlace++;
                    await availability_model_1.Availability.findOneAndUpdate({ $and: [{ machine: machine }, { state: true }] }, { $set: { running_time: this.timePickPlace, down_time: this.timeDownPickPlace } });
                }
            }
            else {
                this.timePickPlace = 0;
                this.timeRunPickPlace = 0;
                this.timeDownPickPlace = 0;
                await availability_model_1.Availability.findOneAndUpdate({ $and: [{ machine: machine }, { state: true }] }, { $set: { state: false } });
            }
        }
        else if (machine === "testing") {
            if (!availability || !stateParameter) {
                this.timeTesting = 0;
                this.timeRunTesting = 0;
                this.timeDownTesting = 0;
                return;
            }
            if (this.timeTesting < loadingTime * 60) {
                if (this.testingData?.pb_start && !this.testingData?.pb_stop) {
                    this.timeTesting++;
                    this.timeRunTesting++;
                    await availability_model_1.Availability.findOneAndUpdate({ $and: [{ machine: machine }, { state: true }] }, { $set: { operation_time: this.timeTesting, running_time: this.timeRunTesting } });
                }
                else if (!this.testingData?.pb_start && this.testingData?.pb_stop) {
                    this.timeTesting++;
                    this.timeDownTesting++;
                    await availability_model_1.Availability.findOneAndUpdate({ $and: [{ machine: machine }, { state: true }] }, { $set: { operation_time: this.timeTesting, down_time: this.timeDownTesting } });
                }
            }
            else {
                this.timeTesting = 0;
                this.timeRunTesting = 0;
                this.timeDownTesting = 0;
                await availability_model_1.Availability.findOneAndUpdate({ $and: [{ machine: machine }, { state: true }] }, { $set: { state: false } });
            }
        }
        else {
            throw new Error("Invalid machine type");
        }
    }
}
exports.default = AvailabilityStream;
