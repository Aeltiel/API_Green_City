const express = require('express');
const router = express.Router();
const greenSpaceControl = require('../Controllers/Green_Space_Controllers');
const multer = require('../Middleware/multer-config');

router.get('/', greenSpaceControl.getAllGreenSpaces);
router.get('/:id', greenSpaceControl.getOneGreenSpace);
router.post('/', multer, greenSpaceControl.createGreenSpace);
router.put('/:id', multer, greenSpaceControl.modifyGreenSpace);
router.delete('/:id', greenSpaceControl.deleteGreenSpace);

module.exports = router;