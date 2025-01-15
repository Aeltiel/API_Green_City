const Plante = require('../Models/Plantes_Models');
const fs = require('fs');

exports.createPlante = (req, res, next) =>{
    const pObject = req.body;
    delete pObject._id;
        const plante = new Plante({
            ...pObject,
            imagePlanteUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
    
        plante.save()
            .then(() => {
                res.status(201).json({message : "Votre plante a été ajouté !"})
            })
            .catch(err => res.status(400).json({message : err}))
};

exports.getAllPlantes = (req, res, next) =>{
    Plante.find()
    .then(plantes => res.status(200).send(plantes))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePlante = (req, res, next) =>{
    Plante.findById(req.params.id)
        .then(plante => res.status(200).send(plante))
        .catch(error => res.status(404).json({ error }));
};

exports.modifyPlante = (req, res, next) =>{
    let planteObject;
        Plante.findById(req.params.id )
            .then ((plante) =>{
                
                if(req.file){
                    const filename = plante.imagePlanteUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`,(error)=>{
                        if (error) console.log(error)
                    })
                    planteObject = {
                        ...req.body,
                        imagePlanteUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
            
                }else{
                    planteObject = { ...req.body };
                }
    
                delete planteObject._id;
                return Plante.updateOne({ _id: req.params.id }, { ...planteObject, _id: req.params.id });
            })
            .then(() => res.status(200).json({ message: "Plante mise à jour avec succès !" }))
            .catch(error => res.status(500).json({message: "Erreur lors de la modification de la plante" + error.message}));
}

exports.deletePlante = (req, res, next) =>{
    Plante.findById(req.params.id)
            .then(plante => {
                const filename = plante.imagePlanteUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Plante.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Plante supprimée !' }))
                        .catch(error => res.status(400).json({ message: error.message }));
                });
            })
            .catch(error => res.status(500).json({ message: error.message }));
}