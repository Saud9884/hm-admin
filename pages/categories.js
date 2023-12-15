import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState([]);

    useEffect(() => {
       fetchCategories();
    }, []);

    function fetchCategories() {
        axios
        .get("/api/categories")
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }

    async function saveCategory(e) {
        e.preventDefault();
        const data = {name, parentCategory,properties:properties.map(p => ({
            name:p.name,
            values:p.values.split(','),
          })),
        };

        if(editedCategory){
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else{
            await axios.post('/api/categories', data);
        }

        setName('');
        setParentCategory('');
        setProperties([]);
        fetchCategories();
    }

    function editCategory(category) {
            setEditedCategory(category);
            setName(category.name);
            setParentCategory(category.parent?._id);
            setProperties(category.properties.map(({name,values}) => ({
                name,
                values:values.join(',')
              }))
              );
    }

    function deleteCategory(category) {
        swal.fire({
            title: 'Are you Sure?',
            text: `Do you want to delete ${category.name} Category?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed){
                const {_id} = category;
                
           await axios
              .delete('/api/categories?_id='+_id);
              fetchCategories();
            }
        }).catch(error => {
           console.log(error);
        });

    }

    function addProperty() {
        setProperties(prev => {
            return [...prev, {name:'',values:''}];
        })
    }

    function handlePropertyNameChange(index,property,newName) {
        setProperties(prev => {
          const properties = [...prev];
          properties[index].name = newName;
          return properties;
        });
      }
      function handlePropertyValuesChange(index,property,newValues) {
        setProperties(prev => {
          const properties = [...prev];
          properties[index].values = newValues;
          return properties;
        });
      }

      function removeProperty(indexToRemove) {
        setProperties(prev => {
          return [...prev].filter((p,pIndex) => {
            return pIndex !== indexToRemove;
          });
        });
      }

    return(
       <Layout>
        <h1>Categories</h1>

        <div className="mt-4">
        <label>{editedCategory ? `Edit Category : ${editedCategory.name}` : "Add New Category"}</label>
        <form onSubmit={saveCategory}>

            <div className="flex gap-4">
        <input  type="text"  placeholder="Enter Name of the Category" value={name} onChange={e => setName(e.target.value)}/>

        <select 
        
            value={parentCategory}
            onChange={e => setParentCategory(e.target.value)}>
            <option value="">No Parent category</option>
            {categories.length > 0 && categories.map(category => (
                    <option value={category._id}>{category.name}</option>
                ))}
        </select>

        
        </div>
        <div className="mb-3 mt-2">
        <label className="block mb-2">Properties</label>
       <button 
       onClick={addProperty}
       type="button" 
       className="btn-default text-sm">Add New Property</button>
       {properties.length > 0 && properties.map((property,index) => (
        <div className="flex gap-1 mt-2 mb-2">
        <input type="text" className="mb-0" value={property.name} onChange={e => handlePropertyNameChange(index,property,e.target.value)} placeholder="Property Name"/>
        <input type="text" className="mb-0" onChange={e =>
                       handlePropertyValuesChange(
                         index,
                         property,e.target.value
                       )}
                     value={property.values} placeholder="Value"/>
        <button className="btn-red" 
        onClick={() => removeProperty(index)}
        type="button"
        >Remove</button>
        </div>
       ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="btn-red">Cancel</button>
          )}
          <button type="submit" className="btn-black">Save</button>
          </div>
        
        </form>
        </div>
        {!editedCategory && (
        <table className="basic mt-8">
            <thead>
                <tr>
                    <td>Category Name</td>
                    <td>Parent Category</td>
                    <td>Options</td>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 && categories.map(category => (
                    <tr>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <button onClick={() => editCategory(category)}
                            className="btn-default mr-2">Edit</button>

                            <button onClick={() => deleteCategory(category)} 
                            className="btn-red">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        )}
       </Layout>
    );
}

export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
    ));