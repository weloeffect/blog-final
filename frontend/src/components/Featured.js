import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { axiosInstance } from '../axioss'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import "../css/featured.css"
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
function Featured() {
  const id1 = "6330a243588663c9e525971d"
  const id2 = "6330a497588663c9e5259847"
  const id3 = "633098541b0ed70b51f950e9"
  // const publicFolder = "http://localhost:5000/images/"
  const publicFolder =  "https://blog-final101.herokuapp.com/images/"
  const [post, setPost] = useState()
  const [post2, setPost2] = useState()
  const [post3, setPost3] = useState()
  const [cat, setCat] = useState('')
  const [cat2, setCat2] = useState('')
  const [cat3, setCat3] = useState('')
  const [user, setUser] = useState('')
  const [user2, setUser2] = useState('')
  const [user3, setUser3] = useState('')
  const history = useHistory()
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
    })
   
  },[])
  console.log(post3)
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
  const RedirectView =(slug)=>{
    history.push(`/view/${slug}`)
  }
  return (
    <section className='featured mt-4'>
        <div className='head'>
            Featured
        </div>
        <div className='samples'>
              <div className="row ms-3 me-3">
                <div className="col-4" >
                  {post &&<div class="card  " >
                    <img src={publicFolder + post.thumbnail} class="card-img-top " alt="..."/>
                    <div class="card-body" style={{"border": "1px solid   rgb(191, 191, 198)"}}>
                      <h5 class="card-title">{post.title}</h5>
                      <p class="card-text">{post.description}</p>
                      <div className="mt-2">
                        {/* <a href="#" class="btn btn-primary">Click here to read more</a> */}
                        <Button variant='contained' color='primary' onClick={() => RedirectView(post.slug)}>Click here to read more</Button>
                      </div>
                      <Stack direction="row" spacing={2} className='mt-2' >
                        {user && <Avatar {...stringAvatar(`${user.firstname} ${user.lastname}`)}  />}
                        {user &&<span className='user-display'> {user.firstname} {" "} {user.lastname}</span>}
                      </Stack>
                   </div>    
                  </div>}       
                </div>
                <div className="col-4">
                  {post2 && <div class="card  ">
                    <img src={publicFolder + post2.thumbnail} class="card-img-top h-100" alt="..."/>
                    <div class="card-body" style={{"border": "1px solid   rgb(191, 191, 198)"}}>
                      <h5 class="card-title">{post2.title}</h5>
                      <p class="card-text">{post2.description}</p>
                      <div className="mt-2">
                        {/* <a href="#" class="btn btn-primary">Click here to read more</a> */}
                        <Button variant='contained' color='primary' onClick={() => RedirectView(post2.slug)}>Click here to read more</Button>
                      </div>
                      <Stack direction="row" spacing={2} className='mt-2' >
                        {user2 && <Avatar {...stringAvatar(`${user2.firstname} ${user2.lastname}`)}  />}
                        {user2 &&<span className='user-display'> {user2.firstname} {" "} {user2.lastname}</span>}
                      </Stack>
                   </div>    
                  </div> }      
                </div>
                <div className="col-4">
                  {post3 && <div class="card  ">
                    <img src={publicFolder + post3.thumbnail} class="card-img-top h-100" alt="..."/>
                    <div class="card-body" style={{"border": "1px solid   rgb(191, 191, 198)"}}>
                      <h5 class="card-title">{post3.title}</h5>
                      <p class="card-text">{post3.description}</p>
                      <div className="mt-4">
                        {/* <a href="#" class="btn btn-primary">Click here to read more</a> */}
                        <Button variant='contained' color='primary' onClick={() => RedirectView(post3.slug)}>Click here to read more</Button>
                      </div>
                      <Stack direction="row" spacing={2} className='mt-2' >
                        {user3 && <Avatar {...stringAvatar(`${user3.firstname} ${user3.lastname}`)}  />}
                        {user3 &&<span className='user-display'> {user3.firstname} {" "} {user3.lastname}</span>}
                      </Stack>
                   </div>    
                  </div> }      
                </div>
              </div>
        </div>
       
    </section>
  )
}

export default Featured