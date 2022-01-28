const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* async handler for each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      next(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  const books = await Book.findAll();
  res.json(books);
}));

module.exports = router;
