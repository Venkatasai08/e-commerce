const mongoose = require("mongoose");
 
const ProductSchema = new mongoose.Schema(
    {
        title: {type: String ,required:true,unique:true },
        desc: {type: String ,required:true},
        img: {type: String ,required:true},
        catogiries: {type: Array },
        size: {type: String },
        color: {type: String },
        price: {type: String ,required:true},
     
    },
    {timestamp:true}
);
module.exports = mongoose.model("Products",ProductSchema);