import React from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Component/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
var data = {};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let signupSchema = yup.object({
    email: yup.string().required("**email is required"),
    password: yup.string().required("**Password is required "),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      data = values;
      console.log(data);
      submitdata(data);
    },
  });

  const submitdata = async (data1) => {
    try {
      dispatch(showLoading());
      const { email, password } = data1;
      const res = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      dispatch(hideLoading());

      if (data.success === true) {
        localStorage.setItem("token", data.token);
        toast.success("Login  Successfully!");
        navigate("/");
      } else {
        console.log(data.message, "data");
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <>
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center">login</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-30"
              >
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className="form-control "
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control "
                    placeholder="enter Password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                </div>
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <Link to="/forgot-password"> Forget Password</Link>
                  <div className="d-flex justify-content-center align-items-center gap-10">
                    <button
                      class="btn btn-dark text-white px-4 me-2"
                      type="submit"
                    >
                      Login
                    </button>
                    <Link to="/signup" class="btn btn-light px-4">
                      Sign-up
                    </Link>
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
