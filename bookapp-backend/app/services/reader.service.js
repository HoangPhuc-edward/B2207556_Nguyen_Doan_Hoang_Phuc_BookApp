const Reader = require("../models/reader.model");

class ReaderService {
  async create(payload) {
    return await Reader.create(payload);
  }

  async findAll() {
    return await Reader.find({});
  }

  async findOne(maDG) {
    return await Reader.findOne({ _id: maDG });
  }

  async findByAttribute(attribute, value) {
    return await Reader.find({ [attribute]: value });
  }

  async update(maDG, payload) {
    return await Reader.findOneAndUpdate(
      { _id: maDG },
      { $set: payload },
      { new: true }
    );
  }

  async delete(maDG) {
    return await Reader.deleteOne({ _id: maDG });
  }
}

module.exports = new ReaderService();
