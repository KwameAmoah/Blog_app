// const { default: mongoose } = require("mongoose");
const supertest = require("supertest")
const app = require("../app")
const dotenv = require("dotenv")
dotenv.config();


const TEST_DB_URI = process.env.TEST_DB_URI;


beforeAll((finished) => {
    
    mongoose.connect(TEST_DB_URI);
    mongoose.connection.on("connected", async() => {
        console.log("you're in!");
    });
    mongoose.connection.model("error", (err) =>{
        console.log("sorry not connected", err);
    });
    done();
});




afterAll((finished) => {
    mongoose.connection.close(finished)
});

let blogId;

Test("get all blogs", async ()=> {
    const res = supertest(app).get("/blogs");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");   
});

Test("create blog", async ()=> {
    const blogData = {

    };
    const res = await supertest(app).post("/blog").set("Authorization", `bearer #{TEST_TOKEN}`).send(blogData);
    blogId =res.body.data.blog_id
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    
});

Test("Patch blog", async ()=> {
    const blogData = {
        state: "published"
    };
    const res = await supertest(app)
    .patch(`/blog/${blogId}`).set("Authorization", `bearer #{TEST_TOKEN}`)
    .send(blogData);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");   
});

Test("get all blogs", async ()=> {
    const res = await supertest(app).get(`/blog/`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");   
});

Test("get blog", async ()=> {
    const res = await supertest(app).get(`/blog/`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");   
});

Test("delete blog", async ()=> {
    const res = await supertest(app)
    .delete(`/blog/${blogId}`)
    .set("Authorization", `bearer ${TEST_TOKEN}`)
    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});   
});




