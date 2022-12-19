import React, { useContext, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import axios from "axios";


function LoginModal(props) {
  const [loginCredentials, setloginCredentials] = useState({
    username: "" ,
    password: "",
  });
  

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    setloginCredentials({ ...loginCredentials, [name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/Users",
        loginCredentials
      );
      if (res.status === 200) {
        localStorage.setItem("jwt", res.data["accessToken"]);
        localStorage.setItem("user", loginCredentials["username"]);
        alert("erfolgreich eingeloggt");
        window.location.reload()
      }
    } catch (err) {
      if (err.status === 401) {
        alert("Falscher Username oder Passwort");
      }
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-2">
        <InputGroup className="mb-3">
          <InputGroup.Text>name</InputGroup.Text>
          <Form.Control
            placeholder="max.mustermann@gmail.com"
            name="username"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>password</InputGroup.Text>
          <Form.Control
            placeholder="27Hkjhnjkweiwhw"
            name="password"
            onChange={handleChange}
          />
        </InputGroup>
        {/* <div className="d-flex justify-content-center">
          <p className="text-center">
            Noch keinen Account?
            <br />
            <a href="/register">Hier Registrieren</a>
          </p>
        </div> */}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button onClick={(e) => handleSubmit(e)}>Bestätigen</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
