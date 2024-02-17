import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import NavbarComp from "../NavbarComp";
import PersonalinfoForm from "./accordionItems/personalinfo/PersonalinfoForm";
import ContactForm from "./contact/ContactForm";
import AccountSettings from "./accordionItems/AccountSettings";
import Undergraduate from "./accordionItems/academicInfo/Undergraduate";
import Graduate from "./accordionItems/academicInfo/Graduate";
import Academic from "./accordionItems/academicInfo/Academic";
import axios from "axios";
import TabbedPane from "./TabbedPane";
import AdminPanel from "./accordionItems/adminPanel/AdminPanel";

const Profile = (props) => {
  const [email, setEmail] = useState(
    props.userEmail
  ); /* useState(props.userEmail); */

  const userType = props?.userType;

  const [data, setData] = useState();
  console.log("here is mail:", email);
  // const profileKey = { user: { mail: email } };
  const getProfileFun = async (e) => {
    e.preventDefault();
    console.log("what is here", email);
    if (email !== null || email !== undefined) {
      const apiData = await axios.post("http://localhost:8080/user/fetchUser", {
        user: { mail: email },
      });
      console.log("api data is here", apiData);
    }
  };

  useEffect(() => {
    
    console.log("here is useeffect");
    if (email !== null || email !== undefined) {
      axios
        .post("http://localhost:8080/user/fetchUser", { user: { mail: email } })
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  console.log("here is our final data", data);

  // console.log("profileKey: ", profileKey);

  /*  useEffect(() => {
    console.log('is there any data',profileKey)
  const apiData =   axios.post("http://localhost:8080/user/fetchUser", profileKey)
      .then((response) => setData(response.data));
  },[email]);
  console.log("here is mail:", email, "\nhere is data", data); */

  return (
    <div className="row">
      <NavbarComp userEmail={props.userEmail} changeUser={props.changeUser} />
      {data === null || data === undefined ? (
        <></>
      ) : (
        <div>
          {" "}
          <Tabs
            defaultActiveKey="personalInfo"
            id="uncontrolled-tab-example"
            className="mb-4"
          >
            <Tab eventKey="personalInfo" title="Personal Information">
              <PersonalinfoForm
                mail={data.mail}
                name={data.name}
				nationalId={data.nationalId}
                surname={data.surname}
                birthdate={data.birthdate}
                type={data.type}
              />
            </Tab>
            {userType === "GRADUATE" ? (
              <Tab
                eventKey="academicInfo-graduate"
                title="Academic Information"
              >
                <Graduate
                  mail={data.mail}
                  studentId={data.studentId}
                  title={data.title}
                  degree={data.degree}
                />
              </Tab>
            ) : (
              <></>
            )}
            {userType === "UNDERGRADUATE" ? (
              <Tab
                eventKey="academicInfo-undergraduate"
                title="Academic Information"
              >
                <Undergraduate
                  mail={data.mail}
                  studentId={data.studentId}
                />
              </Tab>
            ) : (
              <></>
            )}
            {userType === "ACADEMICIAN" ? (
              <Tab
                eventKey="academicInfo-academic"
                title="Academic Information"
              >
                <Academic
                  mail={data.mail}
                  title={data.title}
                  profession={data.profession}
                />
              </Tab>
            ) : (
              <></>
            )}
            {userType === "ADMIN" ? (
              <Tab eventKey="admin-panel" title="AdminPanel">
                <AdminPanel  mail={data.mail}/>
              </Tab>
            ) : (
              <></>
            )}
            <Tab eventKey="contact" title="Contact">
              <ContactForm
                phoneNumber={data.phoneNumber}
                mail={data.mail}
                github={data.githubUrl}
                linkedin={data.linkedinUrl}
                facebook={data.facebookUrl}
                instagram={data.instagramUrl}
                twitter={data.twitterUrl}
              />
            </Tab>
            <Tab eventKey="accountSettings" title="Account Settings">
              <AccountSettings mail={data.mail} changeUser={props.changeUser} />
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Profile;
