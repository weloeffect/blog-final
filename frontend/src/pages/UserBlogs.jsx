import React, { useEffect, useState } from 'react'
import {axiosInstance} from '../axioss'
import Blog from '../components/Blog'
import {Helmet} from 'react-helmet'
const  UserBlogs = () =>  {
    const [user, setUser] = useState()
    const id = localStorage.getItem("userId")
    // const publicFolder = "http://localhost:5000/images/"
    const publicFolder = "http://blog-backend101.herokuapp.com/images/"
    const sendRequest = async()=>{
        const res = await axiosInstance.get(`posts/user/${id}`).catch(err => console.log(err))
        const data = await res.data 
        return data 
    }

    useEffect(()=>{
        sendRequest().then((data)=> setUser(data.user))
    },[])

    console.log(user)
  return (
    <div >
      <Helmet>
        {user &&<title> {user.firstname +  " " + user.lastname}  - Blogs</title>}
      </Helmet>
    {user && user.posts && user.posts.map((post, index) => <Blog id={post._id} thumbnail={publicFolder + post.thumbnail} isUser={true} title={post.title} 
    description ={post.description}
    // imageURL = {post.thumbnail}
    firstname = { user.firstname} lastname={user.lastname} />)}</div>
  )
}

export default UserBlogs