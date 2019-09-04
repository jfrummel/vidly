const Joi = require("joi");
const mongoose = require("mongoose");

const validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
};


const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        length: 10
    },
    isGold: Boolean,
}));

exports.Customer = Customer;
exports.validate = validateCustomer;