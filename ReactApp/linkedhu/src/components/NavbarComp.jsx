import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { render } from "react-dom";
import { Routes, Route, Link } from "react-router-dom";

import { BiLogOut, BiUser, BiSearchAlt2 } from "react-icons/bi";
import { Home } from "./tabs/home/Home";

import SignInSignUpRecoverPassword from './SignInSignUpRecoverPassword/SignInSignUpRecoverPassword';


function NavbarComp({ userEmail, changeUser }) {
  const handleChange = e => {
    const { name, value } = e.target
    setFind({
        ...find,
        [name]: value
    })
}
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/result");
  };

  const openSignInPage = () => {
	setPage(1);
  }

  const openSignUpPage = () => {
	setPage(2);
}

  const [find, setFind] = useState({keyword : ""})
  const [myProfile,setMyProfile] = useState()
  const [page, setPage] = useState(0);

  return (
    <div className = "row">
		<SignInSignUpRecoverPassword initPage={page} changeUser={changeUser}/>
      <Navbar className = "color-nav" expand="lg" sticky = "top">
      {console.log("Keyword", find)}
        <Container fluid>
          <Navbar.Brand href="/home">
            <img
              src= "/assets/images/logo.png"
              height="40"
              className="d-inline-block align-top"
              alt="LinkedHU logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className=" ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
			{userEmail ?
			<>
			<Form className=" d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 txt-search"
                  aria-label="Search"
                  name="keyword" value={find.keyword} onChange={handleChange}
                />
                <Button  className = "btn-search" variant = "btn-search" onClick={goToNextPage}>
                <BiSearchAlt2 style={{color: "white", width: "1.2rem", height: "1.2rem" }} />
                </Button>
              </Form>
			<Nav.Link as={Link} to="/profile">
			<BiUser style={{ color: "white", width: "1.2rem", height: "1.2rem" }} />
			</Nav.Link>
			<Nav.Link as={Link} to="/logout">
			<BiLogOut style={{ color: "white", width: "1.2rem", height: "1.2rem" }} />
			</Nav.Link>
			<NavDropdown style={{color: "white"}} title="Announcements" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/home">
                  Home
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/projects">
                  Projects
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/internship">
                  Internship
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/scholarship">
                  Scholarship
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/jobs">
                  Job Opportunities
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/contact">
                  Contact Us
                </NavDropdown.Item>
              </NavDropdown>
			</>
			:
			<>
			<Nav.Link className='pe-0' as={Link} to="">
			<Button onClick={openSignInPage}>SIGN IN</Button>
			</Nav.Link>
			<Nav.Link className='pe-0' as={Link} to="">
			<Button onClick={openSignUpPage}>SIGN UP</Button>
			</Nav.Link>
			</>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
