import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { axiosInstance } from '../axioss'
import Category from '../components/Category'

function CategorySelect() {
    const [cats, setCats] = useState()
    const history = useHistory()
    const sendRequest = async()=>{
    const res = await axiosInstance.get('/categories/select_category').catch(err => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(()=>{
    sendRequest().then(data=> setCats(data.cats))
  },[])
  console.log(cats)

  
  return (
    <section style={{marginTop: "15vh"}}>
        <div className='text-center mb-4'>
            <h2>Select a Category</h2>
        </div>
       {cats && cats.map((cat, index) => <Category id={cat._id}  name={cat.name}  description ={cat.description} />)}
    

    </section>
  )
}

export default CategorySelect