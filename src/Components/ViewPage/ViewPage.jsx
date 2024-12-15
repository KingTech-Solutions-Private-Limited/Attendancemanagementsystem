import { useEffect, useState } from "react";
import "./ViewPage.css";

function ViewPage() {
  const [studentDetails, setStudentDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7152/Student/GetAllStudent"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setStudentDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredStudents = studentDetails.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="view-container">
      <h2>View Student Details</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="table-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Gender</th>
                <th>State</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((item) => (
                <tr key={item.student_Id}>
                  <td>{item.student_Id}</td>
                  <td>{item.full_Name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_Number}</td>
                  <td>{item.gender}</td>
                  <td>{item.state}</td>
                  <td>{item.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
