const express=require("express");
const cors=require("cors");
const connectDb=require("./config/db");
const app=express();
const medicalRoutes=require("./routes/medicalRoutes");

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE","PUT"],
    credentials:true
}));

app.use(express.json());
app.use("/api/ai",medicalRoutes);

const port=8080;

const startServer=async()=>{
    try{
        await connectDb();
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}...`);
        })
    }
    catch(e){
        console.log(`Server startup error`)
    }
}

startServer();
