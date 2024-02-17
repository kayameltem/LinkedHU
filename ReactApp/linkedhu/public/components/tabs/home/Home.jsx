import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import NavbarComp from "../../NavbarComp";
import CarouselComp from "./CarouselComp";
import Contact from "./Contact";

export const Home = (props) => {
  return (
    <div className="Container">
      <div className="row justify-content-center">
        <div className="col-12">
          <NavbarComp userEmail={props.userEmail} changeUser={props.changeUser}/>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 p-5">
          <CarouselComp />
        
       
        </div>
        <div className="col-12 mb-5">
          <legend className="ps-5 pe-5">
            Welcome to Darth Ceng! Here is the platform that you can find any
            kind of announcements and news instantaneously!{" "}
          </legend>
          </div>
        <div className="col-12">
          <Contact />
        </div>
      </div>
    </div>
  );
};