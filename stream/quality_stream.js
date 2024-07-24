"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_model_1 = require("../models/material_model");
const picknplace_model_1 = require("../models/picknplace_model");
const quality_model_1 = require("../models/quality_model");
const testing_model_1 = require("../models/testing_model");
const get_parameter_1 = require("../utils/get_parameter");
class QualityStream {
    constructor() {
        this.counting("p&place");
        this.counting("testing");
    }
    async counting(machine) {
        let model;
        if (machine === "p&place") {
            model = picknplace_model_1.PickPlace;
        }
        else if (machine === "testing") {
            model = testing_model_1.Testing;
        }
        else {
            throw new Error("Invalid machine type");
        }
        let count = 0;
        let defect = 0;
        const watchStream = model.watch();
        watchStream.on("change", async (change) => {
            if (change.operationType === "insert") {
                try {
                    const newestDocument = await model.findOne({}, null, {
                        sort: { _id: -1 },
                    });
                    if (machine === "testing") {
                        if (newestDocument &&
                            typeof newestDocument.values[1].v === "number") {
                            count = newestDocument.values[1].v;
                            await quality_model_1.Quality.findOneAndUpdate({ $and: [{ machine: "testing" }, { state: true }] }, {
                                $set: {
                                    good: count,
                                },
                            });
                        }
                        if (newestDocument &&
                            typeof newestDocument.values[0].v === "number") {
                            defect = newestDocument.values[0].v;
                            await quality_model_1.Quality.findOneAndUpdate({ $and: [{ machine: "testing" }, { state: true }] }, {
                                $set: {
                                    defect: defect,
                                },
                            });
                            await quality_model_1.Quality.findOneAndUpdate({ $and: [{ machine: "p&place" }, { state: true }] }, {
                                $set: {
                                    defect: defect,
                                },
                            });
                        }
                    }
                    else {
                        if (newestDocument &&
                            typeof newestDocument.values[0].v === "number") {
                            count = newestDocument.values[0].v;
                        }
                        await quality_model_1.Quality.findOneAndUpdate({ $and: [{ machine: "p&place" }, { state: true }] }, {
                            $set: {
                                good: count,
                            },
                        });
                    }
                    await quality_model_1.Quality.findOneAndUpdate({ $and: [{ machine: machine }, { state: true }] }, {
                        $set: {
                            processed: count + defect,
                        },
                    });
                    // console.log(machine + " Good : " + count + " Defect : " + defect);
                    await this.updateMaterial(machine, count);
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
    async updateMaterial(machine, count) {
        const parameter = await (0, get_parameter_1.getParameter)(machine);
        if (!parameter)
            return;
        await material_model_1.Material.findOneAndUpdate({ machine: machine }, { $inc: { count: -count } }, { new: true });
        // await MaterialHistory.create({
        //   machine: machine,
        //   type: parameter.object_type,
        //   category: "Out",
        //   value: count,
        // });
    }
}
exports.default = QualityStream;
