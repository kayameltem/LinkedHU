import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const ResultCard = (props) => {
  return (
    <div>
      <Card style={{ width: "20rem", height: "22rem" }}>
        <Card.Img
          className="imgResult"
          style={{ width: "12rem", height: "12rem" }}
          alt="Display Picture"
          src= "/assets/images/user.png"        
        />
        <Card.Body>
          <Card.Title>
            {props.name} {props.surname}
          </Card.Title>
          <ProfileModal
            name={props.name}
            surname={props.surname}
            title={props.title}
            image={props.image}
            number={props.number}
            mail={props.mail}
            facebook = "https://www.facebook.com"
            twitter = "https://twitter.com"
            instagram = "https://www.instagram.com"
            github = "https://github.com"
            linkedin = "https://www.linkedin.com"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResultCard;
