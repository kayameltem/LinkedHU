import React from "react";
import { Card } from "react-bootstrap";
import HobbyModal from "./HobbyModal";

const HobbyCard = () => {
  return (
    <div>
      <Card>
        <Card.Body className="d-flex  align-items-center row-lg-3 justify-content-center">
          <HobbyModal />
        </Card.Body>
      </Card>
    </div>
  );
};

export default HobbyCard;
