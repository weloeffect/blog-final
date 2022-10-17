import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { axiosInstance } from '../axioss'
import {Helmet} from 'react-helmet'
import Blog from '../components/Blog'

function Blogs() {
  const [posts, setPosts] = useState()
  // const publicFolder = "http://localhost:5000/images/"
  const publicFolder =  "https://blog-final101.herokuapp.com/images/"
  const sendRequest = async()=>{
    const res = await axiosInstance.get('/posts/view').catch(err => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(()=>{
    sendRequest().then(data=> setPosts(data.posts))
  },[])
  console.log(posts)
  return (
   
    <section>
       <Helmet>
      <title>View Blogs</title>
      </Helmet>
          {posts && posts.map((post, index) => <Blog id={post._id} thumbnail={publicFolder + post.thumbnail} isUser={false}  title={post.title} 
        description ={post.description}
        // imageURL = {post.thumbnail}
        firstname = {post.user.firstname}
        lastname = {post.user.lastname} />)}    
    </section>
  )
}

export default Blogs