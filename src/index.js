// import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await Axios.get("/api/reports");
        setReports(response.data.reports);
      } catch (error) {
        console.log(error);
      }
    };
    getReports();
  }, []);

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setTitle(value);
    } else if (name === "location") {
      setLocation(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const createReport = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/api/reports", {
        title,
        location,
        description,
        password,
      });
      console.log(response.data);
      setReports([...reports, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Phenomena</h1>
      <ul>
        {reports.map((report, index) => {
          return <li key={index}>{report.title}</li>;
        })}
      </ul>

      <form onSubmit={createReport}>
        <input
          type="text"
          value={title}
          onChange={onChange}
          name="title"
          placeholder="title"
        />
        <input
          type="text"
          value={location}
          onChange={onChange}
          name="location"
          placeholder="location"
        />
        <input
          type="text"
          value={description}
          onChange={onChange}
          name="description"
          placeholder="description"
        />
        <input
          type="password"
          value={password}
          onChange={onChange}
          name="password"
          placeholder="password"
        />
        <button type="submit">Create Report</button>
      </form>
    </>
  );
};

// const App = () => {
//   const [reports, setReports] = useState([]);
//   const [title, setTitle] = useState([""]);
//   const [location, setLocation] = useState([""]);
//   const [description, setDescription] = useState([""]);

//   useEffect(() => {
//     const getReports = async () => {
//       const response = await axios.get("/api/reports");
//       console.log(response.data);
//     };
//     getReports();
//   });

//   const onChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     if (name === "title") {
//       setTitle(value);
//     } else if (name === "location") {
//       setLocation(value);
//     }
//   };
//   return (
//     <>
//       <h1>hello</h1>
//       <ul>
//         {reports.map((report) => {
//           return <li>{report.title}</li>;
//         })}
//       </ul>
//       <form>
//         <input
//           type="text"
//           value={title}
//           onChange={onChange}
//           name="title"
//           placeholder="title"
//         />
//         <input
//           type="text"
//           value={location}
//           onChange={onChange}
//           name="location"
//           placeholder="location"
//         />
//         <input
//           type="text"
//           value={description}
//           onChange={onChange}
//           name="description"
//           placeholder="description"
//         />
//       </form>
//     </>
//   );
// };

const root = createRoot(document.getElementById("root"));
root.render(<App />);
