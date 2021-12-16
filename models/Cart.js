const mongoose = require("mongoose");
 
const CartSchema = new mongoose.Schema(
    {
        userid: {type: String ,required:true},
        products: [
            {
                productid:{
                    type:String,
                },
                quantity:{
                    type:Number,
                    default:1,
                },
            },
        ], 
    },
    {timestamp:true}
);
module.exports = mongoose.model("Carts",CartSchema);