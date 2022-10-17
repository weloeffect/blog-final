import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';

function Category({id,name, description}) {
    const history = useHistory();
    const RedirectAddPost = (e)=>{
        history.push(`/user/${id}/addPost`)
    }
    
     
  return (
    <Card sx={{ maxWidth: "30%", margin: "auto", mt: 5, boxShadow:"10px 10px 5px 0px rgba(0,0,0,0.75)",border: "2px solid grey", borderRadius: 0}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {description}
         
        </Typography>
      </CardContent>
      <CardActions>
      
            <div style={{margin: "auto"}}>
            <Button variant="contained"  onClick={RedirectAddPost} >
                Click here
            </Button>
            </div>
            
        
      </CardActions>
    </Card>
  )
}

export default Category