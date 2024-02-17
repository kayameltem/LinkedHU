import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AccountSettings = (props) => {
  const mail = props?.mail;
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [deleteAccount, setDeleteAccount] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(0);
  const [passwordAlert, setPasswordAlert] = useState(0);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleDelete = (e) => {
    setDeleteAccount(e.target.value);
    console.log(deleteAccount);
  };

  const submitDelete = (e) => {
    const result = {
      user: {
        mail: mail,
        password: password,
      },
    };
    console.log("result:", result);
    e.preventDefault();
    axios
      .post("http://localhost:8080/user/deleteaccount", result)
      .then((res) => setDeleteAlert(res.data));

      navigate("/logout",props.changeUser(''));  
  };

  const changePassword = (e) => {
    const result = {
      mail: mail,
      password: password,
    };
    console.log("result:", result);
    e.preventDefault();
    axios
      .post("http://localhost:8080/user/changepassword", result)
      .then((res) => setPasswordAlert(res.data));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-md-10 col-sm-10 ">
          <legend>Change Password</legend>
          <Form onSubmit={(e) => changePassword(e)}>
            <Form.Group className="mb-3" controlId="validatePassword">
              <Form.Label>New password</Form.Label>
              <Form.Control
                onChange={(e) => handlePassword(e)}
                id="password"
                type="password"
                placeholder="Enter your new password"
              />
            </Form.Group>
            <Button type="submit">Change Password</Button>
            <div className="row pt-5">
              {passwordAlert ? (
                <Alert variant="success">
                  {" "}
                  <p> Your password has been changed.</p>{" "}
                </Alert>
              ) : (
                <></>
              )}
            </div>
          </Form>
        </div>

        <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-12">
          <legend>Delete Account</legend>
          <Form onSubmit={(e) => submitDelete(e)}>
            <Form.Group className="mb-3" controlId="ValidateDeleteAccount">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => handleDelete(e)}
                type="password"
                id="delete"
                placeholder="Enter your password for validation"
              />
            </Form.Group>
            <Button type="submit">Delete Account</Button>
            <div className="row pt-5">
              {deleteAlert ? (
                <Alert variant="success">
                  {" "}
                  <p> Your account is sucessfully deleted.</p>{" "}
                </Alert>
              ) : (
                <></>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
