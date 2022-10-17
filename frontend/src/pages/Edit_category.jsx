import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { axiosInstance } from '../axioss'
import "../css/admin_add.css"
function Edit_category() {
  const history = useHistory()
    const [cat, setCat] = useState()
    const id = useParams().id 
    console.log(id)
    const [input, setinput] = useState()
      const handleChange = (e)=>{
        setinput((prevState)=>({
          ...prevState,
          [e.target.name] : e.target.value
        }))
      }
      const sendRequest = async() =>{
        const res = await axiosInstance.post(`admin/edit/${id}`,{
          name: input.name,
          description: input.description
        })
        .catch(err => console.log(err));
        const data = await res.data
        return data
      }
      const handleSubmit =(e) =>{
        e.preventDefault()
        sendRequest().then(data => console.log(data)).then(() => history.push("/admin/Categories"))
        console.log(input)
      }
      const fetchDetails = async()=>{
        const res = await axiosInstance.get(`admin/category/${id}`).catch(err => console.log(err))
        const data = await res.data
        return data
    }
    useEffect(()=>{
      fetchDetails().then((data) =>{
           setCat(data.cat)
           setinput({
            
              name: data.cat.name,
              description: data.cat.description,

           })
          })
  },[id])
  console.log(cat)
  return (
    <section className='author'>
    <div className='ms-3 mt-5 header'>
        Edit a Category
    </div>
    <div className="add-author">
      {input && <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-center mb-3 mt-3">
                    <div className="col-4 ms-5">
                    <label for="name" className="col-form-label sign" >Name</label>
                    </div>
                    <div className="col-xxl-4">
                    <input type="text" id="name" name='name' value={input.name} className="form-control" onChange={handleChange}/>
                    </div>
            </div>
            <div className="row g-3 align-items-center mb-3 mt-3">
                    <div className="col-4 ms-5">
                    <label for="description" className="col-form-label sign">Description</label>
                    </div>
                    <div className="col-3">
                    <textarea name="description" value={input.description} id="desc" cols="83" rows="10" onChange={handleChange}></textarea>
                    {/* <input type="text" id="name" name='description' className="form-control" onChange={handleChange}/> */}
                    </div>
            </div>
            <div className="text-center mt-5 ms-5 ps-5">
                <button className='btn btn-primary w-25 btn-lg'>SUBMIT</button>
            </div>       
        </form>}
    </div>
</section>
  )
}

export default Edit_category