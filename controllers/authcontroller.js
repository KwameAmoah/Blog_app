// const { request } = require("http")

const userMOdel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const { use } = require("passport");


const genToken = function(user){
    const payload ={user};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    return token;
};


exports.signup = async (req,res,next) => {
    try {
        const {firstname,lastname,email,password,contact,paypal} = req.body;
        const user = await userMOdel.create({
            firstname,
            lastname,
            email,
            password,
            contact,
            paypal,
        });
        user.password = undefined;
        const token = genToken(user);
        return res.status(201).json({
            status: 'success',
            token,
            data: {
                user,
            },
        });
    } catch (error) {
        return next(error);
    }
};

exports.signin = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const user = await userMOdel.findOne({email});
        if(!user) return next (new Error("user not found"))
        const isCorrectPassword = await user.isCorrectPassword(password)
        if(!isCorrectPassword) return next (new Error("password incorrect"))
        const token = genToken(user);
        return res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        return next(error);
    }
};

