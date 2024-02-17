import { render } from "@testing-library/react";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EducationModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add a new Education
      </Button>


      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Enter Your Education Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row"></div>
          <Form>
            <div className="row">
              <div className="col-lg-12">
                <Form.Select aria-label="Default select example">
                  <option>Select Your Study Degree</option>
                  <option value="1">Bachelor</option>
                  <option value="2">Master</option>
                  <option value="3">PhD</option>
                </Form.Select>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-3" controlId="formBasicUniversity">
                  <Form.Label>University Name</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="Enter your university"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" placeholder="Start Date" />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-3" controlId="formBasicUniversity">
                  <Form.Label>GPA</Form.Label>
                  <Form.Control type="float" placeholder="Enter your GPA" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" placeholder="End Date" />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EducationModal;
