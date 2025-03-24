const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/loginNV", authController.loginNV);
router.post("/registerNV", authController.registerNV);
router.get(
  "/verifyNV",
  authController.verifyToken,
  authController.getProfileNV
);

router.post("/loginKH", authController.loginKH);
router.post("/registerKH", authController.registerKH);
router.get(
  "/verifyKH",
  authController.verifyToken,
  authController.getProfileKH
);

module.exports = router;
