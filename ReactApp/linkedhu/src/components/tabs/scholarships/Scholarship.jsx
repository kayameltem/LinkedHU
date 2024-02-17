import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarComp from "../../NavbarComp";
import CardDesign from "./CardDesign";
import NewAnnouncement from "./NewAnnouncement";

export const Scholarship = (props) => {
  const mail = props.userEmail;
  const [scholarships, setScholarships] = useState();
  useEffect(() => {



    const getScholarshipsFun = async () => {
      const data = await axios.post(
        "http://localhost:8080/announcements/getScholarshipDocuments"
      );
      return data;
    };
    getScholarshipsFun().then((response) => setScholarships(response.data));
  }, []);

  return (
    <div>
      <NavbarComp sticky="top" />
      <div className="row">
        <NewAnnouncement mail={mail} />
        {scholarships &&
            scholarships.map((index) => (
              <div className="col-lg-6 col-md-6 col-sm-12 my-3  d-flex justify-content-center">
                <CardDesign data={index} />
              </div>
            ))}
      </div>
    </div>
  );
};
