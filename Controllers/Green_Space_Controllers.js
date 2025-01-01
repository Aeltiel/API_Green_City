const GreenSpace = require("../Models/Green_Space_Model");
const fs = require('fs');

exports.createGreenSpace = (req, res, next) =>{
    const gpObject = req.body;
    console.log(gpObject);
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
        .then(greenSpace => res.status(200).send(greenSpace))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyGreenSpace = (req, res, next) =>{
    let greenSpaceObject;
    GreenSpace.findById(req.params.id )
        .then ((greenSpace) =>{
            console.log("dans le .then pour supprimer l'image s'il y en a une",greenSpace);
            if(req.file){
                const filename = greenSpace.imageSpaceUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`,(error)=>{
                    if (error) console.log(error)
                })
                greenSpaceObject = {
                    ...req.body,
                    imageSpaceUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                console.log("création de l'objet après suppression de l'image",greenSpaceObject);
            }else{
                greenSpaceObject = { ...req.body };
            }

            delete greenSpaceObject._id;
            return GreenSpace.updateOne({ _id: req.params.id }, { ...greenSpaceObject, _id: req.params.id });
        })
        .then(() => res.status(200).json({ message: "Espace vert modifié !" }))
        .catch(error => res.status(500).json({message: "Erreur lors de la modification de l'espace vert" + error.message}));
            
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