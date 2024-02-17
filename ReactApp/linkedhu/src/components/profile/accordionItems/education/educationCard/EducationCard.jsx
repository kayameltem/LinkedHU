import React from "react";
import {Card} from "react-bootstrap";
import EducationModal from "../../education/EducationModal";

const EducationCard = () => {
  return (
    <div>
      <Card>
        <Card.Body className= "d-flex  align-items-center row-lg-3 justify-content-center">
          <EducationModal/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EducationCard;
