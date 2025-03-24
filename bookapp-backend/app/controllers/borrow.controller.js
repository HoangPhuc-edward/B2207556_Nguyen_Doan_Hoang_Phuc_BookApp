const borrowService = require("../services/borrow.service");

exports.create = async (req, res, next) => {
  try {
    const result = await borrowService.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const result = await borrowService.findAll();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const result = await borrowService.findOne(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.findByAttribute = async (req, res, next) => {
  try {
    const result = await borrowService.findByAttribute(
      req.params.attribute,
      req.params.value
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const result = await borrowService.update(req.params.id, req.body);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await borrowService.delete(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};
