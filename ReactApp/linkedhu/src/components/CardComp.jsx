import React from "react";
import { Card, Button } from "react-bootstrap";
import CardDesign from "./CardDesign";
const CardComp = () => {
  const data = [
    {
      id: 1,
      author: "Announcement 1",
      description: "dynamic 1",
      lastmodifieddate: "12-dec-2021",
    },
    {
      id: 2,
      author: "Announcement 2",
      description:
        " dynamic 2",
      lastmodifieddate: "17-dec-2005",
    },
    {
      id: 3,
      author: "Announcement3",
      description: "dynamic 3 ",
      lastmodifieddate: "10-sep-2008",
    },
  ];
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 my-3  d-flex justify-content-center">
          <Card style={{ width: "30rem", height: "20rem" }}>
            <Card.Body className="d-flex  align-items-center justify-content-center">
            <div style={{ width: "25rem" }}>
              <Card.Title>Secondary Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Add an announcement</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        {data.map((index) => (
          <div className="col-lg-6 col-md-6 col-sm-12 my-3  d-flex justify-content-center">
            <CardDesign
              author={index.author}
              description={index.description}
              date={index.lastmodifieddate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComp;
