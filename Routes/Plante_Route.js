const express = require('express');
const router = express.Router();
const multer = require('../Middleware/multer-config');
const planteControl = require('../Controllers/Plantes_Controllers');

router.get('/', planteControl.getAllPlantes);
router.get('/:greenSpaceId/plante/:id', planteControl.getOnePlante);
router.post('/:greenSpaceId/plante/', multer, planteControl.createPlante);
router.patch('/:greenSpaceId/plante/:id', multer, planteControl.modifyPlante);
router.delete('/:greenSpaceId/plante/:id', planteControl.deletePlante);
