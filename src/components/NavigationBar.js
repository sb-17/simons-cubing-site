import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../App.css";

export default function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Šimon's Cubing Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/wca-schedule-maker">WCA Schedule Maker</Nav.Link>
            <Nav.Link href="/blindsolving">Blindsolving</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
