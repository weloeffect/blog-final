import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useHistory } from 'react-router-dom';
import { authActions } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { axiosInstance } from '../axioss';
import { useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import "../css/navbar.css"

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory()
  const dispatch = useDispatch()
 
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId")
  const sendRequest2 = async()=>{
      const res = await axiosInstance.get(`admin/${id}`).catch(err => console.log(err))
      const data = await res.data 
      return data 
  }
  const adminisLoggedIn = useSelector((state) => state.adminisLoggedIn)

  useEffect(()=>{
      sendRequest2().then((data)=> setUser(data.user))
  },[])

  console.log(user)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const RedirectUsers = (e)=>{
    history.push("/admin/Users")
  }
  const RedirectBlogs = (e)=>{
    history.push("/admin/Blogs")
  }
  const RedirectCategories = (e)=>{
    history.push("/admin/Categories")
  }
  const handlePost = (e)=>{
    history.push("/admin/selectCategory")
    setAnchorElUser(null);
  }
  const handleCategory = (e)=>{
    history.push("/admin/addCategory")
    setAnchorElUser(null);
  }
  const handleAuthor = (e)=>{
    history.push("/admin/addAuthor")
    setAnchorElUser(null);
  }
  const handleLogout = (e)=>{
    dispatch(authActions.adminLogout())
    localStorage.removeItem('userId')
    history.push("/admin/")
    setAnchorElUser(null);

  }
 
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  

  const RedirectAddPost = (e) =>{
    history.push('/user/select_category')
  }
 const Logout = (e)=>{
  dispatch(authActions.logout())
  .then(() => history.push("/"))

 }
  return (
    
    
   <section className='nav'>
       <div className='content'>
            <nav className="navbar navbar-expand-lg ">
            <Link className='navbar-brand text-light' to="/" style = {{"fontFamily": "DynaPuff, cursive"}}>
              <span>
                <i className="fa-brands fa-blogger-b me-2" style={{"fontSize": "40px"}}></i> 
                <h1 style = {{"display": "inline-block"}} >Blogify</h1>
              </span>
            
              </Link>
           
            <ul class="navbar-nav me-auto">
                {/* <li class="nav-item">
                  <a class="nav-link active ps-5" href="#" style={{"color":"white"}}>Blogs</a>
                </li> */}
                <li className='nav-item'>
                <Link className='nav-link ' to="/Blogs" style={{"color":"white"}}>
                  Blogs
                </Link>
                </li>
                 
                {/* <li class="nav-item">
                  <a class="nav-link" href="#" style={{"color":"white"}}>Categories</a>
                </li> */}
                {/* <li class="nav-item">
                  <a class="nav-link" href="#" style={{"color":"white"}}>About</a>
                </li> */}
                {isLoggedIn &&<li class="nav-item">
                  {/* <a class="nav-link" href="#" style={{"color":"white"}}>Posts</a> */}
                  <Link className='nav-link' to="/user/Blogs" style={{"color":"white"}}>
                  Posts
                </Link>
                </li>}
             </ul>
              <div class="d-flex ">
                {!isLoggedIn&&<div>
                <Link className='btn btn-primary me-3 btn-md' to="/login">
                Log in
                </Link>
                </div>}
              {isLoggedIn &&<div className='me-3'>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={RedirectAddPost}>
                  Add Post
                </Button>
              </div>}
              {isLoggedIn &&<div>
                  <button  className="btn btn-danger me-2" onClick={Logout}>Logout</button>
              </div>}
            </div>
            
           </nav>
        </div>
        
        {/* <>
        {adminisLoggedIn&&<AppBar position="static" className='bg-dark'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         
          <Typography
            variant="h6"
            noWrap
            
           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div>{ user && user.email}</div> 
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
        
              
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           
          </Typography>
         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button  sx={{ my: 2, color: 'white', display: 'block' }} onClick={RedirectBlogs}>
                      Blogs      
            </Button>
            <Button  sx={{ my: 2, color: 'white', display: 'block' }} onClick={RedirectCategories}>
                      Categories       
            </Button>
            <Button  sx={{ my: 2, color: 'white', display: 'block' }} onClick={RedirectUsers}>
                      Users       
            </Button>
            
          </Box>

        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user && user.firstname} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
                <MenuItem  onClick={handlePost}>
                  <Typography textAlign="center">Add Post</Typography>
                </MenuItem>
                <MenuItem  onClick={handleCategory}>
                    
                      <Typography textAlign="center">
                      Add Category
                      </Typography>
                  
                  
                </MenuItem>
                <MenuItem  onClick={handleAuthor}>
              
                      <Typography textAlign="center">
                      Add Author
                      </Typography>
                  
                </MenuItem>
                <MenuItem   onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>            
            </Menu>
          </Box>

        </Toolbar>
      </Container>

    </AppBar>  
            } 
        </> */}
    </section>
              
    
  ) 
}

export default Navbar