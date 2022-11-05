const express = require("express");
const passport = require("passport");

const { createBlog, getAllBlogs } = require("../controllers/blogcontroller");


const blogRouter = express.Router();

blogRouter.post("/", passport.authenticate("jwt", {sesseion: false }) ,createBlog);
blogRouter.get("/", getAllBlogs)
blogRouter.patch("/:blogId", getAllBlogs);



module.exports = blogRouter;