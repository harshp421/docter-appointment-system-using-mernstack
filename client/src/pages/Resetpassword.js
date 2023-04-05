import React from 'react'
import Container from '../Component/Container'
const Resetpassword = () => {
  return (
   <>
     <Container class1="login-wrapper home-wrapper-2 py-5">
                
                <div className="row">
                  
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center'>
                                Reset password
                            </h3>
                            <form action="" className='d-flex flex-column gap-30'>
                                
                             <div className='mt-1'>
                                  <input type="password" name="password" id="" className='form-control ' placeholder='password' />
                                  </div>
                                  <div className=''>
                                  <input type="password" name="conform-password" id="" className='form-control ' placeholder='conform-password' />
                                  </div>
                                <div>
                                    
                                    <div className="d-flex justify-content-center align-items-center gap-10" >
                                        <button className='btn btn-primary'  >oK</button>
                                      
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

export default Resetpassword