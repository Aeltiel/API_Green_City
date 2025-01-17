//middleware pour gérer les interactions entre la collection espace vert 
//et la collection plante

const { Collection } = require("mongoose");
const GreenSpace = require("../Models/Green_Space_Model");
const Plante = require('../Models/Plantes_Models');

exports.ajoutPlanteGP = (req, res, next) => {
    const greenSpaceId = req.params.greenSpaceId;
    const planteid = req.body.id;

    GreenSpace.findById(greenSpaceId)
        .then(greenSpace => {
            if (!greenSpace) {
                return res.status(404).json({ message: "Espace vert non trouvé !" });
            }
            /*
            si la plante existe déjà dans la Collection
            ->on push son id dans le tableau de plantes du modèle espace vert
            si la plante n'existe pas encore dans la collection
            ->je la créer ici (mais doublon avec controller plante)?
            ->j'attend qu'elle soit crée via le controller plante pour l'ajouter ?
            */
        })
        .catch(error => res.status(500).json({ error }));

};