const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Farmer route works' });
});

module.exports = router;