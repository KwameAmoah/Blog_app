const express = require("express");
const passport = require("passport");

const { createBlog, getAllBlogs,updateBlog, getBlogById, deleteBlog } = require("../controllers/blogcontroller");


const blogRouter = express.Router();

blogRouter.post("/", passport.authenticate("jwt", {sesseion: false }) ,createBlog);
blogRouter.get("/", getAllBlogs)
blogRouter.get("/", getBlogById)
blogRouter.patch("/:blogId", updateBlog);
blogRouter.delete("/:blogId", deleteBlog);





module.exports = blogRouter;