import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { axiosInstance } from '../axioss'

function AdminSelect() {
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

  const handleRedirect = (id) =>{
    history.push(`/admin/${id}/addPost`)
  } 
  return (
    <section style={{marginTop: "10%"}}>
       {/* {cats && cats.map((cat, index) => <Category id={cat._id}  name={cat.name}  description ={cat.description} />)} */}
        <div className="top">
            <h1 className="text-center mt-5">Select a Category</h1>
        </div>
        {/* <form> */}
        <div className='text-center mt-5'>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled" >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
           {cats && cats.map((cat, index) => <MenuItem value={cat._id} onClick={()=> handleRedirect(cat._id)}>{cat.name}</MenuItem>)}
        </Select>
      </FormControl>
        </div>
        
           {/* <Link to="/:id/add_post" className='btn btn-primary'>click me</Link>  */}
        {/* </form> */}

    </section>
  )
}

export default AdminSelect