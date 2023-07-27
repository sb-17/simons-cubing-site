import { Button } from "react-bootstrap";

export default function EventCard(props) {
  return (
    <div className="text-center">
      <Button
        variant="primary"
        size="lg"
        style={{ width: "150px" }}
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    </div>
  );
}
