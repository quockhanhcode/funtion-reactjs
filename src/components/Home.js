import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://64eb2cbfe51e1e82c5770dbb.mockapi.io/project-demo/project-demo"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    const choice = window.confirm("Are you sure");
    if (choice) {
      axios
        .delete(
          "https://64eb2cbfe51e1e82c5770dbb.mockapi.io/project-demo/project-demo/" +
            id
        )
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };

  //Pagination

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentData = data.slice(startIndex, endIndex);

  // search

  // search

  axios.defaults.headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  };

  const styleLink = {
    color: "#fff",
  };

  return (
    <div className="d-flex  flex-column justify-content-center align-items-center bg-light vh100">
      <h1>list user</h1>
      <div className="search-header">
        <div className="search-text">Search:</div>
        <input onChange={(e) => setSearch(e.target.value)} id="search-box" />
      </div>
      <Button className="mb3" variant="primary" size="lg" active>
        <Link style={styleLink} to={"/create"}>
          add
        </Link>
      </Button>
      <div className="mt-4 w-75 rounded bg-white border shadow p-4">
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
            {data.filter((key) => {
                return(
                  search.toLowerCase() === "" || key.firstname.toLowerCase().includes(search.toLowerCase()));
              }).slice(startIndex, endIndex).map((key, index) => (
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
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="ms-3"
                      onClick={(e) => handleDelete(key.id)}
                    >
                      <Link style={styleLink} to={"/home"}>
                        {" "}
                        Delete
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <Stack spacing={2} className="mt-4">
        <Pagination
          count={totalPages}
          page={currentPage + 1}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}

export default Home;
