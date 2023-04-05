import React, { useState } from 'react'
import { message, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import Dropzone from 'react-dropzone'


const ApplyDoctor = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [userData, setuserData] = useState(
    {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      specialization: '',
      experience: '',
      feesPerCunsaltation: "",
      stiming:"",
      etiming:""

    }
  )
  

  



  const handleFinish = async (e) => {
    e.preventDefault();
    console.log("in the function");
    try {
      console.log(userData);
      dispatch(showLoading())
      const res = await fetch("/api/v1/user/apply-doctor", {
        method: "POST",
        headers:
        {
          "Content-type": "application/json",
          Authorization: localStorage.getItem('token'),

        },
        body: JSON.stringify
          ({
            ...userData, userId: user._id
          })
      },

      
      );
      const data=await res.json();
      dispatch(hideLoading());
    
      if (data.success === true) {
        console.log("done");
        message.success(res.data.message)
        Navigate('/')
      }
      else {
        message.error(res.data.error)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Somthing Went Wrong')
    }
  }
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuserData({ ...userData, [name]: value });
  }


  return (
    <>
      <div className="home-wrapper-2 py-5">
        <form onSubmit={handleFinish}>
          <div className="container">
            <h1 className="title ">
              Personal Details :
            </h1>
            <div class="row">
              <div class="col">

                <div class="form-outline">
                  <input type="text" id="form8Example3" name='firstName' value={userData.firstName} class="form-control" required rules={[{ required: true }]} onChange={handleChange} />
                  <label class="form-label" for="form8Example3">First name</label>
                </div>
              </div>
              <div class="col">

                <div class="form-outline">
                  <input type="text" id="form8Example4" name='lastName' value={userData.lastName} class="form-control" required rules={[{ required: true }]} onChange={handleChange} />
                  <label class="form-label" for="form8Example4">Last name</label>
                </div>
              </div>
              <div class="col">

                <div class="form-outline">
                  <input type="number" id="form8Example3" name='phone' class="form-control" required rules={[{ required: true }]} value={userData.phone} onChange={handleChange} />
                  <label class="form-label" for="form8Example3"> Phone</label>
                </div>
              </div>

            </div>
            <div class="row py-3">
              <div class="col">

                <div class="form-outline">
                  <input type="email" id="form8Example5" name='email' class="form-control" value={userData.email} required rules={[{ required: true }]} onChange={handleChange} />
                  <label class="form-label" for="form8Example5">Email address</label>
                </div>
              </div>
              <div class="col">

                <div class="form-outline">
                  <input type="text" id="form8Example4" name='website' class="form-control" required rules={[{ required: true }]} value={userData.website} onChange={handleChange} />
                  <label class="form-label" for="form8Example4">WebSite</label>
                </div>
              </div>
              <div class="col">

                <div class="form-outline">
                  <input type="text" id="form8Example5" name='address' class="form-control" required rules={[{ required: true }]} value={userData.address} onChange={handleChange} />
                  <label class="form-label" for="form8Example5">Address</label>
                </div>
              </div>
            </div>
            <h1 className='title py-2'>
              Professional Details:
            </h1>

            <div class="row py-3">
              <div class="col">

                <div class="form-outline">
                  <input type="text" id="form8Example3" name='specialization' class="form-control" required rules={[{ required: true }]} value={userData.specialization} onChange={handleChange} />
                  <label class="form-label" for="form8Example3">Specialization</label>
                </div>
              </div>
              <div class="col">

                <div class="form-outline">
                  <input type="text" id="form8Example4" name='experience' class="form-control" required rules={[{ required: true }]} value={userData.experience} onChange={handleChange} />
                  <label class="form-label" for="form8Example4">Experience</label>
                </div>
              </div>
              <div class="col">

                <div class="form-outline">
                  <input type="text" id="form8Example5" name='feesPerCunsaltation' required rules={[{ require: true }]} class="form-control" value={userData.feesPerCunsaltation} onChange={handleChange} />
                  <label class="form-label" for="form8Example5">FeesPerCunsaltation</label>
                </div>

              </div>

            </div>
            <div className="row py-2">
              <div className="col">
                <div className="form-outline">
                   {/* <TimePicker.RangePicker format="HH:mm" name='timing' value={userData.timing} onChange={handleChange}/>  */}
                  <input type="time" name="stiming" id="" value={userData.stiming} onChange={handleChange} />
                  <input type="time" name="etiming" id="" value={userData.etiming} onChange={handleChange} />
                </div>
              </div>
            </div>
           
           <div>
           <Dropzone>
  {({getRootProps, getInputProps}) => (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )}
</Dropzone>           
 
           </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ApplyDoctor