const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // Other fields and validations here...
});
const User = mongoose.model("User", userSchema);

module.exports = User;

