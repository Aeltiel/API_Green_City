const GreenSpace = require("../Models/Green_Space_Model");
const fs = require('fs');

exports.createGreenSpace = (req, res, next) =>{
    const gpObject = JSON.parse(req.body)
    delete gpObject._id;
    const greenSpace = new GreenSpace({
        ...gpObject,
        imageSpaceUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    greenSpace.save()
        .then(() => {
            res.status(201).json({message : "Espace vert Ajouté !"})
        })
        .catch(err => res.status(400).json({message : err}))
}

exports.getAllGreenSpaces = (req, res, next) =>{
    GreenSpace.find()
    .then(greenSpaces => res.status(200).send(greenSpaces))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneGreenSpace = (req, res, next) =>{
    GreenSpace.findById(req.params.id)
}

exports.modifyGreenSpace = (req, res, next) =>{
    const greenSpaceId = req.params.id;
    const gpObject = req.body

    //Vérification en cas de nouvelle image
    if(req.file){
        const imageSpaceUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        greenSpaceUpdates.imageSpaceUrl = imageSpaceUrl;
    }

    //update de l'espace vert
    GreenSpace.findByIdAndUpdate(greenSpaceId, gpObject, { new: true })
        .then(updatedGreenSpace => {
            if (!updatedGreenSpace) {
                return res.status(404).json({ message: 'Espace vert non trouvé' });
            }
            res.status(200).json({ message: 'Espace vert modifié !', greenSpace: updatedGreenSpace });
        })
        .catch(error => res.status(400).json({ message: error.message }));
}

exports.deleteGreenSpace = (req, res, next) =>{
    GreenSpace.findById(req.params.id)
        .then(greenSpace => {
            const filename = greenSpace.imageSpaceUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                GreenSpace.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Espace vert supprimé !' }))
                    .catch(error => res.status(400).json({ message: error.message }));
            });
        })
        .catch(error => res.status(500).json({ message: error.message }));
}