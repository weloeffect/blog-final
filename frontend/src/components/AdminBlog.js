import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useHistory } from 'react-router-dom'
import { axiosInstance } from '../axioss'


function AdminBlog() {
    const [posts, setPosts] = useState()
    const history = useHistory()
    const sendRequest = async()=>{
    const res = await axiosInstance.get('/admin/').catch(err => console.log(data))
    const data = await res.data
   
    return data
  }
  useEffect(()=>{
    sendRequest().then(data=> setPosts(data.posts))
  },[])
  // console.log(posts)
  // const handleEdit = (slug)=>{
  //   history.push(`edit/${slug}`)
  // }
  const delRequest = async(slug) =>{
    window.alert("are you sure you want to delete?")
    const res = await axiosInstance.delete(`admin/remove/${slug}`).catch(err => console.log(err));
    window.location.reload();
    const data = res.data
    return data
  }
  return (
    <section style={{"marginTop": "3%"}}>
        <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='fw-bold fs-5'>Title</TableCell>
            <TableCell className='fw-bold fs-5' align="left">Description</TableCell>
            <TableCell className='fw-bold fs-5'  align="left">Author</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts && posts.map((post) => (
            <TableRow
              key={post._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {post.title}
              </TableCell>
              <TableCell align="left">{post.description}</TableCell>
              <TableCell align="left">{post.user.firstname} {" "}  {post.user.lastname}</TableCell>
              {/* <TableCell align="right">
              <Button variant="contained" color="primary" onClick={()=> handleEdit(post.slug)}>
                Update
              </Button>
              </TableCell> */}
              <TableCell align="right">
              <Button variant="contained" color="error" onClick={()=> delRequest(post.slug)}>
               Delete
              </Button>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  )
}

export default AdminBlog