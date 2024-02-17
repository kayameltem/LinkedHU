import React from "react";
import { Accordion } from "react-bootstrap";
import DeleteUser from "./DeleteUser";
import DownloadUserInfo from "./DownloadUserInfo";
import UserLogs from "./UserLogs";

const AdminPanel = (props) => {
  const mail = props?.mail;
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="deleteUser">
          <Accordion.Header>Delete User</Accordion.Header>
          <Accordion.Body>
            <DeleteUser mail={mail} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="downloadUserInfo">
          <Accordion.Header>Download User Information</Accordion.Header>
          <Accordion.Body>
                <div><DownloadUserInfo/></div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="UserLog">
          <Accordion.Header>View User Logs</Accordion.Header>
          <Accordion.Body>
            <UserLogs/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AdminPanel;
