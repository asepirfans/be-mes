"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const availability_model_1 = require("../models/availability_model");
class AvailabilityService {
  async index(machine, { page, limit }) {
    const data = await availability_model_1.Availability.paginate({ machine: machine }, { page: page, limit: limit, sort: { _id: -1 } });
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
    const totalDocuments = await availability_model_1.Availability.countDocuments();

    // Jika jumlah dokumen melebihi 50, hapus dokumen tertua
    if (totalDocuments > 50) {
      const oldestDocument = await availability_model_1.Availability.findOne({}, { sort: { _id: 1 } });
      if (oldestDocument) {
        await availability_model_1.Availability.deleteOne({ _id: oldestDocument._id });
      }
    }

    const data = await availability_model_1.Availability.findOne({ machine: machine }, null, {
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
exports.default = AvailabilityService;
