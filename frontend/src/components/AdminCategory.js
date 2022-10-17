import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useHistory } from 'react-router-dom'
import { axiosInstance } from '../axioss'


// can view update and  delete categories
function AdminCategory() {
    const [cats, setCats] = useState()
    const history = useHistory()
    const sendRequest = async()=>{
    const res = await axiosInstance.get('/categories/select_category').catch(err => console.log(data))
    const data = await res.data
    return data
  }
  useEffect(()=>{
    sendRequest().then(data=> setCats(data.cats))
  },[])
  console.log(cats)
  const handleEdit = (id)=>{
    history.push(`/admin/edit/${id}`)
  }
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
            <TableCell className='fw-bold fs-5'>Name</TableCell>
            <TableCell className='fw-bold fs-5' align="left">Description</TableCell>
            <TableCell  align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cats && cats.map((cat) => (
            <TableRow
              key={cat._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {cat.name}
              </TableCell>
              <TableCell align="left">{cat.description}</TableCell>
              <TableCell align="right">
              <Button variant="contained" color="primary" onClick={()=> handleEdit(cat._id)}>
                Update
              </Button>
              </TableCell>
              <TableCell align="right">
              <Button variant="contained" color="error" onClick={()=> delRequest(cat.slug)}>
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

export default AdminCategory