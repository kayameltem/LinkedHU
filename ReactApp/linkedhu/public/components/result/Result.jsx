import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import NavbarComp from "../NavbarComp";
import ResultCard from "./ResultCard";
import axios from "axios";

const Result = (props) => {
  const [data, setData] = useState();
  const { state } = useLocation();
  console.log("state: ", state);

  const myProfileFun = async () => {
    if(state === null) {
      setData([]);
      return;}
    const profileKey = { searchKey: state };

    const data = await axios.post(
      `http://localhost:8080/user/find`, null , {params: profileKey}
    );
    return data;
  };

  useEffect(() => {
    if (state !== null){
    myProfileFun().then((response) => setData(response.data));
  }},[state]);


  return (

    
    <div className="container-fluid pb-5 ">
        <div className="row">
        <NavbarComp userEmail={props.userEmail} changeUser={props.changeUser} />
        {(state === null || data === undefined || !Object.keys(data).length || data ===null ) ? (
          <div className="col-12 ps-5 pe-5 pt-5">
            {" "}
            <Alert variant="danger">
              No Results.
            </Alert>{" "}
          </div>
        ) :

          (data && data.map((index) => (
            <div className="col-4 d-flex justify-content-center">
              <ResultCard
                name={index.name}
                surname={index.surname}
                title={index.title}
                image={index.image}
                number={index.phoneNumber}
                mail={index.mail}
                facebook={index.facebookUrl}
                twitter={index.twitterUrl}
                instagram={index.instagramUrl}
                github={index.githubUrl}
                linkedin={index.linkedinUrl}
              />
              </div>
              )))}
              </div>
            </div>
          );
        };
        

export default Result;
