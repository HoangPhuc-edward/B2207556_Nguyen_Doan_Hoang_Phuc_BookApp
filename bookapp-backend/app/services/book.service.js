const Book = require("../models/book.model");

class BookService {
  async create(payload) {
    return await Book.create(payload);
  }

  async findAll() {
    return await Book.find({}).populate("MaNXB");
  }

  async findOne(maSach) {
    return await Book.findOne({ _id: maSach }).populate("MaNXB");
  }

  async findByAttribute(attribute, value) {
    return await Book.find({ [attribute]: value }).populate("MaNXB");
  }

  async update(maSach, payload) {
    return await Book.findOneAndUpdate(
      { _id: maSach },
      { $set: payload },
      { new: true }
    );
  }

  async delete(maSach) {
    return await Book.deleteOne({ _id: maSach });
  }

  async deleteAll() {
    return await Book.deleteMany({});
  }
}

module.exports = new BookService();
