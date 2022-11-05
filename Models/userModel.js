const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: "string",
        trim: true,
        required: [true, "what do we call you"],
    },
    lastname: {
        type: "string",
        trim: true,
        required: [true, "you belong to what family"],
    },
    email: {
        type: 'string',
        trim: true,
        unique: true,
        required: [true, `your email address please`],
    },
    password: {
        type: 'string',
        minlength: 6,
        trim: true,
        required: [true, "you need a password, please enter one"],
    }
});

userSchema.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});


userSchema.method.isCorrectPassword = async function (inputtedPassword) {
    const isCorrectPassword = await bcrypt.compare(
        inputtedPassword,
        this.password
    );
    return isCorrectPassword
};

const User = mongoose.model("user", userSchema)



module.exports = User;