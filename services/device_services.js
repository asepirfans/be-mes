"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const picknplace_model_1 = require("../models/picknplace_model");
const testing_model_1 = require("../models/testing_model");
const statusplant_model_1 = require("../models/statusplant_model");
const quality_model_1 = require("../models/quality_model");                                                                       
const get_parameter_1 = require("../utils/get_parameter");
const availability_model_1 = require("../models/availability_model");
class DeviceServices {
  async input(body) {
    const { timestamp, values } = body;
    let pickplaceData = [];
    let testingData = [];
    values.forEach((value) => {
      if (value.id.includes("p&place")) {
        pickplaceData.push(value);
      } else if (value.id.includes("testing")) {
        testingData.push(value);
      }
    });
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
      await this.pickPlace(pickplaceData, timestamp);
      await this.testing(testingData, timestamp);
      await session.commitTransaction();
      return {
        success: true,
        message: "Data created",
        data: body,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return {
        success: false,
        message: "Error while creating data : " + error,
        data: null,
      };
    }
  }
  async monitorProduction(machine) {
    try {
      const parameter = await (0, get_parameter_1.getParameter)(machine);
      const quality = await quality_model_1.Quality.findOne({ machine: machine, state: true }, null, { sort: { _id: -1 } });
      const availability = await availability_model_1.Availability.findOne({ machine: machine, state: true }, null, { sort: { _id: -1 } });
      const data = {
        machine: machine,
        object_type: parameter.object_type,
        target: parameter.target_count,
        good: quality?.good ?? 0,
        defect: quality?.defect ?? 0,
        stock_material: 0,
        operation_time: availability?.operation_time,
        running_time: availability?.running_time,
        down_time: availability?.down_time,
      };
      return {
        success: true,
        message: "Data fetched",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while getting data : " + error,
        data: null,
      };
    }
  }
  async statusPlant() {
    const status = await statusplant_model_1.StatusPlant.findOne({}, null, { sort: { _id: -1 } });
    return {
      success: true,
      message: "Data fetched",
      data: status,
    };
  }
  async pickPlace(pickPlaceData, timestamp) {
    await picknplace_model_1.PickPlace.create({
      values: pickPlaceData,
      timestamp,
    });

    // Hitung jumlah dokumen dalam koleksi
    const totalDocuments = await picknplace_model_1.PickPlace.countDocuments();

    // Jika jumlah dokumen melebihi 50, hapus dokumen tertua
    if (totalDocuments > 50) {
      const oldestDocument = await picknplace_model_1.PickPlace.findOne({}, { sort: { _id: 1 } });
      if (oldestDocument) {
        await picknplace_model_1.PickPlace.deleteOne({ _id: oldestDocument._id });
      }
    }

    const pickplaceStatus = pickPlaceData.filter((item) => item.id.includes("PB_"));
    pickplaceStatus.forEach(async (v) => {
      if (v.id.includes("PB_Start")) {
        if (v.v === true) {
          await statusplant_model_1.StatusPlant.updateOne(
            {},
            {
              $set: {
                pickplace: { status: true, pb_start: true, pb_stop: false },
              },
            }
          );
        }
      }
      if (v.id.includes("PB_Stop")) {
        if (v.v === true) {
          await statusplant_model_1.StatusPlant.updateOne(
            {},
            {
              $set: {
                pickplace: { status: false, pb_start: false, pb_stop: true },
              },
            }
          );
        }
      }
    });
  }
  async testing(testingData, timestamp) {
    await testing_model_1.Testing.create({ values: testingData, timestamp });

    // Hitung jumlah dokumen dalam koleksi
    const totalDocuments = await testing_model_1.Testing.countDocuments();

    // Jika jumlah dokumen melebihi 50, hapus dokumen tertua
    if (totalDocuments > 50) {
      const oldestDocument = await testing_model_1.Testing.findOne({}, { sort: { _id: 1 } });
      if (oldestDocument) {
        await testing_model_1.Testing.deleteOne({ _id: oldestDocument._id });
      }
    }

    const testingStatus = testingData.filter((item) => item.id.includes("PB_"));
    testingStatus.forEach(async (v) => {
      if (v.id.includes("PB_Start")) {
        if (v.v === true) {
          await statusplant_model_1.StatusPlant.updateOne(
            {},
            {
              $set: {
                testing: { status: true, pb_start: true, pb_stop: false },
              },
            }
          );
        }
      }
      if (v.id.includes("PB_Stop")) {
        if (v.v === true) {
          await statusplant_model_1.StatusPlant.updateOne(
            {},
            {
              $set: {
                testing: { status: false, pb_start: false, pb_stop: true },
              },
            }
          );
        }
      }
    });
  }
}
exports.default = DeviceServices;
