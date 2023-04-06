import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Table } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  //getUsers
  const getDoctors = async () => {
    try {
      const res = await fetch("/api/v1/admin/getAllDoctors", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      // const res = await fetch("/api/v1/admin/getAllDoctors", {
      //   method: "GET",
      //   headers:
      //   {
      //     "Content-type": "application/json",
      //     Authorization: localStorage.getItem('token'),

      //   },
      //   body:
      //   {
      //     doctorId: record._id,
      //      userId: record.userId, status: status
      //   }
      // },
      // );

      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    // <Layout>
    //   <h1 className="text-center m-3">All Doctors</h1>
    //   <Table columns={columns} dataSource={doctors} />
    // </Layout>
    <>
      <div className="home-wrapper-2">
        <div className="container py-5 px-3">
          <h1 className="text-center my-3">Docter List</h1>
          <Table columns={columns} dataSource={doctors} key={doctors} />
        </div>
      </div>
    </>
  );
};

export default Doctors;
