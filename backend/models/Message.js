const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema(
    {
        role:{
            type:String,
            enum:["user","assistant"],
            required:true
        },
        content:{
            type:String,
            required:true
        },
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat",
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Message",messageSchema);