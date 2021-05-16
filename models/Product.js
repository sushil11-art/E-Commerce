const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const ProductSchema=new Schema({

    categoryID:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    ownerID:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    }
})


module.exports=mongoose.model('Product',ProductSchema);
