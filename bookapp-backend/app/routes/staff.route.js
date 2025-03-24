const express = require("express");
const staffController = require("../controllers/staff.controller");

const router = express.Router();

router.get("/", staffController.findAll);
router.get("/:id", staffController.findOne);
router.get("/search/:attribute/:value", staffController.findByAttribute);
router.post("/", staffController.create);
router.put("/:id", staffController.update);
router.delete("/:id", staffController.delete);

module.exports = router;
