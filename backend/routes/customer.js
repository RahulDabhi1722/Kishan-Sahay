const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Customer route works' });
});

module.exports = router;