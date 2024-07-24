"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const parameter_model_1 = require("../models/parameter_model");
const oee_model_1 = require("../models/oee_model");
const availability_model_1 = require("../models/availability_model");
const quality_model_1 = require("../models/quality_model");
const performance_model_1 = require("../models/performance_model");
class ParameterServices {
  async index(machine, { page, limit }) {
    const data = await parameter_model_1.Parameter.paginate({ machine: machine }, { page: page, limit: limit, sort: { _id: -1 } });
    if (!data) {
      return {
        success: false,
        message: "Data not found",
        data: null,
      };
    }
    return {
      success: true,
      message: "Data found",
      data: data,
    };
  }
  async latest(machine) {
    // Hitung jumlah dokumen dalam koleksi
    const totalDocuments = await parameter_model_1.Parameter.countDocuments();

    // Jika jumlah dokumen melebihi 50, hapus dokumen tertua
    if (totalDocuments > 50) {
      const oldestDocument = await parameter_model_1.Parameter.findOne({}, { sort: { _id: 1 } });
      if (oldestDocument) {
        await parameter_model_1.Parameter.deleteOne({ _id: oldestDocument._id });
      }
    }
    const data = await parameter_model_1.Parameter.findOne({ machine: machine }, null, {
      sort: { _id: -1 },
    });
    if (!data) {
      return {
        success: false,
        message: "Data not found",
        data: null,
      };
    }
    return {
      success: true,
      message: "Data found",
      data: data,
    };
  }
  async new(data) {
    const { machine, loading_time, cycle_time, oee_target, object_type, target_count } = data;
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
      await performance_model_1.Performance.create({ machine, operation_time: 0, processed: 0, cycle_time: 0, state: true });
      await quality_model_1.Quality.create({ machine, processed: 0, good: 0, defect: 0, state: true });
      await availability_model_1.Availability.create({ machine, operation_time: 0, down_time: 0, running_time: 0, state: true });
      await oee_model_1.OEE.create({ machine, availability: 0, quality: 0, performance: 0, oee: 0, state: true });
      await parameter_model_1.Parameter.create({ machine, loading_time, cycle_time, oee_target, object_type, target_count, state: true });
      await session.commitTransaction();
      return {
        success: true,
        message: "Data saved",
        data: data,
      };
    } catch (error) {
      await session.abortTransaction();
      return {
        success: false,
        message: "Error while saving data : " + error,
        data: null,
      };
    }
  }
  async reset(machine) {
    const data = await parameter_model_1.Parameter.updateMany({ machine: machine, state: true }, { state: false });
    if (data.modifiedCount < 1) {
      return {
        success: false,
        message: "Data not found",
        data: null,
      };
    }
    return {
      success: true,
      message: "Data reset",
      data: data,
    };
  }
}
exports.default = ParameterServices;
