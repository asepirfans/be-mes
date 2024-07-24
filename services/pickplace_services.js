"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const picknplace_model_1 = require("../models/picknplace_model");
class PickPlaceService {
  async index({ page, limit }) {
    const data = await picknplace_model_1.PickPlace.paginate({}, { page: page, limit: limit, sort: { _id: -1 } });
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
    const totalDocuments = await picknplace_model_1.PickPlace.countDocuments();

    // Jika jumlah dokumen melebihi 50, hapus dokumen tertua
    if (totalDocuments > 50) {
      const oldestDocument = await picknplace_model_1.PickPlace.findOne({}, { sort: { _id: 1 } });
      if (oldestDocument) {
        await picknplace_model_1.PickPlace.deleteOne({ _id: oldestDocument._id });
      }
    }
    const data = await picknplace_model_1.PickPlace.findOne({}, null, {
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
exports.default = PickPlaceService;
