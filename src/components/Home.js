import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://64eb2cbfe51e1e82c5770dbb.mockapi.io/project-demo/project-demo"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) =>{
    axios
      .delete(
        "https://64eb2cbfe51e1e82c5770dbb.mockapi.io/project-demo/project-demo/"+id)
      .then(res => {navigate('/')})
      .catch((err) => console.error(err));
  }

  const styleLink = {
    color: "#fff",
  };


  return (
    <div className="d-flex  flex-column justify-content-center align-items-center bg-light vh100">
      <h1>list user</h1>
      <Button className="mb3" variant="primary" size="lg" active>
        <Link style={styleLink} to={"/create"}>
          {" "}
          add{" "}
        </Link>
      </Button>
      <div className="w-75 rounded bg-white border shadow p-4">
        <Table className="table table-stripend" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>age</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {data.map((key, index) => (
              <tr key={index}>
                <td>{key.id}</td>
                <td>{key.firstname}</td>
                <td>{key.lastname}</td>
                <td>{key.age}</td>
                <td>
                  <Button variant="primary" size="lg">
                    <Link 
                    style={styleLink}
                      to={`/update/${key.id}`}
                      variant="primary"
                      size="lg"
                      active
                    >
                      Edit
                    </Link>
                  </Button>
                  <Button variant="secondary" size="lg"
                    onClick={e => handleDelete(key.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
