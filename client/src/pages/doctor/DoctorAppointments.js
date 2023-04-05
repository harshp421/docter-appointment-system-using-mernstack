import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
        const res = await axios.get("/api/v1/doctor/doctor-appointments", {
         headers: {
           Authorization: localStorage.getItem("token"),
         },
        });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }};

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "User Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
         {record.userName}
        </span>
      ),
    },
    {
      title: "User Email",
      dataIndex: "email",
      render: (text, record) => <span>{record.userEmail}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    { 
      title: "Is Paid",
      dataIndex: "isPaid",
      render: (text, record) => <span> {(record.isPaid==true)?"yes":"no"} </span>,
    
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
    {console.log(appointments)}
      <div className="container home-wrapper-2 my-5 py-5 px-3">
        <h1 className="text-center">Appoinmtnets Lists</h1>
        <Table columns={columns} dataSource={appointments} />
      </div>

    </>
  );
};

export default DoctorAppointments;
