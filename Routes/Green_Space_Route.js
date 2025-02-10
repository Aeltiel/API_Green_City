const express = require('express');
const router = express.Router();
const greenSpaceControl = require('../Controllers/Green_Space_Controllers');
const multer = require('../Middleware/multer-config');
const middlePlante = require('../Middleware/greenSpace_middleware');
const planteControl = require('../Controllers/Plantes_Controllers');

router.get('/', greenSpaceControl.getAllGreenSpaces);
router.get('/:id', greenSpaceControl.getOneGreenSpace);
router.post('/', multer, greenSpaceControl.createGreenSpace);
router.patch('/:id', multer, greenSpaceControl.modifyGreenSpace);
router.delete('/:id', middlePlante.deleteGPInPlante, greenSpaceControl.deleteGreenSpace);

//Sous route pour les plantes
router.get('/:greenSpaceId/plante/:planteId', planteControl.getOnePlante);
router.post('/:greenSpaceId/plante/', multer, middlePlante.ajoutPlanteGP, planteControl.createPlante);
router.patch('/:greenSpaceId/plante/:planteId', multer, middlePlante.ajoutPlanteGP, planteControl.modifyPlante);
router.delete('/:greenSpaceId/plante/:planteId', middlePlante.deletePlanteGP, planteControl.deletePlante);


module.exports = router;