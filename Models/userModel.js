const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "what do we call you"],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "you belong to what family?"],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'your electronic address please'],
    },
    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: [true, "A safe with no locks?, please mate"],
    },
    confirmPassword: {
        type: String,
        minlength: 6,
        trim: true,
        required: [true, "The first key and this key dont add up mate"],
    },
    contact: {
        type: Number,
        minlength:10,
        required: [true, "how do we reach you?"]
    }
});

userSchema.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const confirmHashedPassword = await bcrypt.hash(this.confirmPassword, 10);

    this.password = hashedPassword;
    next();

    this.confirmPassword = confirmHashedPassword;
    next();
});



userSchema.methods.isCorrectPassword = async function (inputtedPassword) {
    const isCorrectPassword = await bcrypt.compare(
        inputtedPassword,
        this.password
    );
    return isCorrectPassword;
};

const User = mongoose.model("user", userSchema)



module.exports = User;