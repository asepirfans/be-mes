"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const material_model_1 = require("../models/material_model");
const materialhistory_model_1 = require("../models/materialhistory_model");

class MaterialService {
  async index(machine, { page, limit }) {
    const data = await materialhistory_model_1.MaterialHistory.paginate({ machine: machine }, { page: page, limit: limit, sort: { _id: -1 } });
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
    const totalDocuments = await material_model_1.Material.countDocuments();

    // Jika jumlah dokumen melebihi 50, hapus dokumen tertua
    if (totalDocuments > 50) {
      const oldestDocument = await material_model_1.Material.findOne({}, { sort: { _id: 1 } });
      if (oldestDocument) {
        await material_model_1.Material.deleteOne({ _id: oldestDocument._id });
      }
    }

    const data = await material_model_1.Material.find({ machine: machine }, null, {
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

  async update(machine, { method, type, value }) {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
      let data;
      if (method === "add") {
        data = await material_model_1.Material.findOneAndUpdate({ $and: [{ machine: machine }, { type: type }] }, { $inc: { value: value } }, { new: true });
        await materialhistory_model_1.MaterialHistory.create({
          machine: machine,
          type: type,
          category: "In",
          value: value,
        });
      } else if (method === "min") {
        data = await material_model_1.Material.findOneAndUpdate({ $and: [{ machine: machine }, { type: type }] }, { $inc: { value: -value } }, { new: true });
        await materialhistory_model_1.MaterialHistory.create({
          machine: machine,
          type: type,
          category: "Out",
          value: value,
        });
      } else {
        return {
          success: false,
          message: "Type not found",
          data: null,
        };
      }

      // Batas jumlah dokumen material history
      const totalHistoryDocuments = await materialhistory_model_1.MaterialHistory.countDocuments({ machine: machine });
      if (totalHistoryDocuments > 50) {
        const oldestHistoryDocument = await materialhistory_model_1.MaterialHistory.findOne({ machine: machine }, {}, { sort: { _id: 1 } });
        if (oldestHistoryDocument) {
          await materialhistory_model_1.MaterialHistory.deleteOne({ _id: oldestHistoryDocument._id });
        }
      }

      if (!data) {
        throw new Error("Data not found");
      }

      await session.commitTransaction();
      return {
        success: true,
        message: "Data Updated",
        data: data,
      };
    } catch (error) {
      await session.abortTransaction();
      return {
        success: false,
        message: "Error while updating data: " + error,
        data: null,
      };
    } finally {
      session.endSession();
    }
  }
}

exports.default = MaterialService;
