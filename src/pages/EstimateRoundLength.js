import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import "../App.css";
import axios from "axios";

import ContinueButton from "../components/ContinueButton";

export default function EstimateRoundLength(props) {
  const navigate = useNavigate();

  const events = [
    "333",
    "222",
    "444",
    "555",
    "666",
    "777",
    "333bf",
    "333fm",
    "333oh",
    "clock",
    "mega",
    "pyra",
    "skewb",
    "sq1",
    "444bf",
    "555bf",
    "333mbf",
  ];

  const [selectedEvent, setSelectedEvent] = useState("");
  const [numCompetitors, setNumCompetitors] = useState(1);
  const [numStations, setNumStations] = useState(1);
  const [timeLimit, setTimeLimit] = useState(0);
  const [cutoff, setCutoff] = useState(0);
  const [cumulativeTimeLimit, setCumulativeTimeLimit] = useState(0);

  const [prediction, setPrediction] = useState(0);
  const [numGroups, setNumGroups] = useState(0);
  const [competitorsPerGroup, setCompetitorsPerGroup] = useState([]);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleSubmit = () => {
    var event = events.indexOf(selectedEvent) + 1;
    var competitors = numCompetitors;
    var stations = numStations;
    var timelimit = timeLimit;
    if (isNaN(timeLimit)) timelimit = -1;
    var cutoff1 = cutoff;
    if (isNaN(cutoff1)) cutoff1 = -1;
    var cumulative = cumulativeTimeLimit;
    if (isNaN(cumulative)) cumulative = -1;

    const inputData = {
      event: event,
      competitors: parseInt(competitors),
      stations: parseInt(stations),
      timelimit: parseInt(timelimit),
      cutoff: parseInt(cutoff1),
      cumulative: parseInt(cumulative),
    };

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const apiUrl = "https://simonb17.pythonanywhere.com/predict";

    axios
      .post(apiUrl, inputData, { headers })
      .then((response) => {
        setPrediction(response.data[0]);
        setNumGroups(response.data[1]);
        setCompetitorsPerGroup(response.data[2]);
      })
      .catch((error) => {
        console.error("Error making prediction:", error);
      });
  };

  const prevPage = () => {
    navigate("/");
  };

  return (
    <div>
      <Container className="my-5">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto">
            <h1 className="text-center">Estimate round length</h1>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form>
              <Form.Group className="form-group">
                <Form.Label>Select an event</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedEvent}
                  onChange={handleEventChange}
                >
                  <option value="">Choose...</option>
                  <option value="333">333</option>
                  <option value="222">222</option>
                  <option value="444">444</option>
                  <option value="555">555</option>
                  <option value="666">666</option>
                  <option value="777">777</option>
                  <option value="333bf">333bf</option>
                  <option value="333fm">333fm</option>
                  <option value="333oh">333oh</option>
                  <option value="clock">Clock</option>
                  <option value="mega">Mega</option>
                  <option value="pyra">Pyra</option>
                  <option value="skewb">Skewb</option>
                  <option value="sq1">Sq1</option>
                  <option value="444bf">444bf</option>
                  <option value="555bf">555bf</option>
                  <option value="333mbf">333mbf</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Number of competitors</Form.Label>
                <Form.Control
                  type="number"
                  value={numCompetitors}
                  onChange={(e) => setNumCompetitors(e.target.value)}
                  min={1}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Number of stations</Form.Label>
                <Form.Control
                  type="number"
                  value={numStations}
                  onChange={(e) => setNumStations(e.target.value)}
                  min={1}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Time limit (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  min={0}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Cutoff (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={cutoff}
                  onChange={(e) => setCutoff(e.target.value)}
                  min={0}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Cumulative time limit (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={cumulativeTimeLimit}
                  onChange={(e) => setCumulativeTimeLimit(e.target.value)}
                  min={0}
                />
              </Form.Group>

              <Form.Group className="form-group"></Form.Group>
              <Container className="my-5">
                <Row className="justify-content-center align-items-center">
                  <Col xs="auto">
                    <ContinueButton onClick={prevPage} text="Back" />
                  </Col>
                  <Col xs="auto">
                    <ContinueButton onClick={handleSubmit} text="Submit" />
                  </Col>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
      {prediction !== 0 && (
        <Container className="my-5">
          <Row className="justify-content-center align-items-center">
            <Col xs="auto">
              <h3 className="text-center">
                Estimated round length: {prediction} minutes
              </h3>
              <h3 className="text-center">Groups: {numGroups}</h3>
              <h3 className="text-center">
                Competitors per group: {competitorsPerGroup.join(", ")}
              </h3>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
