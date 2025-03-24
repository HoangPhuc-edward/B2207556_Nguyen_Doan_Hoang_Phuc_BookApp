const express = require("express");
const bookController = require("../controllers/book.controller");

const router = express.Router();

router.get("/", bookController.findAll);
router.get("/:id", bookController.findOne);
router.get("/search/:attribute/:value", bookController.findByAttribute);
router.post("/", bookController.create);
router.put("/:id", bookController.update);
router.delete("/:id", bookController.delete);
router.delete("/", bookController.deleteAll);

module.exports = router;
