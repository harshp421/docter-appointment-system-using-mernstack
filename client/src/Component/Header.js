import { Badge, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userMenu } from "../Data/data";
import { adminMenu } from "../Data/data";
import logo from "../img/logo.png";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  console.log(user);
  // ==================DocterManu========================
  const docterMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const menu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? docterMenu
    : userMenu;
  //  console.log(menu)
  const handlelogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
    toast.success("Log out");
  };
  const [shownev, setShownev] = useState(false);
  return (
    <>
      <header className="py-4 border-bottom theam-color">
        <div className="container d-flex flex-wrap justify-content-between align-items-center ">
          <div>
            <Link
              href="/"
              className="logo-link d-flex align-items-center mb-0 mb-lg-0 me-lg-auto text-dark text-decoration-none"
            >
              <img src={logo} alt="logo" className="img-fluid logo" />
            </Link>
          </div>
          <div class="text-end">
            <Link to="/login" class="btn btn-light text-dark me-2">
              Login
            </Link>
            <Link to="/signup" class="btn btn-primary">
              signup
            </Link>
          </div>
        </div>
      </header>
      {/* Lower Navigatio bar */}
      <nav class="navbar navbar-expand-lg  py-2 bg-light border-bottom">
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShownev(!shownev)}
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class={`collapse  navbar-collapse ${shownev ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav flex  head-nav">
            {menu.map((elem, index) => {
              return (
                <>
                  <li class="nav-item" key={index}>
                    <Link
                      to={elem.path}
                      key={elem.path}
                      className="nav-link link-dark px-2"
                    >
                      {elem.name}
                    </Link>
                  </li>
                </>
              );
            })}

            {user?._id && (
              <li className="nav-item">
                <Link
                  href="#"
                  className="flex-1 nav-link link-dark px-2"
                  onClick={handlelogout}
                >
                  Log Out
                </Link>
              </li>
            )}

            <li className="nav-link-content ">
              <Badge count={user?.notifcation?.length}>
                <Link to="/notification" class=" nav-link link-dark px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-bell-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                  </svg>
                </Link>
              </Badge>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
