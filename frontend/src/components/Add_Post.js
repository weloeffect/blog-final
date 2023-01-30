import React, {useState} from 'react'
import "../css/add.css"
import {Helmet} from "react-helmet"
// import {axiosInstance} from '../axioss';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { axiosInstance } from '../axioss';
 
function Add_Post() {
  const history = useHistory()
  const id = useParams().id
  console.log(id)

  const [input, setinput] = useState({
    thumbnail:"",
    title:"",
    description:"",
    user: localStorage.getItem("userId")
  })
  const handleImg = (e) => {
    // setimg((newimg) =>({...newimg,  
    //   thumbnail: e.target.files[0]
    // }));
    setinput({...input,  
      thumbnail: e.target.files[0]
    });
}
  const handleChange = (e)=>{
    setinput({
      ...input,
      [e.target.name] : e.target.value
    })
  }
  const sendRequest = async() =>{
    const formData = new FormData();
    formData.append('image', input.thumbnail);
    formData.append('title', input.title);
    formData.append('description', input.description);
    formData.append('user', input.user);
    
    
    const res = await axiosInstance.post(`user/${id}/createPost`,formData)
    .catch(err => console.log(err));
    const data = await res.data
    return data
  }
  //   const res = await axios.post(`http://localhost:5000/admin/${id}/createPost`,{
  //   thumbnail: input.thumbnail,
  //   title:input.title,
  //   description: input.description
  // }
  //   // user: localStorage.getItem("userId")
  //   ).catch(err => console.log(err));
  //   const data = await res.data
  //   return data
  
  const handleSubmit =(e) =>{
    e.preventDefault()
    sendRequest().then(data => console.log(data))
    history.push("/user/Blogs")
    window.location.reload();
    console.log(input)
    
  }
  return (
    <section className='Add ' >
      <Helmet>
        <title>Create a new Blog</title>
      </Helmet>
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <h2 >Add a new Blog</h2>
        {/* <div className="mb-3 mt-4">
        <label for="thumbnail" className="form-label">Thumbnail</label>
        <input  type="file"  accept=".png, .jpg, .jpeg" name="image" className='form-control' id='thumbnail' onChange={handleImg} />
      </div> */}
        <div className="mb-3 mt-4">
        <label for="thumbnail" className="form-label">Thumbnail</label>
        <input  type="file"  accept=".png, .jpg, .jpeg" name="image" className='form-control' id='thumbnail' onChange={handleImg} />
      </div>
      <div className="mb-3">
        <label for="title" className="form-label">Title</label>
        <input type="text" name='title' value={input.title}  onChange={handleChange} className="form-control" id="title" required/>
      </div>
      <div className="mb-3">
        <label for="description" className="form-label">Description</label>
        {/* <input type="textarea" name='description' value={input.description}  onChange={handleChange} className="form-control" id="description"  required/> */}
        <textarea rows="4" cols="50" name="description"  className="form-control" onChange={handleChange}></textarea>
      </div>
      <div className='text-center mt-5'>
      <button type="submit" className="btn btn-primary btn-lg w-50 ">Submit</button>
      </div>
    </form>
    </section>
  )
}

export default Add_Post