const mongoose = require("mongoose");

const planteSchema = mongoose.Schema({
    nom: { type: String, required: true, trim: true },
    nomScientifique: { type: String, required: true, trim: true },
    imagePlanteUrl: { type: String, required: true },
    typeSol: { type: String, required: true, trim: true },
    exposition: { type: String, required: true, trim: true },
    arrosage: { type: String, required: true, trim: true },
    plantation: { type: String, required: true, trim: true },
    recolte : { type: String, required: true, trim: true },
    espaceVert : {type : Array, default : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "greenspaces"
        }
    ], required: true},
    ficheEntretien:{type : Array, default : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FichesEntretien"
        }
    ]},
});

module.exports = mongoose.model("Plante", planteSchema);