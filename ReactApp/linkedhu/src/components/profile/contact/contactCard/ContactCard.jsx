import React from "react";
import { Card } from "react-bootstrap";
import ContactModal from "./ContactModal";

const ContactCard = () => {
  return (
    <div>
      <Card>
        <Card.Body className="d-flex  align-items-center row-lg-3 justify-content-center">
          <ContactModal />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContactCard;
