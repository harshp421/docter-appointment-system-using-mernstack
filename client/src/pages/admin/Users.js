import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { toast } from "react-toastify";
var data1 = {};
const Users = () => {
  const [users, setUsers] = useState([]);
  const [block, setblock] = useState(false);
  const handleUserUnblock = async (record) => {
    data1 = record;
    try {
      const res = await axios.post(
        "/api/v1/admin/unblockuser",
        { data: data1 },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data) {
        setblock(true);
        setUsers(res.data.data);
        toast.success("user unBlocked");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUser = async (record) => {
    data1 = record;
    try {
      const res = await axios.post(
        "/api/v1/admin/blockuser",
        { data: data1 },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data) {
        console.log(res.data.data);
        setUsers(res.data.data);
        toast.error("user Blocked");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
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
      title: "Is Blocked",
      dataIndex: "isBlocked",
      render: (text, record) => (
        <span>{record.isBlocked === true ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.isBlocked === true ? (
            <button
              className="btn btn-success"
              onClick={() => handleUserUnblock(record)}
            >
              unblock
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => handleUser(record)}
            >
              block
            </button>
          )}
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
