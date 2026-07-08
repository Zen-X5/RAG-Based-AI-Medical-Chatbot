const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            default:"New Chat",
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Chat",chatSchema);