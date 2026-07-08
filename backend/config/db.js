require("dotenv").config();
const mongoose=require("mongoose");

const mongo_url=process.env.MONGO_URL;

let connectDb=async ()=>{
    await mongoose.connect(mongo_url)
    .then(()=>{
        console.log("Database connected")
    })
    .catch((e)=>{
        console.log(`Database connection failed ${e}`)
    })
}
module.exports=connectDb;