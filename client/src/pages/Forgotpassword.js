import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../Component/Container'

const Forgotpassword = () => {
  const [email,setemail]=useState("")

  const handleemail = async (e) => {
   e.preventDefault();
    console.log(email,"email");
    try {
      const res = await fetch("/api/v1/user/newsletter", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
         
        },
        body: JSON.stringify({
          user: email,
        }),
      });
      const data = await res.json();
      if (data) {
        alert("date");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
   <>x``
    <Container class1="login-wrapper home-wrapper-2 py-5">
      
      <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center'>
                Reset your password
              </h3>
              <p className="text-center mt-1 mb-">
                We Will swnd you email you change your password
              </p>
              <form action="" onSubmit={(e)=>handleemail(e)} className='d-flex flex-column gap-30'>
                <div><input type="email" name="email" id="" 
                 onChange={(e)=>setemail(e.target.value)}
                className='form-control' placeholder='Email'
                 /></div>
              
                <div>
                  
                  <div className="d-flex justify-content-center flex-column align-items-center gap-10" >
                    <button className='btn btn-primary ' type='submit'  >submit</button>
                
                    <Link to='/login'> Cencel</Link>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      
      </Container>
   </>
  )
}

export default Forgotpassword