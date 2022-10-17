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
import "../css/navbar.css"
import { authActions } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { axiosInstance } from '../axioss';
import { useEffect } from 'react';
// const pages = ['Blogs', 'Categories', 'Users' ];
// const settings = ['Add Post', 'Add Category', 'Add User', 'Logout'];



function Adminnav() {
  
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
      history.push("/admin/login")
      setAnchorElUser(null);

    }
  return (
 
      <AppBar position="static" className='bg-dark'>
      {adminisLoggedIn&&<Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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
            {/* { user.firstname} */}
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
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
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
}
    </AppBar>   
   
                  
  )
}
  
//     <section className='nav'>
//     <div className='content'>
//         <nav className="navbar navbar-expand-lg ">
//         <a className='nav-logo' href="#">Admin full name</a>
//         {/* <a className='nav-logo' href="#">Admin full name</a> */}
//         <ul class="navbar-nav me-auto">
//             <li class="nav-item">
//               <a class="nav-link active ps-5" href="#" style={{"color":"white"}}>Create Post</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#" style={{"color":"white"}}>Edit Post/view/update/delete</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#" style={{"color":"white"}}>Add Category/view/delete/update</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#" style={{"color":"white"}}>Add author/delete</a>
//             </li>
            
//          </ul>
//         <div class="d-flex ">
//           <button class="btn btn-danger me-3 btn-md" type="submit" >Log Out</button>
//         </div>
//        </nav>
//     </div>
// </section>
  


export default Adminnav