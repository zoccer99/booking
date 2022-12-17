import React, { useContext, useState } from "react";
import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/pictures/logo.jpeg"

export const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className="container-fluid">
        <Navbar.Brand href="#home">
          <img src={Logo} style={{ height: "30px" }} alt="Bild des Logos"/>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
