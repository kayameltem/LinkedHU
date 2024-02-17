import React from "react";
import { Button, Form } from "react-bootstrap";

const graduate = (props) => {

  const mail = props.mail;
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5  col-md-6 col-sm-12">
          <Form.Group className="mb-3" controlId="graduateStudentId">
            <Form.Label>Student ID</Form.Label>
            <Form.Control type="studentID" value = {props.studentId} placeholder="student ID" disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="GraduateTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="title"  value = {props.title} disabled />
          </Form.Group>
        </div>
        <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-12">
          <Form.Group className="mb-3" controlId="degree">
            <Form.Label>Degree</Form.Label>
            <Form.Control placeholder="Degree" value = {props.degree} disabled />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default graduate;
