// const { request } = require("http")

// const userMOdel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
// const { use } = require("passport");
const User = require("../Models/userModel");


const genToken = function(user){
    const payload ={user};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    return token;
};


exports.signup = async (req,res,next) => {
    try {
        const {firstName, lastName, email, password, confirmPassword, contact} = req.body;
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contact,
           
        });
        user.password = undefined;
        user.confirmPassword = undefined;

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
        const user = await User.findOne({email});
        if(!user) return next (new Error("cant be found in the blogverse, sorry!"));

        const isCorrectPassword = await user.isCorrectPassword(password);
        if(!isCorrectPassword) return next (new Error("wrong key, the lock remains."));
        user.password = undefined;
        const token = genToken(user);
        return res.status(200).json({
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



// exports.signin = async (req ,res, next) => {
//     try {
//         const {email, password} = req.body;
//         if (!email || !password)
//             return next (new Error("cant be found in the blogverse, sorry!"));
//         const user = await User.findOne({email}).select("+password");
//         if (!user || !(await user.isCorrectPassword(password)))
//             return next(new Error("Hold up, one or both is incorrect."));
//         user.password = undefined;
//         const token = genToken(user);
//         return req.status(200).json({
//             status: "success",
//             token,
//             date: {
//                 user,
//                 token
//             },
//         });

//     } catch (error) {
//         return next(error);
//     }
// }
