//middleware pour gérer les interactions entre la collection espace vert 
//et la collection plante

const GreenSpace = require("../Models/Green_Space_Model");
const Plante = require('../Models/Plantes_Model');

exports.ajoutPlanteGP = (req, res, next) => {
    const greenSpaceId = req.params.greenSpaceId;
    const planteName = req.body.nom;

    GreenSpace.findById(greenSpaceId)
        .then(greenSpace => {
            if (!greenSpace) {
                return res.status(404).json({ message: "Espace vert non trouvé !" });
            }
            return Plante.findOne({ nom: planteName });
        })
        .then(planteExist => {
            if(!planteExist){
               return next();
            }
            //MAJ de la collection espace vert avec la plante
            return GreenSpace.findByIdAndUpdate(greenSpaceId, { $addToSet: { plantes: planteExist._id } })
                .then(() =>{
                    //MAJ de la collection plante avec l'espace vert
                    Plante.findByIdAndUpdate(planteExist._id, { $addToSet: { espaceVert: greenSpaceId } });
                })
                .then(() => {
                    res.status(200).json({ message: "Plante ajoutée à l'espace vert !" })
                    next();
                });
        })
        .catch(error => res.status(500).json({ error }));

};


//MAJ de la collection espace vert lors de la suppresion d'une plante
exports.deletePlanteGP = (req, res, next) => {
    const greenSpaceId = req.params.greenSpaceId;
    const planteId = req.params.id;

    GreenSpace.findByIdAndUpdate(greenSpaceId, { $pull: { plantes: planteId } })
        .then(() => {
            return Plante.findByIdAndUpdate(planteId, { $pull: { espaceVert: greenSpaceId } });
        })
        .then(() => {
            res.status(200).json({ message: "Plante supprimée de l'espace vert !" });
            next();
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

//MaJ de la collection plante lors de la suppression d'un espace vert
exports.deleteGPInPlante = (req, res, next) => {
    const greenSpaceId = req.params.id;

    Plante.updateMany({ espaceVert: greenSpaceId }, { $pull: { espaceVert: greenSpaceId } })
        .then(() => {
            res.status(200).json({ message: "Espace vert supprimé de la plante !" });
            next();
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};