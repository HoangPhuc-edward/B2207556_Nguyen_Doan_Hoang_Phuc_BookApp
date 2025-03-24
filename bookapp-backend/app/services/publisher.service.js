const Publisher = require("../models/publisher.model");

class PublisherService {
  async create(payload) {
    return await Publisher.create(payload);
  }

  async findAll() {
    return await Publisher.find({});
  }

  async findOne(maNXB) {
    return await Publisher.findOne({ _id: maNXB });
  }

  async update(maNXB, payload) {
    return await Publisher.findOneAndUpdate(
      { _id: maNXB },
      { $set: payload },
      { new: true }
    );
  }

  async delete(maNXB) {
    return await Publisher.deleteOne({ _id: maNXB });
  }
}

module.exports = new PublisherService();
