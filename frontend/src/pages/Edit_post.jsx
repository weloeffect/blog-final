import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { axiosInstance } from '../axioss'
import "../css/add.css"
import {Helmet} from "react-helmet"
function Edit_post() {
    const history = useHistory()
    const [blog, setBlog] = useState()
    const id = useParams().id
    console.log(id)
    const [input, setinput] = useState()
      const handleChange = (e)=>{
        setinput((prevState)=>({
          ...prevState,
          [e.target.name] : e.target.value
        }))
      }
      const handleImg = (e) => {
        // setimg((newimg) =>({...newimg,  
        //   thumbnail: e.target.files[0]
        // }));
        setinput({...input,  
          thumbnail: e.target.files[0]
        });
    }
    
      const sendRequest = async() =>{
        const formData = new FormData();
        formData.append('image', input.thumbnail);
        formData.append('title', input.title);
        formData.append('description', input.description);
        
        const res = await axiosInstance.put(`posts/edit/${id}`,formData)
        .catch(err => console.log(err));
        const data = await res.data
        return data
      }
      const handleSubmit =(e) =>{
        e.preventDefault()
        sendRequest().then(data => console.log(data)).then(() => history.push("/user/Blogs"))
        console.log(input)
      }
    
    const fetchDetails = async()=>{
        const res = await axiosInstance.get(`posts/view/${id}`).catch(err => console.log(err))
        const data = await res.data
        return data
    }
    useEffect(()=>{
        fetchDetails().then((data) =>{
             setBlog(data.post)
             setinput({
                thumbail: data.post.thumbnail,
                title: data.post.title,
                description: data.post.description,

             })
            })
    },[id])
    console.log(blog)
  return (
    <section className='Add ' >
    <Helmet>
      <title>Edit current Blog</title>
    </Helmet>
  {input &&<form onSubmit={handleSubmit} encType='multipart/form-data'>
        <h2 >Edit current  Blog</h2>
      <div className="mb-3 mt-4">
      <label for="thumbnail" className="form-label">Thumbnail</label>
          <input  type="file"  accept=".png, .jpg, .jpeg" name="image" className='form-control' id='thumbnail' onChange={handleImg} required />
    </div>
    <div className="mb-3">
      <label for="title" className="form-label">Title</label>
      <input type="text" name='title' value={input.title}  onChange={handleChange} className="form-control" id="title" required/>
    </div>
    <div className="mb-3">
      <label for="description" className="form-label">Description</label>
      <input type="text" name='description' value={input.description}  onChange={handleChange} className="form-control" id="description"  required/>
    </div>
    <div className='text-center mt-5'>
    <button type="submit" className="btn btn-primary btn-lg w-50 ">Submit</button>
    </div>
  </form>}
  </section>
  )
}

export default Edit_post