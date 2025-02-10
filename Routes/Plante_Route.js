const express = require('express');
const router = express.Router();
const planteControl = require('../Controllers/Plantes_Controllers');

router.get('/', planteControl.getAllPlantes);

module.exports = router;