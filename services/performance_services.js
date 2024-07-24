"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const performance_model_1 = require("../models/performance_model");
class PerformanceService {
  async index(machine, { page, limit }) {
    const data = await performance_model_1.Performance.paginate({ machine: machine }, { page: page, limit: limit, sort: { _id: -1 } });
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
    const totalDocuments = await performance_model_1.Performance.countDocuments();

    // Jika jumlah dokumen melebihi 50, hapus dokumen tertua
    if (totalDocuments > 50) {
      const oldestDocument = await performance_model_1.Performance.findOne({}, { sort: { _id: 1 } });
      if (oldestDocument) {
        await performance_model_1.Performance.deleteOne({ _id: oldestDocument._id });
      }
    }
    const data = await performance_model_1.Performance.findOne({ machine: machine }, null, {
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
}
exports.default = PerformanceService;
