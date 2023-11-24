const { Schema, model, models, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
    title: {type:String, required:true},
    serial: {type:Number, required:true},
    description: String,
    condition: String,
    images: [{type:String}],
    region: String,
    price: {type:Number, required:true},
    quantity: {type:Number, required:true},
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
});

export const Product = models?.Product || model('Product', ProductSchema);