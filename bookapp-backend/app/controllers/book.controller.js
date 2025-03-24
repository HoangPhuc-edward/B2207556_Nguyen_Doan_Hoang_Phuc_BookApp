const bookService = require("../services/book.service");

exports.create = async (req, res, next) => {
  try {
    const result = await bookService.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const result = await bookService.findAll();
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const result = await bookService.findOne(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.findByAttribute = async (req, res, next) => {
  try {
    const attribute = req.params.attribute;
    const value = req.params.value;
    const result = await bookService.findByAttribute(attribute, value);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const result = await bookService.update(req.params.id, req.body);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await bookService.delete(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const result = await bookService.deleteAll();
    res.json(result);
  } catch (e) {
    next(e);
  }
};
