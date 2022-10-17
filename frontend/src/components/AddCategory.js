import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "../css/admin_add.css"
function AddCategory() {
    const [input, setinput] = useState({
        name:"",
        description:"",
      })
      const history = useHistory()
      const handleChange = (e)=>{
        setinput({
          ...input,
          [e.target.name] : e.target.value
        })
      }
      const sendRequest = async() =>{
        const res = await axios.post('http://localhost:5000/admin/addCategory',{
        name: input.name,
        description:input.description
      })
      .catch(err => console.log(err))
      const data = await res.data
      return data
    }  
    const handleSubmit =(e) =>{
        e.preventDefault()
        sendRequest().then(data => console.log(data))
        console.log(input)
        history.push("/admin/Categories")
      }
  return (
    <section className='author'>
        <div className='ms-3 mt-5 header'>
            Add a Category
        </div>
        <div className="add-author">
            <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center mb-3 mt-3">
                        <div className="col-4 ms-5">
                        <label for="name" className="col-form-label sign" >Name</label>
                        </div>
                        <div className="col-xxl-4">
                        <input type="text" id="name" name='name' className="form-control" onChange={handleChange}/>
                        </div>
                </div>
                <div className="row g-3 align-items-center mb-3 mt-3">
                        <div className="col-4 ms-5">
                        <label for="description" className="col-form-label sign">Description</label>
                        </div>
                        <div className="col-3">
                        <textarea name="description"  id="desc" cols="83" rows="10" onChange={handleChange}></textarea>
                        {/* <input type="text" id="name" name='description' className="form-control" onChange={handleChange}/> */}
                        </div>
                </div>
                <div className="text-center mt-5 ms-5 ps-5">
                    <button className='btn btn-primary w-25 btn-lg'>SUBMIT</button>
                </div>       
            </form>
        </div>
   </section>
  )
}

export default AddCategory