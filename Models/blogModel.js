const mongoose = require("mongoose");


const schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const blogSchema = new schema({
    title:{
        type: String,
        trim: true,
        required:[true, "not going to give me a name?"],

    },
    description:{
        type: String,
        
    },
    author_id:{
        type: ObjectId,
        required:[true, "who wrote this here piece"],
        ref: "User"
        
    },
    author:{
        type: String,
        required:[true, "an author is needed"],
        
    },
    state:{
        type: String,
        trim: true,
        default: "draft",
        enum: ["draft", "published"],
        
    },
    read_count:{
        type: Number,
        default: 0
        
    },
    reading_time:{
        type: Number,
        
    },
    tags:{
        type: [String],
        
    },
    body:{
        type: String,
        trim: true,
        required:[true, "your blog cant be emptry can it?"] ,
        
    },
    timestap:{
        type: Date,
        default: Date.now(),
    },
});


const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog