import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {

      const res = await fetch("/api/v1/admin/getAllUsers", {
        method: "GET",
        headers:
        {
          "Content-type": "application/json",
          Authorization: localStorage.getItem('token'),

        },  
      },
      );
   
   const data= await res.json();
      
    if (data.success) {
        setUsers(data.data);
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
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    // <Layout>
    //   <h1 className="text-center m-2">Users List</h1>
    //   <Table columns={columns} dataSource={users} />
    // </Layout>
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
