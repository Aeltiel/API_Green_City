const mongoose = require("mongoose");

const fichePlanteSchema = mongoose.Schema({
    plante : { type: mongoose.Schema.Types.ObjectId, ref: "plantes", required: true },
    greenSpace : { type: mongoose.Schema.Types.ObjectId, ref: "greenspaces", required: true },
    datePlantation : { type: Date, required: true },
    sante : { type: String, required: true, trim: true },
    historiqueEntretien : {type : Array, default : [
        {
            date: { type: Date, required: true },
            action : { type: String, required: true, trim: true },
        }
    ]}
});

module.exports = mongoose.model("FicheEntretien", fichePlanteSchema);