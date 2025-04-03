const express = require('express');
const router = express.Router();

// Simple route handlers that are guaranteed to work
router.get('/', function(req, res) {
  res.json({ message: 'Get all users' });
});

router.get('/:id', function(req, res) {
  res.json({ message: `Get user with ID: ${req.params.id}` });
});

router.post('/', function(req, res) {
  res.json({ message: 'Create user', data: req.body });
});

router.put('/:id', function(req, res) {
  res.json({ message: `Update user with ID: ${req.params.id}`, data: req.body });
});

router.delete('/:id', function(req, res) {
  res.json({ message: `Delete user with ID: ${req.params.id}` });
});

module.exports = router;