import React, { useState } from "react";
import { Card, Form, Container } from "react-bootstrap";

const EventCard = ({
  eventName,
  onNumRoundsChange,
  onNumStationsChange,
  index,
}) => {
  const [numRounds, setNumRounds] = useState(0);
  const [numStations, setNumStations] = useState(1);

  const handleNumRoundsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const clampedValue = Math.min(Math.max(value, 0), 4);
      setNumRounds(clampedValue);
      onNumRoundsChange(clampedValue, index);
    } else {
      setNumRounds("");
      onNumRoundsChange(0, index);
    }
  };

  const handleNumStationsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const clampedValue = Math.max(value, 1);
      setNumStations(clampedValue);
      onNumStationsChange(clampedValue, index);
    } else {
      setNumStations("");
      onNumStationsChange(1, index);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h3>{eventName}</h3>
        </Card.Title>
        <Form.Group>
          <Container>
            <Form.Label>Number of rounds:</Form.Label>
            <Form.Control
              type="number"
              value={numRounds}
              onChange={handleNumRoundsChange}
            />
          </Container>
          {numRounds > 0 && (
            <Container>
              <Form.Label>Number of stations:</Form.Label>
              <Form.Control
                type="number"
                value={numStations}
                onChange={handleNumStationsChange}
                min={1}
              />
            </Container>
          )}
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
