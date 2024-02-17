import { Button } from "bootstrap";
import React from "react";
import { Accordion, Form, Nav, Navbar } from "react-bootstrap";
import SidebarComp from "./SidebarComp";
import '../profile/profile.css'
import PersonalinfoForm from "../profile/accordionItems/personalinfo/PersonalinfoForm";
import EducationForm from "../profile/accordionItems/education/EducationForm";
import ContactForm from "./contact/ContactForm";
import HobbiesForm from "./accordionItems/hobbies/HobbiesForm";

export const Profile = () => {
  return (
    <div>
      <div className="row">
      <SidebarComp />{/*style={{ width: "100%" }}*/}
        <div className = "col-lg-10 col-md-12 col-sm-12" >
          <Accordion defaultActiveKey={["0", "1", "2", "3", "4"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header id="personal">
                Personal Information
              </Accordion.Header>
              <Accordion.Body>
               <PersonalinfoForm/>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header id="education">Education</Accordion.Header>
              <Accordion.Body>
                <EducationForm/>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header id="userContact">Contact</Accordion.Header>
              <Accordion.Body>
                <ContactForm/>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header id="experience">Experience</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header id="hobbies">Hobbies</Accordion.Header>
              <Accordion.Body>
                <HobbiesForm/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
  </div> 
    </div>
  );
};
