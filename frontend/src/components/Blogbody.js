import {React, useEffect, useState} from 'react'
import  "../css/blog_body.css"
import {axiosInstance} from '../axioss'
import Blog from './Blog'

function Blogbody() {
  const [posts, setPosts] = useState()
  const sendRequest = async()=>{
    const res = await axiosInstance.get('/posts/view').catch(err => console.log(data))
    const data = await res.data
    return data
  }
  useEffect(()=>{
    sendRequest().then(data=> setPosts(data.posts))
  },[])
  console.log(posts)
  return (
    <section className='blog-body'>
        {/* <div className="blog-container">
            rgnkegjnren
            <div>
                gegebn
            </div>
            <div>
                rfbnlnfbnl
            </div>
        </div> */}
        {posts && posts.map((post, index) => <Blog id={post._id} isUser={localStorage.getItem("userId") === post.user._id}  title={post.title} 
        description ={post.description}
        // imageURL = {post.thumbnail}
        userName = {post.user.firstname} />)}
        
    </section>
  )
}

export default Blogbody