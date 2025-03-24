const express = require("express");
const readerController = require("../controllers/reader.controller");

const router = express.Router();

router.get("/", readerController.findAll);
router.get("/:id", readerController.findOne);
router.get("/:attribute/:value", readerController.findByAttribute);
router.post("/", readerController.create);
router.put("/:id", readerController.update);
router.delete("/:id", readerController.delete);

module.exports = router;
