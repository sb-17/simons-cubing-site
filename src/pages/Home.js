import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col className="text-center">
          <Link to="/create">
            <Button variant="primary" size="lg" style={{ width: "250px" }}>
              Create schedule
            </Button>
          </Link>
        </Col>
        <Col className="text-center">
          <Link to="/roundlength">
            <Button variant="primary" size="lg" style={{ width: "250px" }}>
              Estimate round length
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
