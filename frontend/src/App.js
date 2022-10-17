import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter as Router, Route, Routes, useRouteMatch} from "react-router-dom";
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDash from './pages/AdminDash';
import {Helmet} from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux';
import Main from './components/Main';
import UserBlogs from './pages/UserBlogs';
import Add_post from './pages/Add_post';
import Edit_post from './pages/Edit_post';
import CategorySelect from './pages/CategorySelect';

import { axiosInstance } from './axioss';
import Edit_category from './pages/Edit_category';
import AdminCategory from './components/AdminCategory';
import ShowUsers from './components/ShowUsers';
// import AdminBlogs from './pages/AdminBlogs';
import AddCategory from './components/AddCategory';
import AddAuthor from './components/AddAuthor';
import AddPostAdmin from './components/AddPostAdmin';
import AdminID from './pages/AdminID';
import AdminBlog from './components/AdminBlog';
import AdminSelect from './pages/AdminSelect';
import AdminLogin from './components/AdminLogin';
import { authActions } from './app/store';
import Add_Post from './components/Add_Post';
import Blogs from './pages/Blogs';
import RedirectUser from './components/RedirectUser';
import RedirectLogin from './components/RedirectLogin';
import Footer from './components/Footer';
import View_Post from './pages/View_Post';

function App() {
  const adminisLoggedIn = useSelector((state) => state.adminisLoggedIn)
  const userisLoggedIn = useSelector((state) => state.isLoggedIn)
  const NormalUser = useSelector((state) => state.NormalUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.adminLogin())
      dispatch(authActions.login())
    }
  }, [dispatch])

//   const [input, setinput] = useState({
//     thumbnail:"",
    
//   })
//   const handleImg = (e) => {
   
//     setinput({...input,  
//       thumbnail: e.target.files[0]
//     });
// }
  
//   const sendRequest = async() =>{
//     const formData = new FormData();
//     formData.append('image', input.thumbnail);
    
    
//     const res = await axiosInstance.post('user/createPost',
//     formData
//     ).catch(err => console.log(err));
//     const data = await res.data
//     return data
//   }
//   const handleSubmit =(e) =>{
//     e.preventDefault()
//     sendRequest().then(data => console.log(data))
//     console.log(input)
//   }
  // const isLoggedIn = useSelector((state) => state.isLoggedIn)
  // console.log(isLoggedIn)

  console.log(adminisLoggedIn)
  return (

    <div className="Main">
      
      
       <Helmet>
        <title>Blogify- Create a unique blog easily</title>
      </Helmet>
      {/* <Router> 
        <Navbar />
        <Route  path="/"  exact component= {Blog} />
        <Route  path="/login"  exact component= {Login} />
        <Route path="/signup"   component= {Register} />
        <Route path="/blogs"   component= {UserBlogs} /> */}
        {/* <Route path="/:id/add_post"   component= {Add_post} /> */}
        {/* <Route path="/:id/add_post"   component= {Add_post} />
        <Route path="/edit/:id"   component= {Edit_post} />
        <Route path="/select_category"   component= {CategorySelect} />
    </Router> */}
      
      {/* <Home/> */}
      {/* <Blog/> */}
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <Dashboard/> */}
      
      
      <Router>
      {/* {(userisLoggedIn || !userisLoggedIn) ? <Navbar/>: <AdminLogin/>} */}
      
      {/* {!adminisLoggedIn && !<Navbar/>} */}
      
      {/* <Route path="/"   exact component= {Navbar} /> */}
      <Navbar/>
      <Route path="/"     exact component= {Home} />
      <Route path="/Blogs"    exact component= {Blogs} />
      <Route path="/view/:slug"    exact component= {View_Post} />
      <Route path="/login"    component= {!userisLoggedIn ? Login : RedirectUser} />
      <Route path="/signup"    component= {!userisLoggedIn ? Register: RedirectUser} />
      <Route path="/user/:id/addPost"    component= {userisLoggedIn ? Add_Post: RedirectLogin } />
      <Route path="/user/select_category"    component= {userisLoggedIn ? CategorySelect: RedirectLogin} />
      <Route path="/user/Blogs"    component= {userisLoggedIn ? UserBlogs : RedirectLogin } />
      <Route path="/user/edit/:id"    component= {userisLoggedIn ? Edit_post : RedirectLogin} />
      {/* {!adminisLoggedIn &&<Route path="/admin"   exact component= {adminisLoggedIn ? AdminDash: AdminLogin } />} */}
      <Route path="/admin"   exact component= {adminisLoggedIn ? AdminDash: AdminLogin } />
      <Route path="/admin"  exact  component= {adminisLoggedIn ? AdminBlog : AdminLogin } />
      <Route path="/admin/Blogs"  exact component= {adminisLoggedIn ? AdminBlog : AdminLogin} />
      <Route path="/admin/edit/:id"  exact component= {adminisLoggedIn ? Edit_category : AdminLogin} />        
      {/* <Route path="/admin/login"  exact component= {AdminID} /> */}
      <Route path="/admin/Users"   component= {adminisLoggedIn ? ShowUsers : AdminLogin}  />
      <Route path="/admin/Categories"   exact component= {adminisLoggedIn ? AdminCategory : AdminLogin} />
      <Route path="/admin/addCategory"  exact component= {adminisLoggedIn ? AddCategory : AdminLogin}/>
      <Route path="/admin/addAuthor"  exact component= {adminisLoggedIn ? AddAuthor : AdminLogin} />
      <Route path="/admin/:id/addPost"  exact component={adminisLoggedIn ? AddPostAdmin : AdminLogin}  />
      <Route path="/admin/selectCategory"  exact component= {adminisLoggedIn ? AdminSelect : AdminLogin} />
      <Route path="/admin/login"  exact component={!adminisLoggedIn ? AdminLogin  : AdminDash} />
      </Router>
      <Footer/>
      
      
      
      {/* <h1>Image test</h1>
      <form onSubmit={clickchange} encType="multipart/form-data">
        <label htmlFor="choose">choose a file </label>
        <input type="file" filename="image" accept=".png, .jpg, .jpeg" onChange={fileChange} id='choose'/>
        <button type='submit' value='submit' >Submit</button>
      </form> */}
      {/* <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="image"
                onChange={handleImg}
            />

            <input 
                type="submit"
            />
        </form> */}
        {/* {photo && <img src={publicFolder + photo} alt={photo} />} */}
        
       
    </div>
  );
}

export default App;
