const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    TenSach: { type: String, required: true },
    DonGia: { type: Number, required: true },
    MoTa: { type: String },
    SoQuyen: { type: Number, required: true },
    NamXuatBan: { type: Number, required: true },
    TacGia: { type: String, required: true },
    HinhAnh: { type: String, required: true },
    SoNgayMuon: { type: Number, required: true },
    MaNXB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NHAXUATBAN",
      required: true,
    },
  },
  { collection: "SACH" }
);

const Book = mongoose.model("SACH", bookSchema);

module.exports = Book;
