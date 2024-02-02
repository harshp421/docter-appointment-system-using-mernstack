import React, { useEffect, useState } from 'react'
import Container from '../Component/Container'
import { useNavigate, useParams } from 'react-router-dom'

const Resetpassword = () => {

    var id;
    const param=useParams();
    const navigate=useNavigate();
    console.log(param.id,"id");
    id=param.id;
   const [password,setpassword]=useState("");
   
    const  changePassword = async (e) => {
        e.preventDefault();
    
         try {
           const res = await fetch("/api/v1/user/changepassword", {
             method: "POST",
             headers: {
               "Content-type": "application/json",
              
             },
             body: JSON.stringify({
                password,id
             }),
           });
           const data = await res.json();
           if (data) {
             alert("date");
             navigate("/")
             console.log(data);
             
           }
         } catch (error) {
           console.log(error);
         }
       };



  return (
   <>
     <Container class1="login-wrapper home-wrapper-2 py-5">
                
                <div className="row">
                  
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center'>
                                Reset password
                            </h3>
                            <form action="" onSubmit={(e)=>changePassword(e)} className='d-flex flex-column gap-30'>
                                
                             <div className='mt-1'>
                                  <input type="password" name="password" id="" className='form-control ' 
                                  onChange={(e)=>setpassword(e.target.value)}
                                  placeholder='password' />
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