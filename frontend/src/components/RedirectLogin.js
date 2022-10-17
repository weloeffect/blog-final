import React from 'react'
import { Redirect } from 'react-router-dom'
function RedirectLogin() {
  return (
    <div>
     
    <Redirect to="/login" />

</div>
  )
}

export default RedirectLogin