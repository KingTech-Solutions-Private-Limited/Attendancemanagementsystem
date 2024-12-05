import React, { useCallback, useEffect, useState } from "react";
import "./UpdateStudent.css";
import placeholderImage from "../../Images/SelectedImage.jpg";

function dataURLtoBlob(dataURL) {
  const [header, data] = dataURL.split(",");
  const mimeString = header.split(":")[1].split(";")[0];
  const byteString = atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
}

function UpdateStudent() {
  const [formData, setFormData] = useState({
    student_Id: "",
    fullName: "",
    emailId: "",
    gender: "Male",
    phoneNo: "",
    address: "",
    state: "",
    country: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  const [selectedImage, setSelectedImage] = useState(placeholderImage);

  const handleSearch = async () => {
    try {
      const student = await fetch(
        `https://localhost:7152/Student/GetStudentDetailsById/${formData.student_Id}`
      );

      if (!student.ok) {
        throw new Error("Failed to fetch data");
      }
      const studentData = await student.json();

      setFormData((...prevState) => ({
        ...prevState,
        student_Id: studentData.student_Id,
        fullName: studentData.full_Name || "",
        emailId: studentData.email || "",
        gender: studentData.gender || "Male",
        phoneNo: studentData.phone_Number || "",
        address: studentData.address || "",
        state: studentData.state || "",
        country: studentData.country || "",
      }));

      if (studentData.image) {
        setSelectedImage(`data:image/jpeg;base64,${studentData.image}`);
      } else {
        setSelectedImage(placeholderImage);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countryResponse, stateResponse] = await Promise.all([
          fetch("https://localhost:7152/Student/GetAllCountry"),
          fetch("https://localhost:7152/Student/GetAllState"),
        ]);

        if (!countryResponse.ok || !stateResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const countriesData = await countryResponse.json();
        const statesData = await stateResponse.json();

        setCountries(countriesData);
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterStateByCountry = states.filter(
      (x) => x.countryId === parseInt(formData.country)
    );
    setFilteredState(filterStateByCountry);
  }, [formData.country, states]);

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleClear = useCallback(() => {
    setFormData({
      student_Id: "",
      fullName: "",
      emailId: "",
      gender: "",
      phoneNo: "",
      address: "",
      state: "",
      country: "",
    });
    setSelectedImage(placeholderImage);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("Student_Id", formData.student_Id);
      formDataToSubmit.append("Full_Name", formData.fullName);
      formDataToSubmit.append("Email", formData.emailId);
      formDataToSubmit.append("Gender", formData.gender);
      formDataToSubmit.append("Phone_Number", formData.phoneNo);
      formDataToSubmit.append("Address", formData.address);
      formDataToSubmit.append("State", formData.state);
      formDataToSubmit.append("Country", formData.country);

      if (selectedImage !== placeholderImage) {
        const blob = dataURLtoBlob(selectedImage);
        formDataToSubmit.append("Image", blob, "image.jpg");
      }

      try {
        const response = await fetch(
          "https://localhost:7152/Student/EditStudent",
          {
            method: "PUT",
            body: formDataToSubmit,
          }
        );

        if (response.ok) {
          alert("Update student details successfully.");
          handleClear();
        } else {
          console.error("Error during updation.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [formData, selectedImage, handleClear]
  );

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://localhost:7152/Student/DeleteStudent/${formData.student_Id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Student deleted successfully.");
        handleClear();
      } else {
        console.error("Error during deletation.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Update Student Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="fullName">Student Id</label>
              <input
                type="text"
                id="student_Id"
                name="student_Id"
                value={formData.student_Id}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={handleSearch}
                className="search-button"
              >
                Search
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
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
                required
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.countryId} value={country.countryId}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {filteredState.map((state) => (
                  <option key={state.stateId} value={state.stateId}>
                    {state.stateName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
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
          <button type="submit">Update</button>
          <button className="deleteButton" type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateStudent;
