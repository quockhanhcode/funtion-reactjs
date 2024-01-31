import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { styled } from "@mui/material/styles";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
function Create() {
  const [values, setValue] = useState({
    firstname: "",
    lastname: "",
    age: "",
  });
  const navigate = useNavigate();

  const [age, setAges] = useState('');

  const handleSubmit = (event) => {

    const inputAge = parseInt(values.age, 10);

    if(inputAge > 1 && inputAge <= 100){
      // setAges(inputAge);
      axios
      .post(
        "https://64eb2cbfe51e1e82c5770dbb.mockapi.io/project-demo/project-demo",
        values
      )
      .then((res)=> {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.error(err));
    }
    else{
      window.alert("Số tuổi không quá 100");
      setValue((prevValues) => ({ ...prevValues, age: "" }));
    }

    event.preventDefault();
  };
  const box = {
    maxWidth: "950px",
    width: "95%",
  };

  return (
    <div>
      <div className="d-flex  flex-column justify-content-center align-items-center bg-light vh100">
        <h1>create user</h1>
        <div style={box} className=" rounded border shadow p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First Name"
                name="firstname"
                required
                onChange={(e) =>
                  setValue({ ...values, firstname: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last Name"
                name="lastname"
                required
                onChange={(e) =>
                  setValue({ ...values, lastname: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="age"
                name="age"
                required
                value={values.age}
                onChange={(e) => setValue({ ...values, age: e.target.value })}
              />
            </Form.Group>
            <button type="submit"  variant="primary" size="lg">
              Submit
            </button>{" "}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Create;
