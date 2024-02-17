import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import PersonalinfoForm from './accordionItems/personalinfo/PersonalinfoForm'

const TabbedPane = (props) => {

    const data = props.data;
    return (
    <div>
    {( data === null ||data === undefined) ? <></> : <div>
    <Tabs
      defaultActiveKey="personalInfo"
      id="uncontrolled-tab-example"
      className="mb-4"
    >
      <Tab eventKey="personalInfo" title="Personal Information">
        <PersonalinfoForm
          mydata = {data}
        />
        </Tab> 
        
{/*         <Tab
        eventKey="academicInfo-graduate"
        title="Academic Information-graduate"
      >
        <Graduate
          mail={data.mail}
          studentId={data.studentId}
          gpa={data.gpa}
          title={data.title}
          degree={data.degree}
        />
      </Tab>
      <Tab
        eventKey="academicInfo-undergraduate"
        title="Academic Information-undergraduate"
      >
        <Undergraduate
          mail={data.mail}
          studentId={data.studentId}
          gpa={data.gpa}
          isExchange={data.isExchange}
        />
      </Tab>
      <Tab
        eventKey="academicInfo-academic"
        title="Academic Information-academic"
      >
        <Academic
          mail={data.mail}
          title={data.title}
          profession={data.profession}
        />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <ContactForm
          phoneNumber={data.phoneNumber}
          mail={data.mail}
          github={data.githubUrl}
          linkedin={data.linkedinUrl}
          facebook={data.facebookUrl}
          instagram={data.instagramUrl}
          twitter={data.twitterUrl}
        />
      </Tab>
      <Tab eventKey="accountSettings" title="Account Settings">
        <AccountSettings mail={data.mail} />
      </Tab> */}
    </Tabs>
    </div>}</div>
  )
}

export default TabbedPane