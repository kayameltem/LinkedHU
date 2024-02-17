import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

const ExperienceModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div>
        {" "}
        <Button variant="primary" onClick={handleShow}>
          Add a New Experience
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="address" placeholder="Exp: Internship, Part-time" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="ContactForm.ControlTextarea"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} aria-label="With textarea" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
export default ExperienceModal