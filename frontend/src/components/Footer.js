import React from 'react'
import "../css/footer.css"
function Footer() {
  return (
    <>
     <div className='footer  text-center '>
      
      <div className='mt-5 bg-muted'>
      <i className="fa-brands fa-blogger-b me-2" style={{"fontSize": "40px"}}></i>
         <span> 
            &copy;{new Date().getFullYear()}
        </span>
        </div>  
      </div>
    </>
  )
}

export default Footer