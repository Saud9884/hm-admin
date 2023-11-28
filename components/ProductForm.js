import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from 'next-cloudinary';
import { ReactSortable } from "react-sortablejs";

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
    images:existingImages,
    category:assignedCategory,
}
) {
const [title, setTitle] = useState(existingTitle || '');
const [category, setCategory] = useState(assignedCategory || '');
const [description, setDescription] = useState(existingDescription || '');
const [serial, setSerial] = useState(existingSerial || '');
const [condition, setCondition] = useState(existingCondition || 'New');
const [region, setRegion] = useState(existingRegion || 'India');
const [price, setPrice] = useState(existingPrice || '');
const [quantity, setQuantity] = useState(existingQuantity || '');
const [images, setImages] = useState(existingImages || []);

const [goToProducts, setGoToProducts] = useState(false);
const [categories, setCategories] = useState([]);
const router = useRouter();

useEffect(() => {
  axios
    .get("/api/categories")
    .then(res => setCategories(res.data))
    .catch(err => console.error(err));
}, []);



async function saveProduct(e) {

  e.preventDefault();
  const data = {title,serial,description,condition,region,price,quantity,images,category};
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

function updateImagesOrder(images) {
  console.log("here",images);
}

const propertiesToFill = [];
if (categories.length > 0 && category) {
  let catInfo = categories.find(({_id}) => _id === category);
  propertiesToFill.push(...catInfo.properties);
  while(catInfo?.parent?._id) {
    const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
    propertiesToFill.push(...parentCat.properties);
    catInfo = parentCat;
  }
}
  return (
    <>
      <form onSubmit={saveProduct}>
      
      <label>Product Name</label> 
         <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

      <label>Category</label>

      <select 
      value={category}
      onChange={e => setCategory(e.target.value)}>

        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(c => (
          <option value={c._id}>{c.name}</option>
        ))}
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <div>
              <select 
              >
                {p.values.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

         <label>Serial Number</label>
         <input type="text" value={serial} onChange={e => setSerial(e.target.value)}/>

          <label>
          Photos
        </label>
        <div className="mb-2 flex flex-wrap gap-2">
          <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="rounded-lg">
              <CldImage
                width="72"
                height="72"
                src={image}
                sizes="100vw"
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
          
          </ReactSortable>
         
         
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-gray-100 shadow-sm border border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
           
    <div>
    <CldUploadWidget 
    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
    onSuccess={(results) => {
      let uploadedPublicIds = [];

      // Check if results.info is an array
      if (Array.isArray(results.info)) {
        uploadedPublicIds = results.info.map((result) => result.public_id);
      } else if (results.info && results.info.public_id) {
        // If it's a single object, extract the public_id
        uploadedPublicIds = [results.info.public_id];
      }
      setImages((prevImageUrls) => [...prevImageUrls, ...uploadedPublicIds]);
    }}>
  {({ open }) => {
    return (
      <button className="button" typeof="button" value={images} onClick={() => open()}>
        Upload
      </button>
    );
  }}
</CldUploadWidget>
</div>
  
          </label>
        </div>  


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