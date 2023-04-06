import React from "react";
import Container from "../Component/Container";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { message } from "antd";
import { useFormik } from "formik";
var data = {};
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    MobileNumber: "",
    password: "",
    cpassword: "",
  });

  let signupSchema = yup.object({
    name: yup.string().required("**First name is required "),
    email: yup.string().required("**email is required"),
    MobileNumber: yup.string().required("**mobile number is required"),
    password: yup.string().required("**Password is required "),
    cpassword: yup.string().required("**Password is required "),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      MobileNumber: "",
      password: "",
      cpassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      setUserData(values);
      data = values;
      console.log(data);
      submitdata(data);
    },
  });
  const submitdata = async (data1) => {
    try {
      const { name, email, password, cpassword, MobileNumber } = data1;

      console.log(data1, "data");
      dispatch(showLoading());
      const res = await fetch("/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          MobileNumber,
          password,
          cpassword,
        }),
      });
      const data = await res.json();
      //console.log(data);
      dispatch(hideLoading());

      if (data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      dispatch(hideLoading());
      console.log(e);
    }
  };
  return (
    <>
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center">Sign up</h3>
              <form
                className="d-flex flex-column gap-30 "
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    id="fname"
                    className="form-control"
                    placeholder="First-name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  />
                </div>
                <div className="error">
                  {formik.touched.name && formik.errors.name}
                </div>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                </div>
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div className="mt-1">
                  <input
                    type="string"
                    name="MobileNumber"
                    className="form-control"
                    placeholder="MobileNumber"
                    value={formik.values.MobileNumber}
                    onChange={formik.handleChange("MobileNumber")}
                    onBlur={formik.handleBlur("MobileNumber")}
                  />
                </div>
                <div className="error">
                  {formik.touched.MobileNumber && formik.errors.MobileNumber}
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control "
                    placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                </div>
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    className="form-control "
                    placeholder="current-password"
                    value={formik.values.cpassword}
                    onChange={formik.handleChange("cpassword")}
                    onBlur={formik.handleBlur("cpassword")}
                  />
                </div>
                <div className="error">
                  {formik.touched.cpassword && formik.errors.cpassword}
                </div>
                <div>
                  <div className="d-flex justify-content-center align-items-center gap-10">
                    <button class="btn btn-primary" type="submit">
                      Sign-up
                    </button>
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

export default Signup;
