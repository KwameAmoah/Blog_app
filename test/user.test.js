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

Test("sign up", async ()=> {
    const UserInfo = {
        //enter data here
    
    };
    const res = await supertest(app)
    .post("/auth/signup")
    .set("content_type", "application/x-www-form-urlencoded")
    .send(UserInfo);
expect(res.statusCode).toBe(201);
expect(res.body.status).toBe("success");
    
});

Test("sign in", async ()=> {
    const UserInfo = {
    
    };
    const res = await supertest(app)
    .post("/auth/signin")
    .set("content_type", "application/x-www-form-urlencoded")
    .send(UserInfo);
expect(res.statusCode).toBe(200);
expect(res.body.status).toBe("success");
    
})