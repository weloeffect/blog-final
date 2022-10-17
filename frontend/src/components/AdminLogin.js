import {React, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../css/id.css"
import { axiosInstance } from '../axioss'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../app/store'

function AdminLogin() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [input, setinput] = useState({
      email:"",
      password:"",
  
    })
    const handleChange = (e) =>{
      setinput((prevState)=>({
        ...prevState,
        [e.target.name] : e.target.value
      }))
    }
    const sendRequest = async() =>{
      const res = await axiosInstance.post('/admin/login',{
        email:input.email,
        password:input.password,
      }).catch(err => console.log(err))
  
      const data = await res.data
      
      return data
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(input)
      sendRequest().then((data) => localStorage.setItem("userId", data.user._id ))
      .then(()=> dispatch(authActions.adminLogin())).then(() => history.push("/admin/Blogs"))
    }
    return (
      <section className='Login'>
          <div className='login-header'>
          <span>
          <i class="fa-brands fa-blogger-b me-3" style={{"fontSize": "50px"}}></i> 
          <h2 style={{"display": "inline-block"}}>Blogify-admin</h2>
          </span>
          </div>
          <div className='mt-5 login-container'>
          <div className='text-start'>
          <h2>Login</h2>
          </div>
          <div>
          <form onSubmit={handleSubmit}>
              <div class="mb-3">
              <label for="e-mail" class="form-label">Email address</label>
              <input type="email"  name='email' class="form-control" id="e-mail" placeholder='xoxo@example.com'  value={input.email} onChange={handleChange}/>
              </div>
              <div class="mb-3">
              <label for="pass" class="form-label">Password</label>
              <input type="password" name='password' class="form-control" id="pass" value={input.password} onChange={handleChange} />
              </div>
              <div className='text-center mt-5'>
              <button type='submit' class="btn btn-primary w-75 btn-lg" value="Submit" >Submit</button>
              </div>
          </form>
              <div className='text-center mt-3'>
                Not registered ?<Link to="/signup">click here</Link> 
             </div>
          </div>
          </div>
     </section>
  
    )
}

export default AdminLogin