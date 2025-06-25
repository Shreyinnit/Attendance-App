import React, { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const markAttendance = (id, status) => {
  fetch("http://localhost:5000/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: id,
      status: status,
      date: new Date().toISOString().split("T")[0],
    }),
  })
    .then(res => res.json())
    .then(data => {
      alert(`${status} marked for student ID ${id}`);
    });
};


  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Attendance App</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id} style={{ marginBottom: "10px" }}>
            {s.name}
            <button onClick={() => markAttendance(s.id, "Present")}>✅</button>
            <button onClick={() => markAttendance(s.id, "Absent")}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
