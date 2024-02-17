import React from "react";
import { Card, Button } from "react-bootstrap";

const CardDesign = (props) => {
  return (
    <div>
      <Card style={{ width: "30rem", height: "20rem" }}>
        <Card.Body className="d-flex  align-items-center justify-content-center my-3">
          <div style={{ width: "25rem" }}>
            <Card.Title>{props.author}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
            <Button variant="primary">View More</Button>
          </div>
        </Card.Body>

        <Card.Footer className="text-muted" fixed="bottom">
          {props.date}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardDesign;
