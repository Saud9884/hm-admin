
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct() {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [serial, setSerial] = useState('');
const [condition, setCondition] = useState('New');
const [region, setRegion] = useState('India');
const [price, setPrice] = useState('');
const [quantity, setQuantity] = useState('');

const [goToProducts, setGoToProducts] = useState(false);
const router = useRouter();

async function createProduct(e) {
  e.preventDefault();
  const data = {title,serial,description,condition,region,price,quantity};
  await axios.post('/api/products', data);
  setGoToProducts(true);
}

if (goToProducts){
  router.push('/products');
}
  return (
    <Layout>
      <form onSubmit={createProduct}>
      <h1>New Products</h1>
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
    </Layout>
  )
}
