import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import { axiosInstance } from '../axioss'
import Blog from '../components/Blog'


function View_Post() {
    const history = useHistory()
    const [user, setUser] = useState()
    const [post, setPost] = useState({
        thumbnail: "",
        title: "",
        description: "",
    })
    
    // const publicFolder = "http://localhost:5000/images/"
    const publicFolder = "https://blog-backend101.herokuapp.com/images/"
    const slug = useParams().slug
    console.log(slug)
    const sendRequest = async()=>{
        const res = await axiosInstance.get(`posts/viewPost/${slug}`).catch(err => console.log(err))
        const userId = res.data.post.user
        const data = await res.data 

        const Useres = await axiosInstance.get(`user/${userId}`).catch(err => console.log(err))
        const data2 = await Useres.data 
        const values ={
            data: data,
            data2: data2
        }
        return values
    }
    
    useEffect(()=>{
        sendRequest().then((values)=>{
             setPost(values.data.post)
             setUser(values.data2.user)
        })
       
    },[])
    console.log(user)
//  console.log(post.user.firstname)
    // console.log(post.post)
  return (
    <section style={{"marginTop":"7%"}}>
        <Helmet>
        {post &&<title> {post.title}</title>}
      </Helmet>
      {post && user && <Blog id={post._id} thumbnail={publicFolder + post.thumbnail} isUser={false} title={post.title} 
    description ={post.description}
    // imageURL = {post.thumbnail}
    firstname = {user.firstname} lastname={user.lastname} />}
    </section>
  )
}

export default View_Post