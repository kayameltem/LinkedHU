import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ContactModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add a new address
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Address Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className = "row">
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address Title</Form.Label>
              <Form.Control type="address" placeholder="Exp: Home" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ContactForm.ControlTextarea">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" aria-label="With textarea" />
            </Form.Group>
            <div className = "col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control type="input" placeholder="Enter the City" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control type="input" placeholder="Enter the Postal Code" />
            </Form.Group>
            </div>
            <div className = "col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Country</Form.Label>
              <Form.Control type="input" placeholder="Enter the Country" />
            </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Visible" />
              <Form.Text className="text-muted">
                The Address will be visible to anyone.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactModal;
