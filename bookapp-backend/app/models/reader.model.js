const mongoose = require("mongoose");

// HoLot, Ten, NgaySinh, Phai, DiaCHi, DienThoai

const readerSchema = new mongoose.Schema(
  {
    HoLot: { type: String, required: true },
    Ten: { type: String, required: true },
    NgaySinh: { type: Date, required: true },
    Phai: { type: String, required: true },
    DiaChi: { type: String, required: true },
    DienThoai: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { collection: "DOCGIA" }
);

const Reader = mongoose.model("DOCGIA", readerSchema);

module.exports = Reader;
