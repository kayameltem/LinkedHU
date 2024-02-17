import React from 'react'
import {Container, Nav, Navbar } from 'react-bootstrap'

const SidebarComp = () => {
  return (
    <div className = "col-lg-2 col-md-0 col-sm-0" >  
    <Navbar >
    <Nav defaultActiveKey="/home" className="flex-column" >

      <Nav.Link href="#personal">Personal Information</Nav.Link>
      <Nav.Link href="#education">Education</Nav.Link>
      <Nav.Link href="#userContact">Contact Information</Nav.Link>
      <Nav.Link href="#experience">Experience</Nav.Link>
      <Nav.Link href="#hobbies">Hobbies</Nav.Link>
      {/*<Nav.Link eventKey="link-1">Link</Nav.Link>
    <Nav.Link eventKey="link-2">Link</Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
      Disabled
</Nav.Link> */}

    </Nav>
  </Navbar >
    </div>
  )
}

export default SidebarComp