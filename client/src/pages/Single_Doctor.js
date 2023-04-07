import React, { useEffect, useState } from "react";
//import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from "react-router-dom";
import docter from "../img/doctor.jpg";
import Container from "../Component/Container";
//import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const Single_Doctor = () => {
  // const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const params = useParams();

  const getUserData = async () => {
    try {
      const res = await fetch("/api/v1/doctor/getDoctorById", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          doctorId: params.doctorId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDoctor(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <section class="page-title home-wrapper-2">
        <div class="container">
          <div class="row">
            <div class="col-md-12 docter-box theam-color">
              <div class="block text-center">
                <span class="text-white">Doctor Details</span>
                <h1 class="text-capitalize text-white mb-5 text-lg">
                  Dr.{doctor?.firstName} {doctor?.lastName}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="doctor-single home-wrapper-2">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="doctor-img-block">
                <img src={docter} alt="" class="img-fluid w-100" />

                <div class="info-block mt-4">
                  <h4 class="mb-0">{doctor?.firstName}</h4>
                  <p>{doctor?.specialization}</p>

                  <ul class="list-inline mt-4 doctor-social-links">
                    <li class="list-inline-item">
                      <a href="#!">
                        <i class="icofont-facebook"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#!">
                        <i class="icofont-twitter"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#!">
                        <i class="icofont-skype"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#!">
                        <i class="icofont-linkedin"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#!">
                        <i class="icofont-pinterest"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-8 col-md-6">
              <div class="doctor-details mt-4 mt-lg-0">
                <h2 class="text-md">Introducing to myself</h2>
                <div class="divider my-3"></div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
                  tempore cumque voluptate beatae quis inventore sapiente nemo,
                  a eligendi nostrum expedita veritatis neque incidunt ipsa
                  doloribus provident ex, at ullam. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Ipsam, perferendis officiis esse
                  quae, nobis eius explicabo quidem? Officia accusamus
                  repudiandae ea esse non reiciendis accusantium voluptates,
                  facilis enim, corrupti eligendi?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
                  recusandae veritatis minus optio quod obcaecati laborum
                  temporibus, deleniti vero perferendis molestias, ducimus
                  facilis, sunt minima. Tempora, amet quasi asperiores voluptas?
                </p>

                <Link
                  class="docter-btn"
                  to={`/doctor/book-appointment/${doctor?._id}`}
                >
                  Make An Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section doctor-skills py-5 home-wrapper-2">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <h3>My skills</h3>
              <div class="divider my-4"></div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
                architecto voluptatem alias, aspernatur voluptatibus corporis
                quisquam? Consequuntur, ad, doloribus, doloremque voluptatem at
                consectetur natus eum ipsam dolorum iste laudantium tenetur.
              </p>
            </div>
            <div class="col-lg-4">
              <div class="skill-list">
                <h5 class="mb-4">Expertise area</h5>
                <ul class=" department-service">
                  <li>
                    <i class="icofont-check mr-2"></i>International Drug
                    Database
                  </li>
                  <li>
                    <i class="icofont-check mr-2"></i>Stretchers and Stretcher
                    Accessories
                  </li>
                  <li>
                    <i class="icofont-check mr-2"></i>Cushions and Mattresses
                  </li>
                  <li>
                    <i class="icofont-check mr-2"></i>Cholesterol and lipid
                    tests
                  </li>
                  <li>
                    <i class="icofont-check mr-2"></i>Critical Care Medicine
                    Specialists
                  </li>
                  <li>
                    <i class="icofont-check mr-2"></i>Emergency Assistance
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-4 theam-color text-white ">
              <div class="sidebar-widget p-4">
                <h5 class="mb-3 text-white">Make Appoinment</h5>
                <div
                  class="divider my-2"
                  style={{ backgroundColor: "white" }}
                ></div>
                <ul class="list-unstyled lh-35">
                  <li class="d-flex justify-content-between align-items-center">
                    <span>Monday - Friday</span>
                    <span>
                      {doctor?.stiming}-{doctor?.etiming}
                    </span>
                  </li>
                  <li class="d-flex justify-content-between align-items-center">
                    <span>Saturday</span>
                    <span>9:00 - 16:00</span>
                  </li>
                  <li class="d-flex justify-content-between align-items-center">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>

                <div class="sidebar-contatct-info mt-4">
                  <p class="mb-0">Need Urgent Help?</p>
                  <h3 class="text-white">+91-{doctor?.phone}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    {/* <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    /> */}
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>

                <div>
                  <Link className="text-dark text-decoration-underline" href="">
                    Write a Review
                  </Link>
                </div>
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    {/* <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    /> */}
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary " type="submit">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Disha</h6>
                    {/* <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    /> */}
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consectetur fugit ut excepturi quos. Id reprehenderit
                    voluptatem placeat consequatur suscipit ex. Accusamus dolore
                    quisquam deserunt voluptate, sit magni perspiciatis quas
                    iste?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Single_Doctor;
