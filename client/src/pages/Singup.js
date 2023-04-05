import React from 'react'
import Container from '../Component/Container'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import { message } from 'antd'
const Signup = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  })
  let name, value;
  const handelchange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  }


  const submitdata = async (e) => {
    e.preventDefault();
    try {
      const { name,
        email,
        password,
        cpassword } = userData;

        if(name =="" || email==" " ||password == " "||cpassword == " ")
        {
           alert("enter data")
        }
        else{
      // console.log(userData);
      dispatch(showLoading());
      const res = await fetch('/api/v1/user/register', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword
        })
      });
      const data = await res.json();
      //console.log(data);
      dispatch(hideLoading())
     
      if (data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    }
    } catch (e) {
      dispatch(hideLoading())
      console.log(e);
    }
  }
  return (

    <>
      <Container class1="login-wrapper home-wrapper-2 py-5">

        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center'>
                Sign up
              </h3>
              <form  className='d-flex flex-column gap-30 '>
                <div>
                  <input type="text" name="name" id="fname" className='form-control' placeholder='First-name' onChange={handelchange} value={userData.name}  required/>
                </div>
                <div className='mt-1'>
                  <input type="email" name="email" className='form-control' placeholder='email' onChange={handelchange} value={userData.email}  required/>
                 </div>


                <div className='mt-1'>
                  <input type="password" name="password" id="password" className='form-control ' placeholder='password' onChange={handelchange} value={userData.password} required />
                </div>
                <div className='mt-1'>
                  <input type="password" name="cpassword" id="cpassword" className='form-control ' placeholder='current-password' onChange={handelchange} value={userData.cpassword}  required/>
                </div>
                <div>

                  <div className="d-flex justify-content-center align-items-center gap-10" >
                    <button class="btn btn-primary" type='submit' onClick={submitdata}>Sign-up</button>
                   
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

export default Signup