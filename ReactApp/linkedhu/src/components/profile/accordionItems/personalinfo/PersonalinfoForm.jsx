import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Figure, Form } from "react-bootstrap";

const PersonalinfoForm = () => {

  return (
    <Form id="personal-info-form">
      <div className="row">
        <Figure className="d-flex  align-items-center justify-content-center" >
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile" />

          </div>
          <Figure.Image
            width={100}
            height={100}
            rounded
            alt="Profile Picture"
            src="#!"
          />

        </Figure>

      </div>
      <div className="row justify-content-center">
        {
          <div className="col-lg-5  col-md-6 col-sm-12">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNationalID">
              <Form.Label>National ID</Form.Label>
              <Form.Control placeholder="National ID" disabled />
              <Form.Text className="text-muted">
                We'll never share your national ID with anyone else.
              </Form.Text>
            </Form.Group>

          </div>
        }
        <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-12">
          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="surname" placeholder="Enter your surname" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control type="date" placeholder="Date of birth" />
          </Form.Group>
        </div>
        <div className="row justify-content-center">
          <Button className="col-lg-2" variant="secondary" >Edit</Button>
        </div>
      </div>

    </Form>

  );
};

export default PersonalinfoForm;
