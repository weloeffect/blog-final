import React from 'react'
import RegisterComp from '../components/RegisterComp'
import {Helmet} from 'react-helmet'
function Register() {
  return (
    <>
    <Helmet>
       <title>Create an account</title>
     </Helmet>
     <RegisterComp/>
   </>

  )
}

export default Register