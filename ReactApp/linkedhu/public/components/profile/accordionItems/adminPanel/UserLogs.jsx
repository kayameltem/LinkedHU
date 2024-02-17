import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";

const UserLog = () => {
  const [data, setData] = useState();
  const [find, setFind] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    /*      const x = axios.post("http://localhost:8080/admin/getLog" , null,{params: {mail: find}}).then(response => setData(response.data));
        console.log("x",x);
        console.log("hello get request", data); */

    const element = document.createElement("a");

    // data format ["string"];
    const file = new Blob(data, {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="row">
      <div className="col-lg-4 col-md-10 col-sm-10">
        <Form onSubmit={handleClick} className=" d-flex">
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
      </div>
    </div>
  );
};

export default UserLog;
