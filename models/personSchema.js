const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // Other fields and validations here...
}, { collection: "users" }); // Specify the collection name as "users"

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
