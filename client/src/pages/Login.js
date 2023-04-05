import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Component/Container";
import { message } from "antd";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
    const [userData, setUserData] = useState({

    email: '',
    password: '',

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
      dispatch(showLoading())
      const {
        email,
        password,
      } = userData;
      // console.log(userData);

      const res = await fetch('/api/v1/user/login', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({

          email,
          password,

        })
      });
      const data = await res.json();
    //  console.log(data.token);
      dispatch(hideLoading())
      window.location.reload();
     //  console.log(data);
      if (data.success === true) {

        localStorage.setItem('token', data.token)
        navigate('/')
        message.success("Login Success")
      }
      else {
          message.error(data.error);
      //  toast.error(res.data.message)
      }

    } catch (error) {
      
      dispatch(hideLoading());
      console.log(error);

    }

  }


  return (
    <>

    
    <Container class1="login-wrapper home-wrapper-2 py-5">
      
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center'>
                login
              </h3>
              <form action="" className='d-flex flex-column gap-30'>
                <div className='mt-1'>
                  <input type="email" name="email" id="email" className='form-control ' placeholder='email' onChange={handelchange} value={userData.email} />
                </div>
                <div className='mt-1'>
                  <input type="password" name="password" id="password" className='form-control ' placeholder='password' onChange={handelchange} value={userData.password} />
                </div>
                <div>
                  <Link to='/forgot-password'> Forget Password</Link>
                  <div className="d-flex justify-content-center align-items-center gap-10" >

                    <button class="btn btn-dark text-white px-4 me-2" onClick={submitdata}>Login</button>
                    <Link to='/signup' class="btn btn-light px-4">Sign-up</Link>

                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>

      </Container>
      
      </>
  );
};

export default Login;
