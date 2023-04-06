import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
var data1 = {};
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await fetch("/api/v1/admin/getAllUsers", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUser = async (record) => {
    data1 = record;
    const res = await fetch("/api/v1/admin/blockuser", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data1),
    });
    console.log(data1);
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger" onClick={() => handleUser(record)}>
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="home-wrapper-2">
        <div className="container py-5 px-3">
          <h1 className="text-center my-3">Users List</h1>
          <Table columns={columns} dataSource={users} />
        </div>
      </div>
    </>
  );
};

export default Users;
