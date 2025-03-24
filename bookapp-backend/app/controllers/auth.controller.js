const staffService = require("../services/staff.service");
const readerService = require("../services/reader.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

exports.loginNV = async (req, res) => {
  const { SoDienThoai, Password } = req.body;
  const staff = await staffService.findByAttribute("SoDienThoai", SoDienThoai);
  if (staff.length === 0) {
    return res.status(404).json({ message: "Không thấy nhân viên" });
  }

  const isMatch = await bcrypt.compare(Password, staff[0].Password);
  if (!isMatch) {
    return res.status(401).json({ message: "Sai mật khẩu" });
  }

  const token = jwt.sign(
    { SoDienThoai: staff[0].SoDienThoai, Password: staff[0].Password },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({ token, message: "Đăng nhập thành công!" });
};

exports.registerNV = async (req, res) => {
  let { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;
  const staff = await staffService.findByAttribute("SoDienThoai", SoDienThoai);

  if (staff.length > 0) {
    return res.status(409).json({ message: "Nhân viên đã tồn tại" });
  }

  let hashedPassword = await bcrypt.hash(Password, 10);

  const newStaff = await staffService.create({
    HoTenNV,
    Password: hashedPassword,
    ChucVu,
    DiaChi,
    SoDienThoai,
  });
  return res.status(201).json(newStaff);
};

exports.verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).json({ message: "Không có token" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ" });
    req.staff = decoded;
    next();
  });
};

exports.getProfileNV = async (req, res) => {
  const staff = await staffService.findByAttribute(
    "SoDienThoai",
    req.staff.SoDienThoai
  );
  if (!staff)
    return res.status(404).json({ message: "Không tìm thấy tài khoản" });
  res.json(staff);
};

// Khách hàng
exports.loginKH = async (req, res) => {
  const { DienThoai, Password } = req.body;
  const reader = await readerService.findByAttribute("DienThoai", DienThoai);
  if (reader.length === 0) {
    return res.status(404).json({ message: "Không thấy khách hàng" });
  }

  const isMatch = await bcrypt.compare(Password, reader[0].Password);
  if (!isMatch) {
    return res.status(401).json({ message: "Sai mật khẩu" });
  }

  const token = jwt.sign(
    { DienThoai: reader[0].DienThoai, Password: reader[0].Password },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({ token, message: "Đăng nhập thành công!" });
};

exports.registerKH = async (req, res) => {
  let { HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai, Password } = req.body;
  const reader = await readerService.findByAttribute("DienThoai", DienThoai);

  if (reader.length > 0) {
    return res.status(409).json({ message: "Khách hàng đã tồn tại" });
  }

  let hashedPassword = await bcrypt.hash(Password, 10);

  const newReader = await readerService.create({
    HoLot,
    Ten,
    NgaySinh,
    Phai,
    DiaChi,
    DienThoai,
    Password: hashedPassword,
  });

  const token = jwt.sign(
    { DienThoai: DienThoai, Password: hashedPassword },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.status(201).json({ token, message: "Đăng ký thành công!" });
};

exports.getProfileKH = async (req, res) => {
  const reader = await readerService.findByAttribute(
    "DienThoai",
    req.staff.DienThoai
  );
  if (!reader)
    return res.status(404).json({ message: "Không tìm thấy tài khoản" });
  res.json(reader);
};
