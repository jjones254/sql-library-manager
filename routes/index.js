const express = require('express');
const router = express.Router();

// get books page
router.get('/', (req, res) => {
  res.redirect("/books")
});

module.exports = router;
