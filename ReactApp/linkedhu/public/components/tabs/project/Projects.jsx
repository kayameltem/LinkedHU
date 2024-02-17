import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavbarComp from '../../NavbarComp'
import CardDesign from './CardDesign';
import NewAnnouncement from './NewAnnouncement';

export const Projects = (props) => {
  const mail = props.userEmail;

  const [projects, setProjects] = useState();
  

  const getProjectsFun = async () => {
    console.log("getJobs inside");
    const data = await axios.post(
      "http://localhost:8080/announcements/getProjectDocuments"
    );
    return data;
  };
  //getting all projects
  useEffect(() => {
    console.log("useeffect inside");
    getProjectsFun().then((response) => setProjects(response.data));
  }, []);
  console.log("jobs: ",projects);
  return (
    <div>
      <NavbarComp userEmail={props.userEmail} changeUser={props.changeUser} />
      <div className="container mt-4">
        <div className="row">
        {props.userType === 'UNDERGRADUATE' ? <NewAnnouncement mail = {mail}/> : <></>}
          {projects &&
            projects.map((index) => (
              <div className="col-lg-6 col-md-6 col-sm-12 my-3  d-flex justify-content-center">
                <CardDesign data={index} userEmail={mail} userType={props.userType}/>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
