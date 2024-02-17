import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';

const CardDesign = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false);
    };
    console.log("props: ", props);
    return (
      <div>
        <Card style={{ width: "30rem", height: "20rem" }}>
          <Card.Body className="d-flex  align-items-center justify-content-center my-3">
            <div style={{ width: "25rem" }}>
              <Card.Title>{props.data.title}</Card.Title>
              <Card.Text>{props.data.shortDescription}</Card.Text>
              <Button variant="primary" onClick={handleShow}>
                View More
              </Button>
            </div>
          </Card.Body>
  
          <Card.Footer className="text-muted" fixed="bottom">
            Due Date: {props.data.endDate}
          </Card.Footer>
        </Card>
        <Modal show={show} fullscreen={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.data.title}</Modal.Title>
          </Modal.Header>
          <div className="row mt-5">
            <div className="col-lg-10 ms-5">
              <p>
                <b>Author: </b>
                {props.data.ownerName}
              </p>
              <p>
                <b>Announcement Description:</b>
              </p>
              <p>{props.data.longDescription}</p>
              <p><b>Scholarship Type:</b> {props.data.type}</p>
              <p><b>Scholarship Amount: </b> {props.data.worth}</p>
              <p><b>Start Date:</b> {props.data.startDate}</p>
              <p><b>Due Date:</b> {props.data.endDate}</p>
            </div>
          </div>
          <Modal.Body></Modal.Body>
        </Modal>
      </div>
    );
}

export default CardDesign