import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm(
    {
    _id,
    title:existingTitle,
    serial:existingSerial,
    description:existingDescription,
    condition:existingCondition,
    region:existingRegion,
    price:existingPrice,
    quantity:existingQuantity,
}
) {
const [title, setTitle] = useState(existingTitle || '');
const [description, setDescription] = useState(existingDescription || '');
const [serial, setSerial] = useState(existingSerial || '');
const [condition, setCondition] = useState(existingCondition || 'New');
const [region, setRegion] = useState(existingRegion || 'India');
const [price, setPrice] = useState(existingPrice || '');
const [quantity, setQuantity] = useState(existingQuantity || '');

const [goToProducts, setGoToProducts] = useState(false);
const router = useRouter();

async function saveProduct(e) {
  e.preventDefault();
  const data = {title,serial,description,condition,region,price,quantity};
  if(_id){
     //Update or edit Product
    await axios.put('/api/products', {...data,_id});
  }else {
    //Create new Product
    await axios.post('/api/products', data);
    
  }
  setGoToProducts(true);
  
}

if (goToProducts){
  router.push('/products');
}
  return (
    <>
      <form onSubmit={saveProduct}>
      
      <label>Product Name</label> 
         <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
         <label>Serial Number</label>
         <input type="text" value={serial} onChange={e => setSerial(e.target.value)}/>

         <label>Condition</label>
         <select onChange={e => setCondition(e.target.value)} defaultValue={condition}>
          <option value="New">New</option>
          <option value="New - Open box">New - Open box</option>
          <option value="Used">Used</option>
         </select>

         <label>Region</label>
         <select onChange={e => setRegion(e.target.value)} defaultValue={region}>
          <option value="India">India</option>
         </select>

         <label>Description</label>
         <textarea value={description} onChange={e => setDescription(e.target.value)}/>

         <label>Price (USD)</label>
         <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

         <label>Quantity</label>
         <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/>

         <button type="submit" className="btn-black">Save</button>
         </form>
    </>
  );
}