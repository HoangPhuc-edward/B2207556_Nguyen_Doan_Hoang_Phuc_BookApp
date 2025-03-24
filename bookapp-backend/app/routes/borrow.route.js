const express = require("express");
const borrowController = require("../controllers/borrow.controller");

const router = express.Router();

router.get("/", borrowController.findAll);
router.get("/:id", borrowController.findOne);
router.get("/find/:attribute/:value", borrowController.findByAttribute);
router.post("/", borrowController.create);
router.put("/:id", borrowController.update);
router.delete("/:id", borrowController.delete);

module.exports = router;
