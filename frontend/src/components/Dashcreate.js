import React from 'react'
import "../css/dash.css"
function Dashcreate() {
  return (
    <section className='dash-body'>
        <div className='mt-5 ms-3 header mb-3 text-primary'>
                Post a Blog
        </div>
        <div>
            <form action="">
            <div className="row g-3 align-items-center mb-3">
                <div className="col-4 ms-5">
                <label for="img" className="col-form-label sign">Image</label>
                </div>
                <div className="col-6">
                <input type="file" id="img" className="form-control" />
                </div>
             </div>
            <div className="row g-3 align-items-center mb-3">
                <div className="col-4 ms-5">
                <label for="inputPassword6" className="col-form-label sign">Title</label>
                </div>
                <div className="col-6">
                <input type="password" id="inputPassword6" className="form-control" />
                </div>
             </div>
            <div className="row g-3 align-items-center">
                <div className="col-4 ms-5">
                <label for="desc" className="col-form-label sign">Description</label>
                </div>
                <div className="col-6">
                <textarea name="description"  id="desc" cols="83" rows="10" ></textarea>
                </div>
             </div>
             <div className="text-center mt-5">
                <button className='btn btn-primary w-25 ' value="Submit">SUBMIT</button>
             </div>
            </form>
        </div>
    </section>
  )
}

export default Dashcreate