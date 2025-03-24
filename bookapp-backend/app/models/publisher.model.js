const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    TenNXB: { type: String, required: true },
    DiaChi: { type: String, required: true },
  },
  { collection: "NHAXUATBAN" }
);

const Publisher = mongoose.model("NHAXUATBAN", publisherSchema);

module.exports = Publisher;
