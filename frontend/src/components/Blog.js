import React from 'react'
import {Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography} from '@mui/material'
import { useHistory } from 'react-router-dom'
import { axiosInstance } from '../axioss'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../css/blog.css"
import { Stack } from '@mui/system';
function Blog({id, thumbnail,  isUser, title, description,  firstname, lastname}) {
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
      children: `${name.split(' ')[0][0]}`,
    };
  }
  const history = useHistory()
  const handleEdit = (e)=>{
    history.push(`/user/edit/${id}`)
  }
  const delRequest = async() =>{
    const res = await axiosInstance.delete(`posts/${id}`).catch(err => console.log(err));
    window.location.reload()
  }
  // const handleEDit = (e)=>{
  //   history.push(`edit/${id}`)
  //   delRequest().then((data)=> console.log(data))
  // }
  console.log(title, isUser)
  return (
    <div>
        <Card sx={{ maxWidth: "90%", margin:"auto",mt:10, border: "2px solid black", borderRadius:"15px" }}>
        <CardHeader
        title={title}      
      />
      <CardMedia
        component="div"
        image={thumbnail}
        // style={{"height": "100vh"}}
        className= 'display'
        
      >
        
     
      </CardMedia>
      <CardContent>
      <CardHeader
        avatar ={
          <Avatar {...stringAvatar(`${firstname}`)}/>
        }
        title={firstname + " " + lastname}      
      />
        <Typography variant="body2" color="text.secondary">
         {description}
        </Typography>
        {isUser && 
            <div className='text-end'>
              {/* <button className='btn btn-primary' onClick={handleEdit}>edit</button>
              <button className='btn btn-danger' onClick={handleDelete}>delete</button> */}
              <IconButton color='error' onClick={delRequest}>
              <DeleteIcon />
              </IconButton>
              <IconButton color='primary' onClick={handleEdit}>
              <EditIcon />
              </IconButton>
            </div>
          }
      </CardContent>    
     
    </Card>

    </div>
  )
}

export default Blog