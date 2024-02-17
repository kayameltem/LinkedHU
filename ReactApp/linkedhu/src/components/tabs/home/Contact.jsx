import React from "react";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";
const Contact = () => {
  return (
      <div className="row footer ">
        <div className="col-12 text-center">
          <div className="mt-4 mb-4 " style={{ fontSize: "20px" }}>
            <b>Contact Us</b>
          </div>

          <div className="col-12 mb-5">
            {" "}
            <a href="https://twitter.com">
              {" "}
              <BsTwitter
                className="mx-2"
                style={{ width: "2rem", height: "2rem", color: "#49a1eb"}}
              />
            </a>
            <a href="https://www.instagram.com">
              <BsInstagram
                className="mx-2"
                style={{ width: "2rem", height: "2rem", color: "black" }}
              />
            </a>
            <a href="https://www.facebook.com">
              <BsFacebook
                className="mx-2"
                style={{ width: "2rem", height: "2rem", color: "#4968ad" }}
              />
            </a>
          </div>
        </div>
      </div>
  );
};

export default Contact;
