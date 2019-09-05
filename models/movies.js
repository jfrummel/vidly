const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");


const Movie = mongoose.model("Movie", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 250
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(1).max(50).required(),
        genreId: Joi.string().min(3).max(50).required(),
        numberInStock: Joi.number().integer().required(),
        dailyRentalRate: Joi.number().integer().required()
    }
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;