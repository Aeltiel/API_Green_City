const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    nom : {type : String, required : true, trim: true},
    prenom : {type : String, required : true, trim: true},
    email : {type : String, required : true, unique : true, trim: true},
    password : {type : String, required : true, trim: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);