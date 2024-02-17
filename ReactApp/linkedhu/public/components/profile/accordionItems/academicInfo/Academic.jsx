import axios from "axios";
import React, { useState} from "react";
import { Button, Form } from "react-bootstrap";


const Academic = (props) => {

  const [data, setData] = useState({
    mail: props && props?.mail,
    title: props && props?.title,
    profession: props && props?.profession
  });

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  const submit = (e) => {
    const result = {

        mail: data.mail,
        profession: data.profession

    };
    console.log("result:", result);
    e.preventDefault();
    axios.post("http://localhost:8080/user/editprofession", result).then((res) =>
      setData({
        mail: res.data.mail,
        profession: res.data.profession
      })
    );
    console.log("updated data: ", data);
  };

  return (
    <div className="container">
      <Form onSubmit={(e) => submit(e)}>
      <div className="row">
        <div className="col-lg-5  col-md-6 col-sm-12">
          <Form.Group className="mb-3" controlId="academicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="title" value = {data?.title} placeholder="Title" disabled />
          </Form.Group>
          <Form.Group onChange={(e) => handle(e)} className="mb-3" controlId="profession">
            <Form.Label>Profession</Form.Label>
            <Form.Control value = {data?.profession} placeholder = "Example: Artifical Intelligence, Machine Learning, Big Data" as="textarea" rows={4} />
          </Form.Group>
        </div>
      </div>
      <div className="row justify-content-center ">
      <div className="col-12" >
          <Button  variant="secondary" type="submit">Save</Button>
        </div>
    </div>
    </Form>
    </div>
  );
};

export default Academic;
