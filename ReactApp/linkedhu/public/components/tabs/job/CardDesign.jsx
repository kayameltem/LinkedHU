import React, { useState } from "react";
import { Card, Button, Modal, Alert } from "react-bootstrap";

import { BiEdit, BiTrash } from "react-icons/bi";

import axios from "axios";

const CardDesign = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [deleted, setDeleted] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applicants, setApplicants] = useState();
  const handleClose = () => {
    setShow(false);
	setDeleted(false);
	setApplied(false);
  }

  const applyAnnouncement = (e) => {
	e.preventDefault();

	const announcementData = {'application': {'announcementId': props?.data?.announcementId}, 'mail': props?.userEmail};
	if(props.data.announcementId !== null || props.data.announcementId !== undefined)
	{
		const data = axios.post('http://localhost:8080/announcements/apply', announcementData);
	}
  }

const editAnnouncement = (e) => {
	e.preventDefault();

	const announcementData = {'job': {'announcementId': props?.data?.announcementId}, 'endDate': props?.data?.endDate};
	if(props.data.announcementId !== null || props.data.announcementId !== undefined)
	{
		const data = axios.post('http://localhost:8080/job/updateJob', announcementData);
	}
}

const deleteAnnouncement = (e) => {
	e.preventDefault();

	const announcementData = {'job': {'announcementId': props?.data?.announcementId}};
	console.log(announcementData);
	if(props.data.announcementId !== null || props.data.announcementId !== undefined)
	{
		const data = axios.post('http://localhost:8080/job/deleteJob', announcementData);
	}
}

const showApplicants = (e) => {
  e.preventDefault();
  const announcement = {"announcement": { "announcementId" : props.data.announcementId}}
  console.log("announcement id: ", props.data.announcementId);
  const x = axios.post("http://localhost:8080/announcements/showApplicants", announcement).then(response => setApplicants(response.data));
}

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
        <Modal.Body>
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
            <p><b>Job Type:</b> {props.data.type}</p>
            <p><b>Start Date:</b> {props.data.startDate}</p>
            <p><b>Due Date:</b> {props.data.endDate}</p>

            {props.data.owner === props.userEmail ?
			<div>
				<Button onClick={editAnnouncement} className="mx-2" style={{ background: "#008080" }}>
					<BiEdit  style={{ color: "white", width: "2rem", height: "2rem" }} />
				</Button>
				<Button onClick={deleteAnnouncement} className="mx-2" style={{ background: "#008080" }}>
					<BiTrash style={{ color: "white", width: "2rem", height: "2rem" }} />
				</Button>
				<Button onClick={showApplicants} className="mx-2" style={{ height: "3rem", background: "#008080" }}>
					Show Applicants
				</Button>
        {deleted ? <div className = "pt-5"><Alert>Announcement is successfully deleted.</Alert></div> : <></>}
			</div>
			: <></>}
        {props.userType === "UNDERGRADUATE" || props.userType === "GRADUATE" &&  props.data.owner !== props.userEmail ? (<div><Button onClick={applyAnnouncement} className='mx-2' variant="primary" style={{ height: "3rem", background: "#008080" }}>
			Apply
			</Button>
			{applied ?<div className = "pt-5"> <Alert>Application is successfully completed.</Alert> </div>: <></>} </div>)
			: <></>}
          
          </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardDesign;
