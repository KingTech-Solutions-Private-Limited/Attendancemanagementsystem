import { useEffect, useState } from "react";
import "./QRPage.css";
import placeholderImage from "../../Images/SelectedImage.jpg";

function QRPage() {
  const [studentDetails, setStudentDetails] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(placeholderImage);

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

  const handleRowClick = (student) => {
    var qrImage = `data:image/jpeg;base64,${student.qR_Code}`;
    setSelectedStudent(qrImage || placeholderImage);
  };

  return (
    <div className="qr-container">
      <h2>View QR Details</h2>
      <div className="content-wrapper">
        <div className="qrtable-container">
          <div className="qrtable-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {studentDetails.map((item) => (
                  <tr
                    key={item.student_Id}
                    onClick={() => handleRowClick(item)}
                  >
                    <td>{item.student_Id}</td>
                    <td>{item.full_Name}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="qrimage-container">
          <img
            src={selectedStudent}
            alt="Selected Student"
            className="qrstudent-image"
          />
        </div>
      </div>
    </div>
  );
}

export default QRPage;
