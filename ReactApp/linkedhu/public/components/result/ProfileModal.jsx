import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  BsFacebook,
  BsFillAwardFill,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

const ProfileModal = (props) => {
  const [lgShow, setLgShow] = useState(false);
  return (
    <div>
      <Button variant="primary" onClick={() => setLgShow(true)}>
        View Profile
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex  align-items-center justify-content-center">
          <div className="row">
            <div className="col text-center">
              <img
                className="imgResult"
                style={{ width: "12rem", height: "12rem" }}
                alt="Display Picture"
                src= "/assets/images/user.png"    
              />
              <Modal.Title>
                {props.name} {props.surname}
              </Modal.Title>
              <p > {props.title}</p>
              <a  href = {props.facebook} className = "facebook">
                {" "}
                <BsFacebook
                  className="mx-1"
                  style={{ color: "black", width: "1.5rem", height: "1.5rem" }}
                  target="_blank"
                />
                </a>
                <a href = {props.instagram} className = "instagram">
                <BsInstagram
                  className="mx-1"
                  style={{ color: "black", width: "1.5rem", height: "1.5rem" }}
                  target="_blank"
                />
                </a>
                <a href = {props.twitter}>
                <BsTwitter
                  className="mx-1"
                  style={{ color: "black", width: "1.5rem", height: "1.5rem" }}
                />
                </a>
                <a  href = {props.github}>
                <BsGithub
                  className="mx-1"
                  style={{ color: "black", width: "1.5rem", height: "1.5rem" }}
                />
                </a>
                <a href = {props.linkedin}>
                <BsLinkedin
                  className="mx-1"
                  style={{ color: "black", width: "1.5rem", height: "1.5rem" }}
                />
                </a>
            </div>
            <div className="row">
              <Modal.Title>Contact</Modal.Title>
                <hr />

              <p> Phone Number: {props.number}</p>
              <p> Mail: {props.mail}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileModal;
