/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const getUserdata = async () => {
    try {
      const res = await fetch("/api/v1/user/getUserData", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      console.log(data);
      console.log("protected");
      console.log(localStorage.getItem("token"));
      if (data.success === true) {
        console.log("done buddy");
        dispatch(setUser(data.data));
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
      // localStorage.clear();
    }
  };

  useEffect(() => {
    if (!user) {
      getUserdata();
    }
  }, [user, getUserdata]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
