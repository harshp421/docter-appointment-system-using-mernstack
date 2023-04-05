import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import tick from '../img/correct.png'
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { message } from 'antd';


const ThanksPage = () => {
       const { user } = useSelector((state) => state.user);
       const { appointment } = useSelector((state) => state.appointment);
     const [doctor, setDoctor] = useState(null);
     const [clientToken,setClientToken]=useState("");
     const [instance,setInstance]=useState("");
      const dispatch = useDispatch();
      const navigate = useNavigate();
       const params = useParams();      

  const getUserData = async () => {
    try {
      
      const res = await fetch('/api/v1/doctor/getDoctorById', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify
          ({
            doctorId: params.doctorId
          })
      })
      const data = await res.json();
      if (data.success) {
        setDoctor(data.data);
        console.log("thanks"+data.data);
        console.log(appointment);

      }
    } catch (error) {
      console.log(error);
    }

  };


  //get Token GAteway

   const getToken=async()=>{

      try
      {
        const {data}= await axios.get('/api/v1/user/braintree/token');
        setClientToken(data?.clientToken);

        console.log("data_token"+data.clientToken); 
      }catch(error)
      {
        console.log(error);
      }
   }

  useEffect(() => { 
    getToken();
    getUserData();
   
    //eslint-disable-next-line
  }, []);
   
   const handlePaymant=async()=>{
      
    try
    {
     const{nonce}=await instance.requestPaymentMethod();
     const {data}=await axios.post('/api/v1/user/braintree/payment',{
      nonce,doctor,user,appointment
     },{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
     )
     console.log(data);
     message.success("Payment done")
    }catch(error)
    {
    console.log(error);
    }
   }

  return (
   <>
<section class="section confirmation home-wrapper-2 w-100 ">

  <div class="container conform-box">
    <div class="row justify-content-center">
      <div class="col-lg-8">
          <div class="confirmation-content text-center">
                <img src={tick} alt="" className='tick' srcset="" />
              <h2 class="mt-3 mb-4">Thank you for your appoinment</h2>
              <p>We will contact with you soon.</p>
          </div>
      </div>
    </div>
   
       {!clientToken?(""):(
        <>
         <div className='col-4 pb-3'>
       
       <DropIn 
              options={{
               authorization: clientToken,
                 paypal:{
                   flow:"vault",
                 }
              }}
              onInstance={(instance)=>setInstance(instance)}
             />
     <button className='btn btn-primary' onClick={handlePaymant}>Pay Online to {doctor?.firstName}</button>
   </div>
        </>
       )}
       
         
  </div>
</section>
   </>
  )
}

export default ThanksPage