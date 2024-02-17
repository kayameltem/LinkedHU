import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Card, Form, FormControl, Modal } from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";

const DeleteUser = (props) => {
  const [find, setFind] = useState();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [deleted, setDeleted] = useState(0);
  console.log("find: ", find);
  console.log("changeuser:", props.mail);

  const handleDelete = (e) => {
    e.preventDefault();
    if (user.nationalId !== null) {
    console.log("delete inside: ", {user: { nationalId: user.nationalId }})
    axios
      .post("http://localhost:8080/admin/deleteUser", {
        user: { nationalId: user.nationalId },
      })
      .then((response) => setDeleted(response.data));
    }
  };
  const handleClose = () => {
    setShow(false);
    setFind("");
    setUser({});
    setDeleted(0);
    console.log("close user: ", user);
    console.log("close find:", find);
  };

  const handleShow = (e) => {
    setShow(true);
    e.preventDefault();
    console.log("handle inside find:", find);
    const data = axios
      .post(`http://localhost:8080/admin/findbynationalid`, null, {
        params: { searchKey: find },
      })
      .then((response) => setUser(response.data));
      console.log("response: ", user);
   };

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-10 col-sm-10 ">
          <Form.Label>Enter User National ID:</Form.Label>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-10 col-sm-10 ">
          <Form onSubmit={handleShow} className=" d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 txt-search"
              aria-label="Search"
              value={find}
              onChange={(e) => setFind(e.target.value)}
            />

            <Button
              className="btn-search"
              style={{ background: "#008080" }}
              variant="btn-search"
              type="submit"
            >
              <BiSearchAlt2
                style={{ color: "white", width: "1.2rem", height: "1.2rem" }}
              />
            </Button>
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className = "row justify-content-center">
                    {user?.nationalId !== null ?  (<Card style={{ width: "20rem", height: "22rem" }}>
                <Card.Img
                  className="imgResult"
                  style={{ width: "12rem", height: "12rem" }}
                  alt="Display Picture"
                  src="/assets/images/user.png"
                />
                <Card.Body>
                  <Card.Title>
                          {user?.name} {user?.surname}
                  </Card.Title>
                  <Button variant="primary" onClick={handleDelete}>
                    Delete User
                  </Button>
                </Card.Body>
              </Card>) : (<div><Alert>User is not found.</Alert></div>
              )   }
              
              </div>
            </Modal.Body>
            <div className = "row justify-content-center">
            <div className = "col-lg-6 ">
              {deleted ? (
                <Alert>User is successfully deleted.</Alert>
              ) : (
                <></>
              )}
              </div>
              </div>
              <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
