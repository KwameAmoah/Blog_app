const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const dbConnect = require("./config/db");
dbConnect();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "127.0.0.1"


app.listen(PORT, HOST, () =>{
    console.log(`server running locally on:${HOST} ${PORT}`)
})