import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import { setUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(res);
      if (res.data.success) {
        setAppointments(res.data.data);
        console.log(appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Docter Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.firstName}</span>,
    },
    {
      title: "Doctor Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.phone}</span>,
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
      render: (text, record) => (
        <span>
          {" "}
          {console.log("record" + record)}{" "}
          {record.isPaid == true ? "yes" : "no"}{" "}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <div className="home-wrapper-2 container my-5">
      <h1 className="text-center py-3">Appoinmtnets Lists</h1>
      <Table columns={columns} dataSource={appointments} />
    </div>
  );
};

export default Appointments;
