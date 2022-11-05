const express = require("express");
const passport = require("passport")
const authRouter = require("./Routes/authRoutes")
const blogRouter = require("./Routes/blogRoutes")


const app = express();
app.use(passport.initialize());
require("./middlewares/passport");

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use("/auth", authRouter)
app.use("/blogs", blogRouter)


app.get("/", async (req, res, next) => {
    return res.status(200).send("Welcome to our app!");
  });
  
  app.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      return res.status(200).json({
        user: req.user,
      });
    }
  );
  
  app.post("/signup", async (req, res, next) => {
    const user = await User.create(req.body);
    user.password = undefined; // removing the password from the user doc before signing into the JWT (this won't reflect in the db, cause it will not be saved.)
    const payload = { user: user };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10h",
      algorithm: "HS256",
    });
    return res.status(201).json({
      user,
      token,
    });
  });
  
  app.post("/signin", async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return next(new Error("User does not exist"));
    }
    const isCorrectPassword = await user.isPasswordCorrect(password);
    if (!isCorrectPassword) {
      return next(new Error("Incorrect Password"));
    }
    user.password = undefined; // removing the password from the user doc before signing into the JWT (this won't reflect in the db, cause it will not be saved.)
    const payload = { user: user };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });
    return res.status(200).json({
      user,
      token,
    });
  });






app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server err!";
    return res.status(statusCode).json({success: false , message})
});


module.exports = app;