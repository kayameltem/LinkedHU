import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";

export const NewAnnouncement = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setFeedback("");
    setData({
      title: "",
      type: "",
      shortDescription: "",
      longDescription: "",
      startDate: "",
      endDate: "",
      supervisor: "",
      profession: "",
    });
  };
  const handleShow = () => setShow(true);
  const [feedback, setFeedback] = useState("");
  const [data, setData] = useState({
    title: "",
    type: "",
    shortDescription: "",
    longDescription: "",
    startDate: "",
    endDate: "",
    supervisor: "",
    profession: "",
  });

  const disabled =
    data.title &&
    data.type &&
    data.shortDescription &&
    data.longDescription &&
    data.startDate &&
    data.endDate &&
    data.supervisor &&
    data.profession;

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  };
  const submit = (e) => {
    const result = {
      project: {
        type: data.type,
        title: data.title,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        startDate: data.startDate,
        endDate: data.endDate,
        owner: props.mail,
        supervisor: data.supervisor,
        profession: data.profession,
      },
    };
    console.log("result:", result);
    e.preventDefault();
    axios
      .post("http://localhost:8080/project/createProject", result)
      .then((res) => setFeedback(res.data));
  };
  console.log("feedback: ", feedback);
  return (
    <div className="col-lg-6 col-md-12 col-sm-12 my-3  d-flex justify-content-center">
      <Card style={{ width: "30rem", height: "20rem" }}>
        <Card.Body className="d-flex  align-items-center justify-content-center">
          <div style={{ width: "25rem" }}>
            <Card.Title>New Announcement</Card.Title>
            <Card.Text>
              You can add a new announcement here. Click on the button.
            </Card.Text>
            <Button variant="primary" onClick={handleShow}>
              Add an announcement
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="projectForm" onSubmit={(e) => submit(e)}>
            <div className="row">
              <div className="col-lg-5 offset-lg-1 col-sm-12 col-md-12">
                <Form.Group className="mb-3" controlId="projectFormTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(e) => handle(e)}
                    id="title"
                    type="text"
                    placeholder="Enter the announcement title"
                  />
                </Form.Group>
              </div>
              <div className="col-lg-5 col-sm-12 col-md-12">
                <Form.Group className="mb-3" controlId="projectFormType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    onChange={(e) => handle(e)}
                    id="type"
                    type="text"
                    placeholder="Example: Long Term"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-10 offset-lg-1">
                <Form.Group
                  className="mb-3"
                  controlId="projectFormShortDescription"
                >
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    onChange={(e) => handle(e)}
                    id="shortDescription"
                    type="text"
                    placeholder="Enter the short description"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="projectFormLongDescription"
                >
                  <Form.Label>Full Description</Form.Label>
                  <Form.Control
                    onChange={(e) => handle(e)}
                    id="longDescription"
                    type="text"
                    placeholder="Enter the announcement title"
                    as="textarea"
                    rows={10}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-lg-5 offset-lg-1 col-md-5 col-sm-5">
                <Form.Group className="mb-3" controlId="projectFormSupervisor">
                  <Form.Label>Supervisor</Form.Label>
                  <Form.Control
                    onChange={(e) => handle(e)}
                    id="supervisor"
                    type="text"
                  />
                </Form.Group>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5">
                <Form.Group className="mb-3" controlId="projectFormProfession">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    onChange={(e) => handle(e)}
                    id="profession"
                    type="text"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-lg-3 offset-lg-1  col-md-5 col-sm-5">
                <Form.Group className="mb-3" controlId="projectFormStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    onChange={(e) => handle(e)}
                    id="startDate"
                    type="date"
                  />
                </Form.Group>
                <Button type="submit" disabled={!disabled}>
                  Add the new announcement
                </Button>
              </div>
              <div className="col-lg-3 col-md-5 col-sm-5">
                <Form.Group className="mb-3" controlId="projectFormEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    onChange={(e) => handle(e)}
                    id="endDate"
                    type="date"
                  />
                </Form.Group>
              </div>
              {feedback !== "" ? (
                <div className="row pt-5 ">
                  {" "}
                  <span>
                    <Alert key="success" variant="success">
                      The announcement is successfully added.
                    </Alert>
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewAnnouncement;
