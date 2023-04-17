import React, { useState } from 'react'
import {Link} from 'react-router-dom'
const Contectmodel = () => {
    const [contectdate, setContectdate] = useState({

    })
  return (
    <section class="contact-section home-wrapper-2 ">
    <div class="container contact-form theam-color">
      <div class="row">
        <div class="col-lg-6">
          <div class="section-header">
            <h2>Contact Us for personal Call</h2>
            <p class="sub-title">Sed ut perspiciatis unde omnis iste natus error sit voluptatem a ccusantium doloremque laudantium, totam rem aperiam.</p>
          </div>
          <div class="contact-icons">
            <ul class="available-info"><li>
              <i class="fas fa-phone-alt">
              </i> 72031155</li>
              <li><i class="fas fa-map-marker-alt"></i> 605,Suvas scale ,opposite Nikol Police Station ,Nikol</li></ul>
          </div></div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Name" />
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Mobile Number" />

              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Date" />
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6">

              <div class="form-group">

                <input type="text" class="form-control" placeholder="Email" />
              </div>

              <div class="form-group">
                <input type="text" class="form-control" placeholder="Doctor Name" /> 
                </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Time" />
              </div>
            </div>
            <div class="col-lg-12">
              <Link class="btn1 book-btn" href="/template-physiotheraphy/patient/booking">Submit
              </Link>

            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Contectmodel