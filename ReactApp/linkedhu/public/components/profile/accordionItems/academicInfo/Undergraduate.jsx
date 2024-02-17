import React from "react";
import { Button, Form } from "react-bootstrap";

const undergraduate = (props) => {

  const mail = props.mail; 
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5  col-md-6 col-sm-12">
          <Form.Group className="mb-3" controlId="undergraduateStudentId">
            <Form.Label>Student ID</Form.Label>
            <Form.Control type="studentID" value = {props.studentId} placeholder="student ID" disabled />
          </Form.Group>
        </div>

      </div>
    </div>
  );
};

export default undergraduate;
