import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout";
import Home from "./pages/Home";
import "./App.css";

// import Resetpassword from './Pages/Resetpassword'
// import Forgotpassword from './Pages/Forgotpassword'
import { useSelector } from "react-redux";
import Spinner from "./Component/Spinner";
import { ProtectedRoute } from "./Component/ProtectedRoute";
import { PublicRoute } from "./Component/PublicRoute";
import Users from "./pages/admin/Users";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import Docters from "./Component/Docters";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import Adminprofile from "./pages/admin/Profile";
import Single_Doctor from "./pages/Single_Doctor";
import ThanksPage from "./pages/ThanksPage";
import Blog from "./pages/Blog";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notification"
              index
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/all-docters"
              index
              element={
                <ProtectedRoute>
                  <Docters />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              index
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/profile/:id"
              index
              element={
                <ProtectedRoute>
                  <Adminprofile />
                </ProtectedRoute>
              }
            />
             <Route
              path="/blog/:id"
              index
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/blog/:id1"
              index
              element={
                <ProtectedRoute>
                  <Blog1 />
                </ProtectedRoute>
              }
            />
           

           <Route
              path="/blog/:id2"
              index
              element={
                <ProtectedRoute>
                  <Blog2/>
                </ProtectedRoute>
              }
            />



            <Route
              path="/admin/doctors"
              index
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/profile/:id"
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/book-appointment/:doctorId"
              index
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/view-profile/:doctorId"
              index
              element={
                <ProtectedRoute>
                  <Single_Doctor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/appointments"
              index
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/conform/:doctorId"
              index
              element={
                <ProtectedRoute>
                  <ThanksPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor-appointments"
              index
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              index
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/signup"
              index
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

             <Route path='/reset-password/:id' element={ 
               <PublicRoute>< Resetpassword/></PublicRoute>} />
              <Route path='/forgot-password' element={ 
                 <PublicRoute>
                   <Forgotpassword/>
                 </PublicRoute>
             } /> 

            <Route
              path="/apply-doctor"
              index
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
