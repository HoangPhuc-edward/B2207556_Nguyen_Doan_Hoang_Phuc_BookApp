const mongoose = require("mongoose");

//HoTenNV, Password, ChucVu, DiaChi, SoDienThoai
const staffSchema = new mongoose.Schema(
  {
    HoTenNV: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    ChucVu: {
      type: String,
      required: true,
    },
    DiaChi: {
      type: String,
      required: true,
    },
    SoDienThoai: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "NHANVIEN" }
);

const Staff = mongoose.model("NHANVIEN", staffSchema);

module.exports = Staff;
