import React, { useEffect, useState } from "react";
import "../App.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function ManageEvents(props) {
  const events = props.events;

  const [event, setEvent] = useState("");
  const [eventFormat, setEventFormat] = useState("ao5");
  const [numRounds, setNumRounds] = useState(0);
  const [cumulativeTimeLimit, setCumulativeTimeLimit] = useState(false);
  const [roundData, setRoundData] = useState(
    Array(4).fill({
      numCompetitors: 0,
      timeLimit: 0,
      cutoffEnabled: false,
      cutoffTime: 0,
    })
  );

  const [disabledPrevButton, setDisabledPrevButton] = useState(true);
  const [disabledNextButton, setDisabledNextButton] = useState(false);

  useEffect(() => {
    for (var i = 0; i < events.length; i++) {
      if (props.numRoundsArr[i] > 0) {
        setEvent(events[i]);
        setNumRounds(props.numRoundsArr[i]);
        break;
      }
    }

    var firstEventIndex = 0;
    var lastEventIndex = 0;
    for (var i = 0; i < 17; i++) {
      if (props.numRoundsArr[i] > 0) {
        firstEventIndex = i;
        break;
      }
    }
    for (i = 0; i < 17; i++) {
      if (props.numRoundsArr[i] > 0) {
        lastEventIndex = i;
      }
    }
    if (firstEventIndex === lastEventIndex) setDisabledNextButton(true);
  }, []);

  const handleEventFormatChange = (e) => {
    var eventIndex = events.indexOf(event);
    props.onEventFormatChange(e, eventIndex);
    setEventFormat(e.target.value);
  };

  const handleCumulativeTimeLimitChange = (e) => {
    var eventIndex = events.indexOf(event);
    props.onCumulativeTimeLimitChange(e, eventIndex);
    setCumulativeTimeLimit(e.target.checked);
  };

  const handleRoundInputChange = (index, field, value) => {
    var eventIndex = events.indexOf(event);
    props.onRoundInputChange(index, field, value, eventIndex);

    setRoundData((prevRoundData) => {
      const newRoundData = [...prevRoundData];
      newRoundData[index] = {
        ...newRoundData[index],
        [field]: value,
      };
      return newRoundData;
    });
  };

  const handleNextEvent = () => {
    var firstEventIndex = 0;
    var lastEventIndex = 0;
    for (var i = 0; i < 17; i++) {
      if (props.numRoundsArr[i] > 0) {
        firstEventIndex = i;
        break;
      }
    }
    for (i = 0; i < 17; i++) {
      if (props.numRoundsArr[i] > 0) {
        lastEventIndex = i;
      }
    }
    for (i = events.indexOf(event) + 1; i < events.length; i++) {
      if (props.numRoundsArr[i] > 0) {
        setEvent(events[i]);
        if (i === lastEventIndex) setDisabledNextButton(true);
        else setDisabledNextButton(false);
        if (i === firstEventIndex) setDisabledPrevButton(true);
        else setDisabledPrevButton(false);
        loadEventData(i);
        break;
      }
    }
  };

  const handlePrevEvent = () => {
    var firstEventIndex = 0;
    var lastEventIndex = 0;
    for (var i = 0; i < 17; i++) {
      if (props.numRoundsArr[i] > 0) {
        firstEventIndex = i;
        break;
      }
    }
    for (i = 0; i < 17; i++) {
      if (props.numRoundsArr[i] > 0) {
        lastEventIndex = i;
      }
    }
    for (i = events.indexOf(event) - 1; i >= 0; i--) {
      if (props.numRoundsArr[i] > 0) {
        setEvent(events[i]);
        if (i === lastEventIndex) setDisabledNextButton(true);
        else setDisabledNextButton(false);
        if (i === firstEventIndex) setDisabledPrevButton(true);
        else setDisabledPrevButton(false);
        loadEventData(i);
        break;
      }
    }
  };

  const loadEventData = (index) => {
    setEventFormat(props.eventFormatArr[index]);
    setNumRounds(props.numRoundsArr[index]);
    setCumulativeTimeLimit(props.cumulativeTimeLimitArr[index]);
    setRoundData(props.roundDataArr[index]);
  };

  return (
    <div>
      <Container className="my-5">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto">
            <Button
              variant="primary"
              style={{ width: "150px" }}
              disabled={disabledPrevButton}
              onClick={handlePrevEvent}
            >
              Previous event
            </Button>
          </Col>
          <Col xs="auto">
            <h1 className="text-center">{event}</h1>
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              style={{ width: "150px" }}
              disabled={disabledNextButton}
              onClick={handleNextEvent}
            >
              Next event
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form>
              <Form.Group>
                <Form.Label>Select an option:</Form.Label>
                <Form.Control
                  as="select"
                  value={eventFormat}
                  onChange={handleEventFormatChange}
                >
                  <option value="ao5">ao5</option>
                  <option value="mo3">mo3</option>
                  <option value="bo3">bo3</option>
                  <option value="bo2">bo2</option>
                  <option value="bo1">bo1</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Cumulative Time Limit"
                  checked={cumulativeTimeLimit}
                  onChange={handleCumulativeTimeLimitChange}
                />
              </Form.Group>

              {Array.from({ length: numRounds }, (_, index) => (
                <div key={index}>
                  <Container className="my-5">
                    <Form.Label>
                      <h3>Round {index + 1}</h3>
                    </Form.Label>
                    <Form.Group className="form-group">
                      <Form.Label>Number of competitors:</Form.Label>
                      <Form.Control
                        type="number"
                        value={roundData[index].numCompetitors}
                        onChange={(e) =>
                          handleRoundInputChange(
                            index,
                            "numCompetitors",
                            e.target.value
                          )
                        }
                        min={0}
                      />
                    </Form.Group>

                    {cumulativeTimeLimit ? (
                      <Form.Group className="form-group">
                        <Form.Label>
                          Cumulative Time Limit (minutes):
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={roundData[index].timeLimit}
                          onChange={(e) =>
                            handleRoundInputChange(
                              index,
                              "timeLimit",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    ) : (
                      <>
                        <Form.Group className="form-group">
                          <Form.Label>Time Limit (minutes):</Form.Label>
                          <Form.Control
                            type="number"
                            value={roundData[index].timeLimit}
                            onChange={(e) =>
                              handleRoundInputChange(
                                index,
                                "timeLimit",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Check
                            type="checkbox"
                            label={`Cutoff`}
                            checked={roundData[index].cutoffEnabled}
                            onChange={(e) =>
                              handleRoundInputChange(
                                index,
                                "cutoffEnabled",
                                e.target.checked
                              )
                            }
                          />
                          {roundData[index].cutoffEnabled && (
                            <Form.Control
                              type="number"
                              value={roundData[index].cutoffTime}
                              onChange={(e) =>
                                handleRoundInputChange(
                                  index,
                                  "cutoffTime",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </Form.Group>
                      </>
                    )}
                  </Container>
                </div>
              ))}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
