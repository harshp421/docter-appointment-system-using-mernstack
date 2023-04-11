import React, { useEffect, useState } from "react";
import docter from "../img/doctor.jpg";
import avtar from '../img/noDocter.webp'
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const Docters = () => {
  const [doctors, setDoctors] = useState([]);
  const getUser = async () => {
    try {
      const res = await fetch("/api/v1/user/getAllDoctors", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await res.json();
     
      if (data.success) {
        setDoctors(data.data);
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
    { console.log(doctors,"docters")}
      <section className="section section-profile py-5 px-5">
        <div className="container">
          <h1 className="text-center">
            Our <span className="title">Docter</span>{" "}
          </h1>

          <div className="row docter-wrapper d-flex justify-content-center">
            {doctors &&
              doctors.map((doctor) => {
                return (
                  <div className="col-12 col-md-4 col-lg-4 my-2">
                    <div className="profile-widget">
                      <div className="doc-img w-75 mx-auto">
                        
                          <img className="img-fluid" alt="User" src={(doctor.images)?doctor?.images:avtar} />
                        
                      </div>

                      <div className="pro-content">
                        <h3 className="title">
                          {doctor.firstName} {doctor.lastName}
                        </h3>
                        <p className="speciality">{doctor.specialization}</p>
                        <div className="rating ">
                         
                        </div>
                        <ul className="available-info">
                          <li>
                            <i className="fas fa-map-marker-alt px-2"></i>{" "}
                            {doctor.address}
                          </li>
                          <li>
                            <i className="fas fa-calendar-check px-2"></i>{" "}
                            Available on Mon to set
                            {doctor.stiming} to {doctor.etiming}
                          </li>
                          <li>
                            <i className="fas fa-calendar-check px-2"></i>
                            Experience: {doctor.experience}
                          </li>

                          <li>
                            <i className="fas fa-wallet px-2"></i> ₹
                            {doctor.feesPerCunsaltation}
                          </li>
                        </ul>

                        <div className="row row-sm">
                          <div className="row">
                            <div className="col-6">
                              <Link
                                className="btn view-btn"
                                to={`/doctor/view-profile/${doctor._id}`}
                              >
                                View Profile
                              </Link>
                            </div>

                            <div className="col-6">
                              <Link
                                className="btn view-btn"
                                to={`/doctor/book-appointment/${doctor?._id}`}
                              >
                                Appointment
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Docters;
