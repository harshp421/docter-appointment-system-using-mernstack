import React, { useEffect, useState } from "react";
import avtar from '../img/noDocter.webp'
import docter from "../img/doctor.jpg";
import docter1 from "../img/doctor-01.jpg";
import docter2 from "../img/doctor-02.jpg";
import { Link } from "react-router-dom";
import s1 from "../img/s1.jpg";
import s2 from "../img/s2.jpg";
import s3 from "../img/s3.jpg";
import work from "../img/work.jpg";
import work2 from "../img/work2.jpg";
import { useDispatch, useSelector } from "react-redux";
import Contectmodel from "./Contectmodel";
import { setUser } from "../redux/features/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.user);
  //login userdata


  const [doctors, setDoctors] = useState([]);
  const getDocter = async () => {
    try {
      const res = await fetch("/api/v1/user/getAllDoctors", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      console.log(doctors);
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocter();
  }, []);


  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  useEffect(() => {}, []);

  const getUser = async () => {
    try {
      const res = await fetch("/api/v1/user/getUserData", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {/* Image Sliader */}

      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            style={{ backgroundColor: "#777" }}
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            style={{ backgroundColor: "#777" }}
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            style={{ backgroundColor: "#777" }}
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src={s2}
              className="d-block w-100 "
              style={{ height: "100%", objectFit: "cover" }}
              alt="..."
            />
            <div class="carousel-caption">
              <h5>
                <span className="title"> First slide label</span>
              </h5>
              <p className="d-none d-md-block">
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src={s1}
              class="d-block w-100 "
              style={{ height: "100%", objectFit: "cover" }}
              alt="..."
            />
            <div class="carousel-caption">
              <h5>
                {" "}
                <span className="title"> First slide label</span>{" "}
              </h5>
              <p className="d-none d-md-block">
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src={s3}
              class="d-block w-100"
              style={{ height: "100%", objectFit: "cover" }}
              alt="..."
            />
            <div class="carousel-caption">
              <h5>
                {" "}
                <span className="title"> First slide label</span>{" "}
              </h5>
              <p className="d-none d-md-block">
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
            style={{ backgroundColor: "#777" }}
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
            style={{ backgroundColor: "#777" }}
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      {/* feature section */}
      <section className="home-wrapper-2 py-5 ">
        <div
          class="container feature-wrapper  px-4 py-5 theam-color"
          id="hanging-icons"
        >
          <h2 class="pb-2 border-bottom text-center text-white">
            Our doctors follow our key pillars to get you in top conditions
          </h2>
          <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="col d-flex align-items-start  py-3  ">
              <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
              <div>
                <h3 className="fs-2 text-white text-center">Manual Therapy</h3>
                <p className="text-white text-center">
                  {" "}
                  Manual therapy involves hands-on techniques to mobilize,
                  manipulate, and massage soft tissues and joints to alleviate
                  pain, reduce inflammation, and improve range of motion..
                </p>
              </div>
            </div>
            <div className="col d-flex align-items-start py-3 ">
              <div className="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
              <div>
                <h3 className="fs-2 text-white text-center">
                  Exercise Prescription
                </h3>
                <p className="text-white text-center">
                  {" "}
                  Physiotherapists design customized exercise programs tailored
                  to an individual's specific needs, fitness level, and health
                  condition, to improve strength, endurance, flexibility, and
                  balance.
                </p>
              </div>
            </div>
            <div className="col d-flex align-items-start py-3 ">
              <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
              <div>
                <h3 className="fs-2 text-white text-center">
                  Post-Operative Rehabilitation
                </h3>
                <p className="text-white text-center">
                  After a surgical procedure, physiotherapy helps individuals
                  recover quickly and safely, reduce post-operative pain and
                  swelling, and improve joint mobility..
                </p>
              </div>
            </div>
            <div className="col d-flex align-items-start py-3 ">
              <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
              <div>
                <h3 className="fs-2 text-white text-center">
                  Injury Prevention
                </h3>
                <p className="text-white text-center">
                  Physiotherapists assess individuals' risk factors for injury
                  and develop personalized strategies to minimize the risk of
                  injury during physical activities.
                </p>
              </div>
            </div>
            <div className="col d-flex align-items-start py-3 ">
              <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
              <div>
                <h3 className="fs-2 text-white text-center">
                  Sports Physiotherapy
                </h3>
                <p className="text-white text-center">
                  {" "}
                  Sports physiotherapy focuses on the prevention, diagnosis, and
                  treatment of sports-related injuries. This type of therapy
                  helps athletes recover from injuries, optimize their
                  performance, and prevent future injuries..
                </p>
              </div>
            </div>
            <div className="col d-flex align-items-start py-3 ">
              <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
              <div>
                <h3 className="fs-2 text-white text-center">Women's Health</h3>
                <p className="text-white text-center">
                  Women's health physiotherapy focuses on addressing conditions
                  related to the pelvic floor, such as incontinence, pelvic
                  pain, and pelvic organ prolapse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* feature section end*/}

      {/* What we offer section */}
      <section className="home-wrapper-2">
        <div className="container-xxl">
          <div className="row px-4 py-5 text-center border-bottom">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
              <h1 className="fw-bold">Experienced Therapist</h1>
              <p className=" mb-4">
                Quickly design and customize responsive mobile-first sites with
                Bootstrap, the world’s most popular front-end open source
                toolkit, featuring Sass variables and mixins, responsive grid
                system, extensive prebuilt components, and powerful JavaScript
                plugins.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
              <Link
                  
                  to={'/blog/:id'}
                  className="btn btn-primary btn-lg px-4 me-sm-3"
                >
                  Read More ...
                </Link>
              </div>
            </div>
            <div className="overflow-hidden col-lg-6">
              <div class="container w-100">
                <img
                  src={docter}
                  className="img-fluid border rounded-3 shadow-lg mb-4"
                  alt="Example "
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer section     1*/}
      <section>
        <div className="container-xxl">
          <div className="row px-4 py-5 text-center border-bottom">
            <div className="overflow-hidden col-lg-6">
              <div class="container w-100">
                <img
                  src={work}
                  className="img-fluid border rounded-3 shadow-lg mb-4"
                  style={{ height: "70vh" }}
                  alt="Example "
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
              <h1 className="fw-bold">Personalised Treatment</h1>
              <p className=" mb-4">
                Quickly design and customize responsive mobile-first sites with
                Bootstrap, the world’s most popular front-end open source
                toolkit, featuring Sass variables and mixins, responsive grid
                system, extensive prebuilt components, and powerful JavaScript
                plugins.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <Link
                  
                  to={'/blog/:id'}
                  className="btn btn-primary btn-lg px-4 me-sm-3"
                >
                  Read More ...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What we offer section   1*/}




      <section className="home-wrapper-2">
        <div className="container">
          <div className="row px-4 py-5 text-center ">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
              <h1 className="fw-bold">Trained Therapists</h1>
              <p className=" mb-4">
                Quickly design and customize responsive mobile-first sites with
                Bootstrap, the world’s most popular front-end open source
                toolkit, featuring Sass variables and mixins, responsive grid
                system, extensive prebuilt components, and powerful JavaScript
                plugins.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
              <Link
                  
                  to={'/blog/:id'}
                  className="btn btn-primary btn-lg px-4 me-sm-3"
                >
                  Read More ...
                </Link>
              </div>
            </div>

            <div className="overflow-hidden col-lg-6">
              <div class="container w-100">
                <img
                  src={work2}
                  className="img-fluid border rounded-3 shadow-lg mb-4"
                  alt="Example"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* our Docter Section */}
      <section
        className="container  py-5 px-5"
      >

<h1 className="text-center">
            Our <span className="title">Docter</span>{" "}
          </h1>
           <div className="row docter-wrapper d-flex justify-content-center">
            {doctors &&
              doctors?.map((doctor,index) => {
                if(index<3)
                {
                  return (
                    <div className="col-12 col-md-4 col-lg-4 my-2">
                      <div className="profile-widget">
                        <div className="doc-img w-75 mx-auto">
                          <a href="#">
                          <img className="img-fluid" alt="User" src={(doctor.images)?doctor?.images:avtar} />
                        
                          </a>
                        </div>
  
                        <div className="pro-content">
                          <h3 className="title">
                            {doctor?.firstName} {doctor?.lastName}
                          </h3>
                          <p className="speciality">{doctor?.specialization}</p>
                          <div className="rating ">
                           
                          </div>
                          <ul className="available-info">
                            <li>
                              <i className="fas fa-map-marker-alt px-2"></i>{" "}
                              {doctor?.address}
                            </li>
                            <li>
                              <i className="fas fa-calendar-check px-2"></i>{" "}
                              Available on Mon to set
                              {doctor?.stiming} to {doctor?.etiming}
                            </li>
                            <li>
                              <i className="fas fa-calendar-check px-2"></i>
                              Experience: {doctor?.experience}
                            </li>
  
                            <li>
                              <i className="fas fa-wallet px-2"></i> ₹
                              {doctor?.feesPerCunsaltation}
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
                }
               
              })}
          </div>
      </section>

      {/* connect us form */}
      <Contectmodel />
    </>
  );
};

export default Home;
