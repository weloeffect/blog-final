import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "../css/admin_add.css"
function AddAuthor() {
    const [input, setinput] = useState({
        firstname:"",
        lastname:"",
        email: "",
        password: "",

      })
      const history = useHistory()
      const handleChange = (e)=>{
        setinput({
          ...input,
          [e.target.name] : e.target.value
        })
      }
      const sendRequest = async() =>{
        const res = await axios.post('http://localhost:5000/admin/addAuthor',{
        firstname: input.firstname,
        lastname:input.lastname,
        email:input.email,
        password:input.password
      }).catch(err => console.log(err))
      const data = await res.data
      return data
    }  
    const handleSubmit =(e) =>{
        e.preventDefault()
        sendRequest().then(data => console.log(data))
        history.push("/admin/Users")
        window.location.reload();
        console.log(input)
      }
  return (
   <section className='author'>
        <div className='ms-3 mt-5 header'>
            Add an Author
        </div>
        <div className="add-author">
            <form onSubmit={handleSubmit}>
                    <div className="row g-3 align-items-center mb-3 mt-3">
                        <div className="col-4 ms-5">
                        <label for="firstname" className="col-form-label sign">First Name</label>
                        </div>
                        <div className="col-3">
                        <input type="text" id="firstname" name='firstname' className="form-control" onChange={handleChange} />
                        </div>
                </div>
                <div className="row g-3 align-items-center mb-3 mt-3">
                        <div className="col-4 ms-5">
                        <label for="lastname" className="col-form-label sign">Last Name</label>
                        </div>
                        <div className="col-3">
                        <input type="text" id="lastname" name='lastname' className="form-control" onChange={handleChange} />
                        </div>
                </div>
                <div className="row g-3 align-items-center mb-3 mt-3">
                        <div className="col-4 ms-5">
                        <label for="email" className="col-form-label sign">E-mail</label>
                        </div>
                        <div className="col-3">
                        <input type="text" id="email" name='email' className="form-control" onChange={handleChange}/>
                        </div>
                </div>
                <div className="row g-3 align-items-center mb-3 mt-3">
                        <div className="col-4 ms-5">
                        <label for="password" className="col-form-label sign">Password</label>
                        </div>
                        <div className="col-3">
                        <input type="password" id="password"  name='password' className="form-control" onChange={handleChange}/>
                        </div>
                </div>
                <div className="text-center mt-4">
                    <button className='btn btn-primary w-25 btn-lg'>SUBMIT</button>
                </div>
                
            </form>
        
        </div>
   </section>
  )
}

export default AddAuthor