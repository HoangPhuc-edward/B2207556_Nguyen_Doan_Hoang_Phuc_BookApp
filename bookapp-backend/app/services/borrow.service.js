const Borrow = require("../models/borrow.model");

class BorrowService {
  async create(payload) {
    return await Borrow.create(payload);
  }

  async findAll() {
    return await Borrow.find({})
      .populate("MaDocGia")
      .populate("MaSach")
      .populate("MaNVMuon")
      .populate("MaNVTra");
  }

  async findOne(id) {
    return await Borrow.findOne({ _id: id })
      .populate("MaDocGia")
      .populate("MaSach")
      .populate("MaNVMuon")
      .populate("MaNVTra");
  }

  async findByAttribute(attribute, value) {
    return await Borrow.find({ [attribute]: value })
      .populate("MaDocGia")
      .populate("MaSach")
      .populate("MaNVMuon")
      .populate("MaNVTra");
  }

  async update(id, payload) {
    return await Borrow.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true }
    );
  }

  async delete(id) {
    return await Borrow.deleteOne({ _id: id });
  }

  async deleteAll() {
    return await Borrow.deleteMany({});
  }
}

module.exports = new BorrowService();
