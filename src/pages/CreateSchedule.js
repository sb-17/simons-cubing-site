import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import SelectEvents from "./SelectEvents";
import ManageEvents from "./ManageEvents";
import ManageRoundsLength from "./ManageRoundsLength";
import ContinueButton from "../components/ContinueButton";

export default function CreateSchedule(props) {
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

  const [numRounds, setNumRounds] = useState(Array(17).fill(0));
  const [numStations, setNumStations] = useState(Array(17).fill(1));
  const [selectedEvents, setSelectedEvents] = useState(0);

  const handleNumRoundsChange = (newNumRounds, index) => {
    if (numRounds[index] > 0 && newNumRounds === 0)
      setSelectedEvents(selectedEvents - 1);
    else if (numRounds[index] === 0 && newNumRounds > 0)
      setSelectedEvents(selectedEvents + 1);
    const newArr = numRounds;
    newArr[index] = newNumRounds;
    setNumRounds(newArr);
  };

  const handleNumStationsChange = (newNumStations, index) => {
    const newArr = numStations;
    newArr[index] = newNumStations;
    setNumStations(newArr);
  };

  const [eventFormatArr, setEventFormatArr] = useState(Array(17).fill("ao5"));
  const [numRoundsArr, setNumRoundsArr] = useState(Array(17).fill(0));
  const [cumulativeTimeLimitArr, setCumulativeTimeLimitArr] = useState(
    Array(17).fill(false)
  );
  const [roundDataArr, setRoundDataArr] = useState(
    Array(17).fill(
      Array(4).fill({
        numCompetitors: 0,
        timeLimit: 0,
        cutoffEnabled: false,
        cutoffTime: 0,
      })
    )
  );

  const handleEventFormatArrChange = (e, eventIndex) => {
    const newArr = eventFormatArr;
    newArr[eventIndex] = e.target.value;
    setEventFormatArr(newArr);
  };

  const handleCumulativeTimeLimitArrChange = (e, eventIndex) => {
    const newArr = cumulativeTimeLimitArr;
    newArr[eventIndex] = e.target.checked;
    setCumulativeTimeLimitArr(newArr);
  };

  const handleRoundInputArrChange = (index, field, value, eventIndex) => {
    setRoundDataArr((prevRoundDataArr) => {
      const newRoundDataArr = [...prevRoundDataArr];
      const newRoundData = [...newRoundDataArr[eventIndex]];
      newRoundData[index] = {
        ...newRoundData[index],
        [field]: value,
      };
      newRoundDataArr[eventIndex] = newRoundData;
      return newRoundDataArr;
    });
  };

  const [page, setPage] = useState("");

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 0) {
      navigate("/wca-schedule-maker");
    } else setPage(page - 1);
  };

  useEffect(() => {
    setPage(0);
  }, []);

  return (
    <div>
      {page === 0 && (
        <SelectEvents
          onNumRoundsChange={handleNumRoundsChange}
          onNumStationsChange={handleNumStationsChange}
          events={events}
        />
      )}
      {page === 1 && (
        <ManageEvents
          numRoundsArr={numRounds}
          onEventFormatChange={handleEventFormatArrChange}
          onCumulativeTimeLimitChange={handleCumulativeTimeLimitArrChange}
          onRoundInputChange={handleRoundInputArrChange}
          eventFormatArr={eventFormatArr}
          cumulativeTimeLimitArr={cumulativeTimeLimitArr}
          roundDataArr={roundDataArr}
          events={events}
        />
      )}
      {page === 2 && (
        <ManageRoundsLength
          numRoundsArr={numRounds}
          onEventFormatChange={handleEventFormatArrChange}
          onCumulativeTimeLimitChange={handleCumulativeTimeLimitArrChange}
          onRoundInputChange={handleRoundInputArrChange}
          eventFormatArr={eventFormatArr}
          cumulativeTimeLimitArr={cumulativeTimeLimitArr}
          roundDataArr={roundDataArr}
          events={events}
        />
      )}
      <Container className="my-5">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto">
            <ContinueButton onClick={prevPage} text="Back" />
          </Col>
          {selectedEvents > 0 && (
            <Col xs="auto">
              <ContinueButton onClick={nextPage} text="Continue" />
            </Col>
          )}
        </Row>
      </Container>
      <br />
    </div>
  );
}
