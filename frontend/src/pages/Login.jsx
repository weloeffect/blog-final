import React from 'react'
import LoginComp from "../components/LoginComp"
import {Helmet} from 'react-helmet'
function Login() {
  return (
    <>
     <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginComp/>
    </>
    
  )
}

export default Login