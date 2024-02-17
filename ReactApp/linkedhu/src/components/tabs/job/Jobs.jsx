import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import CardDesign from "./CardDesign";
import NavbarComp from "../../NavbarComp";
import { NewAnnouncement } from "./NewAnnouncement";

export const Jobs = (props) => {
  const mail = props.userEmail;

  const [jobs, setJobs] = useState();
  

  const getJobsFun = async () => {
    console.log("getJobs inside");
    const data = await axios.post(
      "http://localhost:8080/announcements/getJobDocuments"
    );
    return data;
  };
  //getting all jobs
  useEffect(() => {
    console.log("useeffect inside");
    getJobsFun().then((response) => setJobs(response.data));
  }, []);
  console.log("jobs: ", jobs);
  return (
    <div>
      <NavbarComp />
      <div className="container mt-4">
        <div className="row">
          <NewAnnouncement mail = {mail}/>
          {jobs &&
            jobs.map((index) => (
              <div className="col-lg-6 col-md-6 col-sm-12 my-3  d-flex justify-content-center">
                <CardDesign data={index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
