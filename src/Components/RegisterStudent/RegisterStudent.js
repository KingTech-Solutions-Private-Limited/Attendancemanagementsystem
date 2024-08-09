import React, { useState } from "react";
import "./RegisterStudent.css";
import placeholderImage from "../../Images/Login.jpeg";

function RegisterStudent() {
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    gender: "",
    phoneNo: "",
    address: "",
    state: "",
    country: "",
  });

  const [selectedImage, setSelectedImage] = useState(placeholderImage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  const handleClear = () => {
    setFormData({
      fullName: "",
      emailId: "",
      gender: "",
      phoneNo: "",
      address: "",
      state: "",
      country: "",
    });
    setSelectedImage(placeholderImage);
  };

  return (
    <div className="registration-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailId">Email ID</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <div className="gender-options">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNo">Phone No</label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="State1">State1</option>
                <option value="State2">State2</option>
                <option value="State3">State3</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="Country1">Country1</option>
                <option value="Country2">Country2</option>
                <option value="Country3">Country3</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <img
                src={selectedImage}
                alt="Student"
                className="student-image"
              />
            </div>
          </div>
        </div>
        <div className="button-group">
          <button type="submit">Register</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterStudent;
