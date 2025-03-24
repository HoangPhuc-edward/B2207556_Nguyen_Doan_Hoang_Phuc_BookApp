const publisherService = require("../services/publisher.service");

exports.create = async (req, res, next) => {
  try {
    const result = await publisherService.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const result = await publisherService.findAll();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const result = await publisherService.findOne(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const result = await publisherService.update(req.params.id, req.body);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await publisherService.delete(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};
