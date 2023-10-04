import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";


export default async function handle(req, res) {
  const {method} = req;
  
  await mongooseConnect();

  if (method === 'POST'){
    const {title,serial,describtion,condition,region,price,quantity} = req.body;

    const productDoc = await Product.create({
     title,serial,describtion,condition,region,price,quantity,
    });

   res.json(productDoc);
  }
  
}
