import React, { useState } from "react";
import "./HomePage.css";
import homeImage from "../../Images/Home.jpg";
import RegisterUser from "../RegisterUser/RegisterUser";

function HomePage() {
  const [selectedMenu, setSelectedMenu] = useState();

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="title">Attendance Management System</h1>
      </header>
      <div className="container-7">
        <div className="menu">Menu</div>
        <div className="container">
          <span
            className="register-user"
            onClick={() => setSelectedMenu(<RegisterUser/>)}
          >
            Register User
          </span>
        </div>
        <div className="container">
          <span className="view-user" onClick={() => setSelectedMenu()}>View User</span>
        </div>
        <div className="container">
          <span className="update-user">Update User</span>
        </div>
        <div className="container">
          <span className="delete-user">Delete User</span>
        </div>
        <div className="container">
          <span className="generate-qr">Generate QR</span>
        </div>
        <div className="container">
          <span className="view-qr">View QR</span>
        </div>
        <div className="container">
          <span className="mark-attendance">Mark Attendance</span>
        </div>
        <div className="container">
          <span className="view-attendance">View Attendance</span>
        </div>
      </div>
      <div className="content-container">
        {!selectedMenu && <img src={homeImage} alt="Home" />}
        {selectedMenu}
      </div>
    </div>
  );
}

export default HomePage;
