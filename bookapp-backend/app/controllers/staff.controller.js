const staffService = require("../services/staff.service");

exports.create = async (req, res, next) => {
  try {
    const result = await staffService.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const result = await staffService.findAll();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const result = await staffService.findOne(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.findByAttribute = async (req, res, next) => {
  try {
    const attribute = req.params.attribute;
    const value = req.params.value;
    const result = await staffService.findByAttribute(attribute, value);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const result = await staffService.update(req.params.id, req.body);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await staffService.delete(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};
