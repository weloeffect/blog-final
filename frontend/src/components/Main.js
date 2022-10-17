import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { axiosInstance } from '../axioss'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Blogs from '../pages/Blogs';
import Login from '../pages/Login';
import RedirectUser from './RedirectUser';
import Register from '../pages/Register';
import Add_Post from './Add_Post';
import RedirectLogin from './RedirectLogin';
import CategorySelect from '../pages/CategorySelect';
import UserBlogs from '../pages/UserBlogs';
import Edit_post from '../pages/Edit_post';
import "../css/main.css"
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
function Main() {
  const id1 = "63303b7abc01dba69485e78c"
  const id2 = "633099db1b0ed70b51f95108"
  const id3 = "63309a9f1b0ed70b51f95117"
  const publicFolder = "http://localhost:5000/images/"
  // const publicFolder = "https://blog-backend101.herokuapp.com/images/"
  const [post, setPost] = useState()
  const [post2, setPost2] = useState()
  const [post3, setPost3] = useState()
  const [cat, setCat] = useState('')
  const [cat2, setCat2] = useState('')
  const [cat3, setCat3] = useState('')
  const [user, setUser] = useState('')
  const [user2, setUser2] = useState('')
  const [user3, setUser3] = useState('')
//  let catID;
  const sendRequest = async()=>{
    // main block
    const res = await axiosInstance.get(`posts/view/${id1}`).catch(err => console.log(err))
    const catID = await res.data.post.category
    const userID = await res.data.post.user
    const data = await res.data
    // main block
    const res2 = await axiosInstance.get(`categories/view_category/${catID}`).catch(err => console.log(err))
    const data2 = await res2.data
    // main block
    const res3 = await axiosInstance.get(`user/${userID}`).catch(err => console.log(err))
    const data3 = await res3.data
    // sub block one
    const Subres = await axiosInstance.get(`posts/view/${id2}`).catch(err => console.log(err))
    const SubcatID = await Subres.data.post.category
    const SubuserID = await Subres.data.post.user
    const Subdata = await Subres.data
// sub block one
    const Subres1 = await axiosInstance.get(`categories/view_category/${SubcatID}`).catch(err => console.log(err))
    const Subdata2 = await Subres1.data
// sub block one
    const Subres3 = await axiosInstance.get(`user/${SubuserID}`).catch(err => console.log(err))
    const Subdata3 = await Subres3.data

     // sub block two
     const Sub2res = await axiosInstance.get(`posts/view/${id3}`).catch(err => console.log(err))
     const Sub2catID = await Sub2res.data.post.category
     const Sub2userID = await Sub2res.data.post.user
     const Sub2data = await Sub2res.data
 // sub block two
     const Sub2res2 = await axiosInstance.get(`categories/view_category/${Sub2catID}`).catch(err => console.log(err))
     const Sub2data2 = await Sub2res2.data
 // sub block two
     const Sub2res3 = await axiosInstance.get(`user/${Sub2userID}`).catch(err => console.log(err))
     const Sub2data3 = await Sub2res3.data
    // console.log(catID)
    // console.log(data)
    // console.log(data2)
    const values ={
      data: data,
      data2: data2,
      data3: data3,
      Subdata: Subdata,
      Subdata2: Subdata2,
      Subdata3: Subdata3,
      Sub2data: Sub2data,
      Sub2data2: Sub2data2,
      Sub2data3: Sub2data3,
      
    }
    return values
     // const data = await res.data
    // return data
  }
  // const catid1 = post.category
  // let catid1;
  // const sendRequest2 = async()=>{
  //   const res = await axiosInstance.get(`/categories/view_category/${catid1}`).catch(err => console.log(err))
    
  //   const data = await res.data
  //   return data
  // }
  useEffect(()=>{
    sendRequest().then((values)=> {
      setPost(values.data.post)
      setCat(values.data2.cat)
      setUser(values.data3.user)
      setPost2(values.Subdata.post)
      setCat2(values.Subdata2.cat)
      setUser2(values.Subdata3.user)
      setPost3(values.Sub2data.post)
      setCat3(values.Sub2data2.cat)
      setUser3(values.Sub2data3.user)
      // setCat(data2.cat)
    })
   
    // catid1 = post.category
    // sendRequest2().then(data=> setCat(data.cat))
  },[])
  console.log(post3)
  // console.log(catID)
  // const catid1 = post.category
  // const sendRequest2 = async()=>{
  //     const res = await axiosInstance.get(`/categories/view_category/${catid1}`).catch(err => console.log(err))
      
  //     const data = await res.data
  //     return data
  //   }
// console.log(catid1)

  return (
  
   
    
    <section className='main '>
      <div className="row ms-5  gx-5 ">
        {post &&<div className="col-6  main-height" 
        style={{"background" :`url(${publicFolder + post.thumbnail})`, 
         "borderRadius": "20px", 
        "backgroundColor": "red", "backgroundSize": "100% 100%" }} >
        <div className='category'>
          {cat && cat.name }
        </div>
        <div className='description'>
          {post && post.description }
        </div>
        <div className='user'>
        <Stack direction="row" spacing={2}>
        {user && <Avatar {...stringAvatar(`${user.firstname} ${user.lastname}`)} />}
        {user &&<span>By {user.firstname} {" "} {user.lastname} | {user.createdAt}</span>}
        </Stack>
        </div>
          
        </div>}
          {/* {post && post.title} <br /> */}
          {/* {post && post.description} */}
          {/* <img src={post && post.thumbnail} alt="thumbnail" /> */}
          {/* {post && <img src={publicFolder + post.thumbnail} alt="thumbnail" className='photo'/>} */}
        
       
          
          
        <div className="col-5 ms-5"  >
         {post2 && <div className='sub-height' 
         style={{"background" :`url(${publicFolder + post2.thumbnail})`, 
          "borderRadius": "20px", 
          "backgroundColor": "green", "backgroundSize": "100% 100%" }} >
            <div className='ms-2 category2'>
              {cat2 && cat2.name }
            </div>
            <div className='description2'>
              {post2 && post2.description }
            </div>
            <div className='user2'>
              <Stack direction="row" spacing={2} >
              {user2 && <Avatar {...stringAvatar(`${user2.firstname} ${user2.lastname}`)}  />}
              {user2 &&<span className='user-display'>By {user2.firstname} {" "} {user2.lastname} | {user2.createdAt}</span>}
            </Stack>
            </div>
          </div>}
          <div className="row">
            <div className="col-12 ">
            {post3 && <div className='sub-height2' 
            style={{"background" :`url(${publicFolder + post3.thumbnail})`, 
            "borderRadius": "20px", 
            "backgroundColor": "green", "backgroundSize": "100% 100%" }} >
             <div className='ms-2 category2'>
              {cat3 && cat3.name }
            </div>
            <div className='description2'>
              {post3 && post3.description }
            </div>
            <div className='user2'>
              <Stack direction="row" spacing={2} >
              {user3 && <Avatar {...stringAvatar(`${user3.firstname} ${user3.lastname}`)}  />}
              {user3 &&<span className='user-display'>By {user3.firstname} {" "} {user3.lastname} | {user2.createdAt}</span>}
            </Stack>
            </div>
          </div>}
            </div>
          </div>
        </div>

      </div>
        {/* <div className='main-display'>
            iriog
        </div> */}
    </section>
    
  )
}

export default Main