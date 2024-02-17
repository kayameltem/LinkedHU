import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavbarComp from '../../NavbarComp'
import CardDesign from './CardDesign';
import NewAnnouncement from './NewAnnouncement';


export const Internship = (props) => {
  const mail = props.userEmail;

  const [internships, setInternships] = useState();
  

  const getInternshipsFun = async () => {
    const data = await axios.post(
      "http://localhost:8080/announcements/getInternshipDocuments"
    );
    return data;
  };
  //getting all jobs
  useEffect(() => {
    console.log("useeffect inside");
    getInternshipsFun().then((response) => setInternships(response.data));
  }, []);
  return (
    <div>
      <NavbarComp userEmail={props.userEmail} changeUser={props.changeUser} />
      <div className="container mt-4">
        <div className="row">
        {props.userType === 'ADMIN' ? <></> : <NewAnnouncement mail = {mail}/>}
          {internships &&
            internships.map((index) => (
              <div className="col-lg-6 col-md-6 col-sm-12 my-3  d-flex justify-content-center">
                <CardDesign data={index} userEmail={mail} userType={props.userType}/>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
