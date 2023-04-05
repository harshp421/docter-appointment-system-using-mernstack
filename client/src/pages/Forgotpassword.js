import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../Component/Container'

const Forgotpassword = () => {
  return (
   <>
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
              <form action="" className='d-flex flex-column gap-30'>
                <div><input type="email" name="email" id="" className='form-control' placeholder='Email' /></div>
              
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