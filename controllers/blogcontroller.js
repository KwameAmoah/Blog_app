const blogMOdel = require("../Models/blogModel")

exports.createBlog = async (req,res,next) => {
    try {
        const blogDetails = {...req.body,
             author: `${req.user.firstName} ${req.user.lastName}`,
              author_id:req.user._id };
        const blog = await blogMOdel.create(blogDetails);
        return res.status(201).json({
            status: 'success',
            data: {
                blog,
            },
        });
    } catch (error) {
        return next(error);
    }
};

exports.updateBlog = async (req,res,next) => {
    try {
        const {blogId}= req.params;
        const blogUpdate= await blogMOdel.findById(blogId);
        if(!blogUpdate) return next(new Error("sorry mate, she doesnt exist!"));
        if (blogUpdate.author_id.toString() !== req.user._id)
            return next(
                new Error("sorry mate but you cant do this")
            );
        const blogUpdated = await blogMOdel.findByIdAndUpdate(blogId, req.body, {
            new:true,
            runValidators: true,
        })
        // const blogDetails = {...req.body, author: req.user.__id }
        // blog = await blogMOdel.create(blogDetails);
        return res.status(200).json({
            status: 'success',
            data: {
                blogUpdated,
            },
        });
    } catch (error) {
        return next(error);
    }
};

exports.getAllBlogs = async (req,res,next) => {


    const { query } = req;

    const { 
        created_at, 
        state ={"published" : "draft"}, 
        order = 'asc', 
        read_count = 'created_at',
        reading_time = 'read_at', 
        timestamp = 'time_at', 
        page = 1, 
        per_page = 20
    } = query;

    const findQuery = {};

    if (read_count) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 

    if (reading_time) {
        findQuery.read_at = {
            $gt: moment(read_at).startOf('day').toDate(), 
            $lt: moment(read_at).endOf('day').toDate(),
        }
    } 

    if (timestamp) {
        findQuery.time_at = {
            $gt: moment(time_at).startOf('day').toDate(), 
            $lt: moment(time_at).endOf('day').toDate(),
        }
    } 

    if (state) {
        findQuery.state = {"published" : "draft"};
    }

    const sortQuery = {};

    const sortAttributes = order_by.split(',')

    for (const attribute of sortAttributes) {
        if (order === 'asc' && order_by) {
            sortQuery[attribute] = 1
        }
    
        if (order === 'desc' && order_by) {
            sortQuery[attribute] = -1
        }
    }


    const orders = await OrderModel
    .find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)

    return res.status(200).json({ status: true, orders })







    // const page = req.query.page || 1
    // const limit = 20
    // const skip = (page - 1) * limit

// try {
//     const blog = await blogMOdel.find()
//     .find(serchQuery)
//     .sort(sortQuery)
//     .skip(skip)
//     .limit(limit)

//     if (!blog) return next(new Error("blog requested not found!"))

//     return res.status(200).json({
//         status: "sucess",
//         data: blog
//     })
// }catch (error) {
//     return next(error)
// }
    // try {
    //     const filter = {"state": "published"}
    //     const blog = await blogMOdel.find(filter);
    //     return res.status(200).json({
    //         status: 'success',
    //         data: {
    //             blog,
    //         },
    //     });
    // } catch (error) {
    //     return next(error);
    // }
};


exports.getBlogById = async (req,res,next) => {
    try {
        const { blogId} = req.params;
        const blog = await blogMOdel.findOne({ _Id:blogId, state: "published"}).populate(author_id); 
        if (!blog) return next ( new Error("sorry mate, she doesnt exist"));
        return res.status(200).json({
            status: 'success',
            data: {
                blog,
                read_count,
            },
        });
    } catch (error) {
        return next(error);
    }
};


exports.deleteBlog = async(req,res,next) => {
    try {
        const { blogId} = req.params;
        const blogDelete = await blogMOdel.findById(blogId);
        if(!blogDelete) return next (new Error("sorry mate, she doesnt exist!"));
        if (blogDelete.author_id.toString() !== req.user._id)
            return next (
                new Error("sorry mate but you cant do this")
            );
        const blogDeleted = await blogMOdel.findByIdAndDelete(blogId);
        if (!blogDeleted) return next( new Error("sorry mate, she doesnt exist!"));
        return res.status(204).json({
            status:"success",
            date: "null",
        });
    } catch (error) {
        return next(error);
    }
};

