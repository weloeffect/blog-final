import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useHistory } from 'react-router-dom'
import { axiosInstance } from '../axioss'
function ShowUsers() {
    const [users, setUsers] = useState()
    const history = useHistory()
    const sendRequest = async()=>{
    const res = await axiosInstance.get('/admin/Users').catch(err => console.log(data))
    const data = await res.data
    return data
  }
  useEffect(()=>{
    sendRequest().then(data=> setUsers(data.users))
  },[])
  console.log(users)
  
  const delRequest = async(id) =>{
    window.alert("are you sure you want to delete?")
      const res = await axiosInstance.delete(`admin/removeUser/${id}`).catch(err => console.log(err));
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
            <TableCell className='fw-bold fs-5'>First Name</TableCell>
            <TableCell className='fw-bold  fs-5' align="left">Last Name</TableCell>
            <TableCell className='fw-bold  fs-5' align="left">Email</TableCell>
            <TableCell  align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.firstname}
              </TableCell>
              <TableCell align="left">{user.lastname}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="right">
              <Button variant="contained" color="error" onClick={()=> delRequest(user._id)}>
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

export default ShowUsers