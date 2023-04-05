import React from "react";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
   
      const res = await fetch("/api/v1/user/get-all-notification", {
        method: "POST",
        headers:
        {
          "Content-type": "application/json",
          Authorization: localStorage.getItem('token'),

        },  
        body: JSON.stringify
          ({
             userId: user._id
          })
      },
      );
  const data=await res.json();
      dispatch(hideLoading());
      console.log("noti");
      console.log(data);
      if (data.success) {
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await fetch("/api/v1/user/delete-all-notification", {
        method: "POST",
        headers:
        {
          "Content-type": "application/json",
          Authorization: localStorage.getItem('token'),

        },  
        body: JSON.stringify
          ({

             userId: user._id
          })
      },
      );
      const data = await res.json();
      console.log(data);
      dispatch(hideLoading());
      if (data.success) {
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };
  return (
    <>
      <h4 className="p-3 text-center">Notification Page</h4>
      <div className="container home-wrapper-2 py-5 px-3">
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0} >
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.notifcation.map((notificationMgs) => (
            <div className="card my-3 " style={{ cursor: "pointer" }}>
              <div
                className="card-text py-3 px-2  alert alert-success"
                onClick={() =>{
                  console.log("notificationMgs")
                  navigate(notificationMgs.onClickPath)}}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text py-3 px-2 alert alert-secondary"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
      </div>
     
    </>
  );
};

export default NotificationPage;
