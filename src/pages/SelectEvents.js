import React, { useState } from "react";
import "../App.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import EventCard from "../components/EventCard";

export default function SelectEvents(props) {
  const events = props.events;

  return (
    <div>
      <Container className="my-5">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto">
            <h1 className="text-center">Select Events</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {events.map((item, i) => (
            <Col className="mb-4" key={i} xs={12} sm={6} md={4} mb={2} lg={3}>
              <EventCard
                eventName={events[i]}
                onNumRoundsChange={props.onNumRoundsChange}
                onNumStationsChange={props.onNumStationsChange}
                index={i}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
