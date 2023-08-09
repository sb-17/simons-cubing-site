import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

export default function WCAScheduleMaker() {
  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Row>
        <Col className="text-center">
          <Link to="/wca-schedule-maker/create">
            <Button variant="primary" size="lg" style={{ width: "250px" }}>
              Create schedule
            </Button>
          </Link>
        </Col>
        <Col className="text-center">
          <Link to="/wca-schedule-maker/roundlength">
            <Button variant="primary" size="lg" style={{ width: "250px" }}>
              Estimate round length
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
