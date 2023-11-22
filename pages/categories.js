import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
          .get("/api/categories")
          .then(res => setCategories(res.data))
          .catch(err => console.error(err));
    }, []);

    async function saveCategory(e) {
        e.preventDefault();
        await axios.post('/api/categories', {name});
        setName('');
    }

    return(
       <Layout>
        <h1>Categories</h1>
        <div className="mt-4">
        <label>Add New Category</label>
        <form onSubmit={saveCategory} className="flex gap-5">
        <input className="mb-0" type="text" placeholder="Enter Name of the Category" value={name} onChange={e => setName(e.target.value)}/>
        <button type="submit" className="btn-black">Save</button>
        </form>
        </div>
        <table className="mt-8">
            <thead>
                <tr>
                    <td>Category Name</td>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 && categories.map(category => (
                    <tr>
                        <td>{category.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
       </Layout>
    );
}