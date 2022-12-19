import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/pictures/logo.jpeg";
import LoginModal from "./user/LoginModal";

export const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/isUserAuthenticated",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    fetch();
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false)
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container className="container-fluid">
        <Navbar.Brand href="#home">
          <img src={Logo} style={{ height: "30px" }} alt="Bild des Logos" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Kontakt
            </Nav.Link>
            <Nav.Link as={Link} to="/myTickets">
              Mein Einkaufswagen
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            ) : (
              <div>
                <Nav.Link
                  className="loginWrapper"
                  onClick={() => setShowModal(true)}
                >
                  Login
                </Nav.Link>
                <LoginModal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                />
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
