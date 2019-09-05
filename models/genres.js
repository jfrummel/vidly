const mongoose = require('mongoose');
const Joi = require("joi");


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;