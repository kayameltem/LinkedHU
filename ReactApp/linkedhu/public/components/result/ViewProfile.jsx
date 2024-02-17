import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

const ViewProfile = (props) => {
    const [lgShow, setLgShow] = useState(false);
  
    return (
      <>
        <Button onClick={() => setLgShow(true)}>View Profile</Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              View Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>
      </>
    );
  
}

export default ViewProfile