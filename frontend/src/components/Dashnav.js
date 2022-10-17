import React from 'react'
import "../css/navbar.css"
function Dashnav() {
  return (
    <section className='nav'>
    <div className='content'>
        <nav className="navbar navbar-expand-lg ">
        <a className='nav-logo' href="#">Author full name</a>
        {/* <a className='nav-logo' href="#">Admin full name</a> */}
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link active ps-5" href="#" style={{"color":"white"}}>Create Post</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style={{"color":"white"}}>Edit Post</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style={{"color":"white"}}>Delete Post</a>
            </li>
         </ul>
        <div class="d-flex ">
          <button class="btn btn-danger me-3 btn-md" type="submit" >Log Out</button>
        </div>
       </nav>
    </div>
</section>
  )
}

export default Dashnav