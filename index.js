require("express-async-errors");
require("winston-mongodb");
const config = require("config");
const winston = require("winston");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require('mongoose');
const auth = require("./routes/auth");
const error = require("./middleware/error");
const customers = require('./routes/customers');
const users = require("./routes/users");
const genres = require('./routes/genres');
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const express = require('express');
const app = express();

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly",
    level: "error"
});

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey not defined");
    process.exit(1);
} else {

}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB'));

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));