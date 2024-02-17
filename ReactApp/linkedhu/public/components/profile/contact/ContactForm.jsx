import axios from "axios";
import React, { useState} from "react";
import { Button, Form } from "react-bootstrap";
import ContactCard from "./contactCard/ContactCard";

const ContactForm = (props) => {

  const [data, setData] = useState({
    mail: props && props?.mail,
    phoneNumber : props && props?.phoneNumber,
    github: props && props?.githubUrl,
    linkedin: props && props?.linkedinUrl,
    facebook: props && props?.facebookUrl,
    instagram: props && props?.instagramUrl,
    twitter: props && props?.twitterUrl
  });

  console.log("data info: ",data);
  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  };
  const submit = (e) => {
    const result = {
      user: {
          phoneNumber: data.phoneNumber,
          mail: data.mail,
          github: data.githubUrl,
          linkedin: data.linkedinUrl,
          facebook: data.facebookUrl,
          instagram: data.instagramUrl,
          twitter: data.twitterUrl
      },
    };
    console.log("result:", result);
    e.preventDefault();
    axios.post("http://localhost:8080/user/editcontact", result).then((res) =>
      setData({
        phoneNumber: res.data.phoneNumber,
        mail: res.data.mail,
        github: res.data.githubUrl,
        linkedin: res.data.linkedinUrl,
        facebook: res.data.facebookUrl,
        instagram: res.data.instagramUrl,
        twitter: res.data.twitterUrl
      })
    );
    console.log("updated data: ", data);
  };
  
  return (
    <div>
      <Form id="contact-form" onSubmit={(e) => submit(e)}>
        <div className="row justify-content-center">
          <legend> Contact Information</legend>
          <div className="col-lg-5  col-md-6 col-sm-12">
            <Form.Group className="mb-3" controlId="contact-form-phone-number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={(e) => handle(e)}
                type="phone"
                id = "phoneNumber"
                value = {data.phoneNumber}
                placeholder="Enter your phone number"
              />
            </Form.Group>
          </div>

          <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-12">
            <Form.Group className="mb-3" controlId="contact-form-email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control disabled type="email" id = "mail" value = {data.mail} placeholder="Enter your email" />
            </Form.Group>
          </div>
          <div className="row justify-content-center">
            <legend> Social Accounts</legend>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <Form.Group className="mb-3" controlId="form-phone-number2">
                <Form.Label>LinkedIN</Form.Label>
                <Form.Control
                  onChange={(e) => handle(e)}
                  type="socialAccount"
                  id = "linkedin"
                  value = {data.linkedin}
                  placeholder="Your LinkedIN Account"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contact-form-instagram">
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  onChange={(e) => handle(e)}
                  type="socailAccount"
                  id = "instagram"
                  value = {data.instagram}
                  placeholder="Your Instagram Account"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contact-form-twitter">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  onChange={(e) => handle(e)}
                  type="socialAccount"
                  id = "twitter"
                  value = {data.twitter}
                  placeholder="Your Twitter Account"
                />
              </Form.Group>
            </div>
            <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-12">
              <Form.Group className="mb-3" controlId="contact-form-github">
                <Form.Label>GitHUB</Form.Label>
                <Form.Control
                  onChange={(e) => handle(e)}
                  type="socialAccount"
                  id = "github"
                  value = {data.github}
                  placeholder="Your GitHUB Account"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contact-form-facebook">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  onChange={(e) => handle(e)}
                  type="socialAccount"
                  id = "facebook"
                  value = {data.facebook}
                  placeholder="Your Facebook Account"
                />
              </Form.Group>
            </div>

            <Button className="col-lg-2" type="submit" variant="secondary">
              Edit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
