import { Badge, message } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { userMenu } from '../Data/data'
import { adminMenu } from '../Data/data'



const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user)
  console.log(user)
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

  const menu = user?.isAdmin ? adminMenu :user?.isDoctor?docterMenu:userMenu;
  //  console.log(menu)
  const handlelogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate('/login');
    message.success("Log out");
  }
  return (
    <> 
    
      <header className="py-4 border-bottom theam-color">
        <div className="container d-flex flex-wrap justify-content-between align-items-center ">
          <div>
            <Link href="/" className="d-flex align-items-center mb-0 mb-lg-0 me-lg-auto text-dark text-decoration-none">
              <h1 className="mb-0 logo">+Soul Strength</h1>
            </Link>
          </div>
          <div class="text-end">
            <Link to='/login' class="btn btn-light text-dark me-2">Login</Link>
            <Link to='/signup' class="btn btn-primary">signup</Link>
          </div>
        </div>
      </header>


      {/* Lower NAvigatio bar */}
      <nav class="py-2 bg-light border-bottom">
     
        <div class="container-xl" >
          
  
          <div className="navbar-collapse show" id='navbarsExample04'>
            
            <ul class="nav d-flex justify-content-center align-items-center  ">
              {
                menu.map((elem) => {
                  return (
                    <>
                      <li class="nav-item"><Link to={elem.path} key={elem.path} class="nav-link link-dark px-2">{elem.name}</Link></li>
                    </>
                  )
                })
              }
              <li class="nav-item">
                <Link href="#" class="flex-1 nav-link link-dark px-2" onClick={handlelogout}>Log Out</Link></li>
              <li class="nav-item">
                <Link to='/profile' class=" nav-link link-dark px-2">{user?.name}</Link>
              </li>
              <li className="nav-link-content ">
                <Badge count={user?.notifcation.length} >
                  <Link to='/notification' class=" nav-link link-dark px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                    </svg>
                  </Link>
                </Badge>
              </li>
            </ul>

          </div>
        </div>

      </nav>

    </>
  )
}

export default Header