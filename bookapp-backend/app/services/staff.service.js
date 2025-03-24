const Staff = require("../models/staff.model");

class StaffService {
  async create(payload) {
    return await Staff.create(payload);
  }

  async findAll() {
    return await Staff.find({});
  }

  async findOne(id) {
    return await Staff.findOne({ _id: id });
  }

  async findByAttribute(attribute, value) {
    return await Staff.find({ [attribute]: value });
  }

  async update(id, payload) {
    return await Staff.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true }
    );
  }

  async delete(id) {
    return await Staff.deleteOne({ _id: id });
  }

  async deleteAll() {
    return await Staff.deleteMany({});
  }
}

module.exports = new StaffService();
