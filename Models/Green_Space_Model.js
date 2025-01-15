const mongoose = require("mongoose");

const greenSpaceSchema = mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  latitude: { type: Number, required: true, trim: true },
  longitude: { type: Number, required: true, trim: true },
  superficie: { type: Number, required: true, trim: true },
  plantes: {
    type: Array,
    default: [
      {
        //le type mongoose.Schema.Types.ObjectId est une référence vers un document dans une autre collection
        type: mongoose.Schema.Types.ObjectId,
        ref: "plantes",
      },
    ],
  },
  responsable: { type: String, required: true, trim: true },
  imageSpaceUrl: { type: String, required: true },
});

module.exports = mongoose.model("GreenSpace", greenSpaceSchema);