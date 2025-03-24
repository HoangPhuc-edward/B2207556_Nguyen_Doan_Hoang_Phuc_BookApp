const express = require("express");
const publisherController = require("../controllers/publisher.controller");

const router = express.Router();

router.get("/", publisherController.findAll);
router.get("/:id", publisherController.findOne);
router.post("/", publisherController.create);
router.put("/:id", publisherController.update);
router.delete("/:id", publisherController.delete);

module.exports = router;
