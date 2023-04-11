import React, { useState } from "react";
import { message, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { useFormik } from "formik";
var data = {};
const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feesPerCunsaltation: "",
    stiming: "",
    etiming: "",
    introducing: "",
  });

  const uploadImg=async(imgdata)=>{
    console.log(imgdata,"img data");
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("images", data[i]);
    }
    console.log(formData,"formDat");
  
    const res = await fetch("/api/v1/user/uploadimage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
         ...imgdata
      }),

    });
     console.log(res,"respponcs");
  }

  let signupSchema = yup.object({
    firstName: yup.string().required("**First name is required "),
    lastName: yup.string().required("**First name is required "),
    phone: yup.string().required("**mobile number is required"),
    email: yup.string().required("**email is required"),
    
    address: yup.string().required("**address is required"),
    specialization: yup.string().required("**specialization is required"),
    experience: yup.string().required("**experiance is required"),
    feesPerCunsaltation: yup.string().required("**fees is required"),
    stiming: yup.string().required("**stiming  is required"),
    etiming: yup.string().required("**Etiming is required"),
    introducing: yup.string().required("**introduction is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",  
      email: "",
      website: "",
      address: "",
      specialization: "",
      experience: "",
      feesPerCunsaltation: "",
      stiming: "",
      etiming: "",
      introducing: "",
      images:""
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      setUserData(values);
      data = values;
      console.log(userData);
      handleFinish(data);
    },
  });

  // const uploadImg = async (data1) => {
  //   try {
  //     const formdata = new FormData();
  //     for (let i = 0; i <= data1.length; i++) {
  //       formdata.append("images", data1[i]);
  //     }

  //     const res = await fetch("/api/v1/user/uploadimage", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify({
  //         formdata,
  //       }),
  //     });
  //     alert("helo");
  //     const data = await res.json();

  //     if (data.success === true) {
  //       console.log("done");
  //       message.success(res.data.message);
  //     } else {
  //       message.error(res.data.error);
  //     }
  //   } catch (error) {
  //     message.error("Somthing Went Wrong");
  //   }
  // };

  const handleFinish = async (data1) => {
    try {
      console.log(data1);
      dispatch(showLoading());
      const res = await fetch("/api/v1/user/apply-doctor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ...data1,
          userId: user._id,
        }),
      });
      const data = await res.json();
      dispatch(hideLoading());
      console.log(data);
      if (data.success === true) {
        message.success(res.data.message);
        Navigate("/");
      } else {
        message.error("failed to apply for Doctar");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong");
    }
  };

  return (
    <>
      <div className="home-wrapper-2 py-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <h1 className="title ">Personal Details :</h1>
            <div class="row">
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example3"
                    name="firstName"
                    class="form-control"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <label class="form-label" for="form8Example3">
                    firstName
                  </label>
                </div>
                <div className="error">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example4"
                    name="lastName"
                    class="form-control"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <label class="form-label" for="form8Example4">
                    Last name
                  </label>
                </div>
                <div className="error">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example3"
                    name="phone"
                    class="form-control"
                    value={formik.values.phone}
                    onChange={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                  />

                  <label class="form-label" for="form8Example3">
                    {" "}
                    Phone
                  </label>
                </div>
                <div className="error">
                  {formik.touched.phone && formik.errors.phone}
                </div>
              </div>
            </div>
            <div class="row py-3">
              <div class="col">
                <div class="form-outline">
                  <input
                    type="email"
                    id="form8Example5"
                    name="email"
                    class="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <label class="form-label" for="form8Example5">
                    Email address
                  </label>
                </div>
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example4"
                    name="website"
                    class="form-control"
                    value={formik.values.website}
                    onChange={formik.handleChange("website")}
                    onBlur={formik.handleBlur("website")}
                  />
                  <label class="form-label" for="form8Example4">
                    WebSite
                  </label>
                </div>
                <div className="error">
                  {formik.touched.website && formik.errors.website}
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example5"
                    name="address"
                    class="form-control"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <label class="form-label" for="form8Example5">
                    Address
                  </label>
                </div>
                <div className="error">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
            </div>
            <h1 className="title py-2">Professional Details:</h1>

            <div class="row py-3">
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example3"
                    name="specialization"
                    class="form-control"
                    value={formik.values.specialization}
                    onChange={formik.handleChange("specialization")}
                    onBlur={formik.handleBlur("specialization")}
                  />
                  <label class="form-label" for="form8Example3">
                    Specialization
                  </label>
                </div>
                <div className="error">
                  {formik.touched.specialization &&
                    formik.errors.specialization}
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example4"
                    name="experience"
                    class="form-control"
                    value={formik.values.experience}
                    onChange={formik.handleChange("experience")}
                    onBlur={formik.handleBlur("experience")}
                  />
                  <label class="form-label" for="form8Example4">
                    Experience
                  </label>
                </div>
                <div className="error">
                  {formik.touched.experience && formik.errors.experience}
                </div>
              </div>

              <div class="col">
                <div class="form-outline">
                  <input
                    type="number"
                    id="form8Example5"
                    name="feesPerCunsaltation"
                    class="form-control"
                    value={formik.values.feesPerCunsaltation}
                    onChange={formik.handleChange("feesPerCunsaltation")}
                    onBlur={formik.handleBlur("feesPerCunsaltation")}
                  />
                  <label class="form-label" for="form8Example5">
                    FeesPerCunsaltation
                  </label>
                </div>
                <div className="error">
                  {formik.touched.feesPerCunsaltation &&
                    formik.errors.feesPerCunsaltation}
                </div>
              </div>
            </div>

            <div className="row py-2">
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example5"
                    name="feesPerCunsaltation"
                    class="form-control"
                    value={formik.values.introducing}
                    onChange={formik.handleChange("introducing")}
                    onBlur={formik.handleBlur("introducing")}
                  />
                  <label class="form-label" for="form8Example5">
                    introducing
                  </label>
                </div>
                <div className="error">
                  {formik.touched.introducing && formik.errors.introducing}
                </div>
              </div>

              <div className="col">
                <div className="form-outline">
                  {/* <TimePicker.RangePicker format="HH:mm" name='timing' value={userData.timing} onChange={handleChange}/>  */}
                  <input
                    type="time"
                    name="stiming"
                    className="form-control"
                    id=""
                    value={formik.values.stiming}
                    onChange={formik.handleChange("stiming")}
                    onBlur={formik.handleBlur("stiming")}
                  />
                  <label class="form-label" for="form8Example5">
                    Start Timing
                  </label>
                </div>
                <div className="error">
                  {formik.touched.stiming && formik.errors.stiming}
                </div>
              </div>

              <div className="col">
                <div className="form-outline">
                  <input
                    type="time"
                    name="etiming"
                    id=""
                    className="form-control"
                    value={formik.values.etiming}
                    onChange={formik.handleChange("etiming")}
                    onBlur={formik.handleBlur("etiming")}
                  />
                  <label class="form-label" for="form8Example5">
                    End Timing
                  </label>
                </div>

                <div className="error">
                  {formik.touched.etiming && formik.errors.etiming}
                </div>
              </div>
            </div>

            <div>




            <div className="row py-2">
              <div class="col">
                <div class="form-outline">
                  <input
                    type="text"
                    id="form8Example5"
                    name="images"
                    class="form-control"
                    value={formik.values.images}
                    onChange={formik.handleChange("images")}
                    onBlur={formik.handleBlur("images")}
                  />
                  <label class="form-label" for="form8Example5">
                    images
                  </label>
                </div>
               
              </div>

           

             
            </div>



              {/* <Dropzone onDrop={(acceptedFile) => uploadImg(acceptedFile)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                )}
              </Dropzone> */}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplyDoctor;
