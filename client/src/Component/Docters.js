import React, { useEffect, useState } from 'react'
import docter from '../img/doctor.jpg'

import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
const Docters = () => {
    const [doctors, setDoctors] = useState([])
    const getUser = async () => {

        try {
            const res = await fetch("/api/v1/user/getAllDoctors", {
                method: "GET",
                headers:
                {
                    "Content-type": "application/json",
                    Authorization: localStorage.getItem('token'),
                },

            });

            const data = await res.json();
            console.log(doctors)
            if (data.success) {
                setDoctors(data.data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getUser();
    }, [])

    return (
        <>
            <section className='section section-profile py-5 px-5'>
                <div className="container">
                    <h1 className='text-center'>Our <span className='title'>Docter</span> </h1>

                    <div className="row docter-wrapper d-flex justify-content-center">

                        {doctors && doctors.map(doctor => {

                            return (

                                <div class="col-12 col-md-4 col-lg-4 my-2">
                                    <div class="profile-widget">
                                        <div class="doc-img w-100">
                                            <a href="">
                                                <img class="img-fluid" alt="User Image" src={docter} />
                                            </a>
                                        </div>

                                        <div class="pro-content">
                                            <h3 class="title">
                                                {doctor.firstName}   {doctor.lastName}
                                            </h3>
                                            <p class="speciality">{doctor.specialization}</p>
                                            <div class="rating ">

                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                />
                                                <span class="d-inline-block average-rating mb-0 ">(23)</span>
                                            </div>
                                            <ul class="available-info">
                                                <li>
                                                    <i class="fas fa-map-marker-alt px-2"></i> {doctor.address}</li>
                                                <li>
                                                    <i class="fas fa-calendar-check px-2"></i> Available on Mon to set
                                                    {doctor.stiming} to {doctor.etiming}
                                                </li>
                                                <li>
                                                    <i class="fas fa-calendar-check px-2"></i>
                                                    Experience:  {doctor.experience}

                                                </li>

                                                <li><i class="fas fa-wallet px-2"></i> ₹{doctor.feesPerCunsaltation}
                                                </li></ul>

                                            <div class="row row-sm">

                                                <div className="row">
                                                    <div class="col-6">
                                                        <Link class="btn view-btn" to={`/doctor/view-profile/${doctor._id}`}   >View Profile</Link>
                                                    </div>

                                                    <div class="col-6">
                                                    <Link class="btn view-btn" to={`/doctor/book-appointment/${doctor?._id}`}>Appointment</Link>
                                                   
                                                    </div>

                                                   
                                                   </div></div></div></div>
                                </div>
                            )
                        })}




                    </div>
                </div>
            </section>


        </>
    )
}

export default Docters