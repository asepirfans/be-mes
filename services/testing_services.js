"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_model_1 = require("../models/testing_model");
class TestingService {
  async index({ page, limit }) {
    const data = await testing_model_1.Testing.paginate({}, { page: page, limit: limit, sort: { _id: -1 } });
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
  async latest() {
    // Hitung jumlah dokumen dalam koleksi
    const totalDocuments = await testing_model_1.Testing.countDocuments();

    // Jika jumlah dokumen melebihi 50, hapus dokumen tertua
    if (totalDocuments > 50) {
      const oldestDocument = await testing_model_1.Testing.findOne({}, { sort: { _id: 1 } });
      if (oldestDocument) {
        await testing_model_1.Testing.deleteOne({ _id: oldestDocument._id });
      }
    }
    const data = await testing_model_1.Testing.findOne({}, null, {
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
exports.default = TestingService;
