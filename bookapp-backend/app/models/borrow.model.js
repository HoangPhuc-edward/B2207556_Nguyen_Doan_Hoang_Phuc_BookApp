const mongoose = require("mongoose");
//MaDocGia, MaSach, MaNVMuon, MaNVTra, NgayMuon, NgayTra
const borrowSchema = new mongoose.Schema(
  {
    MaDocGia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DOCGIA",
      required: true,
    },
    MaSach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SACH",
      required: true,
    },
    MaNVMuon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NHANVIEN",
      required: true,
    },
    MaNVTra: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NHANVIEN",
    },
    NgayMuon: {
      type: Date,
      required: true,
    },
    NgayTra: {
      type: Date,
    },
    NgayPhaiTra: {
      type: Date,
      required: true,
    },
  },
  { collection: "THEODOIMUONSACH" }
);

const Borrow = mongoose.model("THEODOIMUONSACH", borrowSchema);

module.exports = Borrow;
