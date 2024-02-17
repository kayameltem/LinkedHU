import { Button } from "react-bootstrap";
import React, { useState} from "react";
import { Figure, Form } from "react-bootstrap";
import axios from "axios";

const PersonalinfoForm = (props) => {
  const mail = props?.mail;
  console.log(" mail: ", mail);

  const [data, setData] = useState({
    mail: props && props?.mail,
    name: props && props?.name,
    surname: props && props?.surname,
	nationalId: props && props?.nationalId,
    birthdate: props && props?.birthdate,
    type: props && props?.type,
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
        mail: data.mail,
        name: data.name,
        surname: data.surname,
		birthdate: data.birthdate,
        type: data.type
      },
    };
    console.log("result:", result);
    e.preventDefault();
    axios.post("http://localhost:8080/user/editprofile", result).then((res) =>
      setData({
        mail: res.data.mail,
        name: res.data.name,
        surname: res.data.surname,
		birthdate: res.data.birthdate,
        type: res.data.type,
      })
    );
    console.log("updated data: ", data);
  };
  // console.log('what is there',props.mydata.data.name)
  return (
    <Form id="personal-info-form" onSubmit={(e) => submit(e)}>
      <div className="row">
        <div className="col-12">
          <Figure className="d-flex  align-items-center justify-content-center">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" />

              <Figure.Image
                width={100}
                height={100}
                rounded
                alt="Profile Picture"
                src="./assets/images/user.png"
              />
            </div>
          </Figure>
        </div>
      </div>
      <div className="row justify-content-center">
        {
          <div className="col-lg-5  col-md-6 col-sm-12">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => handle(e)}
                id="name"
                type="text"
                placeholder="Enter your name"
                value = {data?.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNationalID">
              <Form.Label>National ID</Form.Label>
              <Form.Control
                placeholder="National ID"
                value = {data?.nationalId}
                disabled
              />
              <Form.Text className="text-muted">
                We'll never share your national ID with anyone else.
              </Form.Text>
            </Form.Group>
          </div>
        }
        <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-12">
          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              onChange={(e) => handle(e)}
              id="surname"
              type="text"
              value = {data?.surname}
              placeholder="Enter your surname"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              onChange={(e) => handle(e)}
              id="birthdate"
              type="date"
              value = {data?.birthdate}
              placeholder="Date of birth"
            />
          </Form.Group>
        </div>
        <div className="row justify-content-center">
          <Button className="col-lg-2" type="submit" variant="secondary">
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default PersonalinfoForm;
