"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const availability_model_1 = require("../models/availability_model");
const oee_model_1 = require("../models/oee_model");
const performance_model_1 = require("../models/performance_model");
const quality_model_1 = require("../models/quality_model");
class OeeStream {
    pickPlaceOEE;
    testingOEE;
    constructor() {
        this.pickPlaceOEE = {
            availability: 0,
            quality: 0,
            performance: 0,
        };
        this.testingOEE = {
            availability: 0,
            quality: 0,
            performance: 0,
        };
        this.countingTime();
    }
    countingTime() {
        setInterval(() => {
            this.setAvailability("p&place");
            this.setPeformance("p&place");
            this.setQuality("p&place");
            this.setAvailability("testing");
            this.setPeformance("testing");
            this.setQuality("testing");
            this.setOEE("p&place");
            this.setOEE("testing");
            // console.log(this.testingOEE)
        }, 1000);
    }
    async setOEE(machine) {
        let data;
        if (machine === "p&place") {
            data = this.pickPlaceOEE;
        }
        else if (machine === "testing") {
            data = this.testingOEE;
        }
        else {
            throw new Error("Invalid machine type");
        }
        if (!data)
            return;
        if (data.availability <= 0 || data.quality <= 0 || data.performance <= 0)
            return;
        console.log(data);
        await oee_model_1.OEE.findOneAndUpdate({ machine: machine, state: true }, {
            $set: {
                availability: data.availability,
                quality: data.quality,
                performance: data.performance,
                oee: (data.availability * data.quality * data.performance) / 100,
            },
        });
    }
    async setAvailability(machine) {
        const availability = await availability_model_1.Availability.findOne({
            machine: machine,
            state: true,
        }, null, {
            sort: { _id: -1 },
        });
        if (!availability)
            return;
        if (availability.operation_time <= 0)
            return;
        if (machine === "p&place") {
            this.pickPlaceOEE = {
                ...this.pickPlaceOEE,
                availability: (availability.operation_time - availability.down_time) /
                    availability.operation_time,
            };
        }
        if (machine === "testing") {
            this.testingOEE = {
                ...this.testingOEE,
                availability: (availability.operation_time - availability.down_time) /
                    availability.operation_time,
            };
        }
    }
    async setPeformance(machine) {
        const performance = await performance_model_1.Performance.findOne({
            machine: machine,
            state: true,
        }, null, {
            sort: { _id: -1 },
        });
        if (!performance)
            return;
        if (performance.cycle_time <= 0 || performance.operation_time <= 0)
            return;
        if (machine === "p&place") {
            this.pickPlaceOEE = {
                ...this.pickPlaceOEE,
                performance: (performance.processed * performance.cycle_time) /
                    (performance.operation_time / 60),
            };
        }
        if (machine === "testing") {
            this.testingOEE = {
                ...this.testingOEE,
                performance: (performance.processed * performance.cycle_time) /
                    (performance.operation_time / 60),
            };
        }
    }
    async setQuality(machine) {
        const quality = await quality_model_1.Quality.findOne({
            machine: machine,
            state: true,
        }, null, {
            sort: { _id: -1 },
        });
        if (!quality)
            return;
        if (quality.processed <= 0)
            return;
        if (machine === "p&place") {
            this.pickPlaceOEE = {
                ...this.pickPlaceOEE,
                quality: (quality.processed - quality.defect) / quality.processed,
            };
        }
        if (machine === "testing") {
            this.testingOEE = {
                ...this.testingOEE,
                quality: (quality.processed - quality.defect) / quality.processed,
            };
        }
    }
}
exports.default = OeeStream;
