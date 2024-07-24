"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const availability_model_1 = require("../models/availability_model");
const performance_model_1 = require("../models/performance_model");
const quality_model_1 = require("../models/quality_model");
const get_parameter_1 = require("../utils/get_parameter");
class PerformanceStream {
    pickPlaceProcessed;
    testingProcessed;
    pickPlaceOperationTime;
    testingOperationTime;
    constructor() {
        this.pickPlaceProcessed = 0;
        this.testingProcessed = 0;
        this.pickPlaceOperationTime = 0;
        this.testingOperationTime = 0;
        this.streamQuality();
        this.streamAvailability();
        this.countingTime();
    }
    async streamAvailability() {
        const watchStream = availability_model_1.Availability.watch();
        watchStream.on("change", async (change) => {
            if (change.operationType === "update") {
                const newestPickPlace = await availability_model_1.Availability.findOne({
                    machine: "p&place",
                    state: true,
                }, null, {
                    sort: { _id: -1 },
                });
                const newestTesting = await availability_model_1.Availability.findOne({
                    machine: "testing",
                    state: true,
                }, null, {
                    sort: { _id: -1 },
                });
                if (newestPickPlace &&
                    typeof newestPickPlace.operation_time === "number") {
                    this.pickPlaceOperationTime = newestPickPlace.operation_time / 60;
                }
                if (newestTesting && typeof newestTesting.operation_time === "number") {
                    this.testingOperationTime = newestTesting.operation_time / 60;
                }
            }
        });
    }
    async streamQuality() {
        const watchStream = quality_model_1.Quality.watch();
        watchStream.on("change", async (change) => {
            if (change.operationType === "update") {
                const newestPickPlace = await quality_model_1.Quality.findOne({
                    machine: "p&place",
                    state: true,
                }, null, {
                    sort: { _id: -1 },
                });
                const newestTesting = await quality_model_1.Quality.findOne({
                    machine: "testing",
                    state: true,
                }, null, {
                    sort: { _id: -1 },
                });
                if (newestPickPlace && typeof newestPickPlace.processed === "number") {
                    this.pickPlaceProcessed = newestPickPlace.processed;
                }
                if (newestTesting && typeof newestTesting.processed === "number") {
                    this.testingProcessed = newestTesting.processed;
                }
            }
        });
    }
    countingTime() {
        setInterval(() => {
            this.setPerformance("p&place");
            this.setPerformance("testing");
        }, 1000);
    }
    async setPerformance(machine) {
        const performance = await performance_model_1.Performance.findOne({
            machine: machine,
            state: true,
        });
        if (!performance)
            return;
        const { cycle_time, state: stateParameter } = await (0, get_parameter_1.getParameter)(machine);
        if (machine === "p&place") {
            if (this.pickPlaceProcessed <= 0 &&
                this.pickPlaceOperationTime <= 0 &&
                cycle_time <= 0)
                return;
            if (!stateParameter)
                return;
            await performance_model_1.Performance.updateOne({
                $and: [{ machine: machine, state: true }],
            }, {
                $set: {
                    processed: this.pickPlaceProcessed,
                    operation_time: this.pickPlaceOperationTime,
                    cycle_time: cycle_time,
                },
            });
        }
        else if (machine === "testing") {
            if (this.testingProcessed <= 0 &&
                this.testingOperationTime <= 0 &&
                cycle_time <= 0)
                return;
            if (!stateParameter)
                return;
            await performance_model_1.Performance.updateOne({
                $and: [{ machine: machine, state: true }],
            }, {
                $set: {
                    processed: this.testingProcessed,
                    operation_time: this.testingOperationTime,
                    cycle_time: cycle_time,
                },
            });
        }
        else {
            throw new Error("Invalid machine type");
        }
    }
}
exports.default = PerformanceStream;
