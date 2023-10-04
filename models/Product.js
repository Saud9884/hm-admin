const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
    title: {type:String, required:true},
    serial: {type:Number, required:true},
    price: {type:Number, required:true},
    quantity: {type:Number, required:true},
    description: String,
    condition: String,
    region: String,
});

export const Product = models.Product || model('Product', ProductSchema);