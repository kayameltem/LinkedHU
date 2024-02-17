import React, { useState } from 'react'

import Modal from 'react-bootstrap/Modal';

const AnnouncementContent = ( {initShow} ) => {
	const changeShow = (val) => {
		setValues((prevState) => ({ ...prevState, show: val }))
	}

	const [{ show }, setValues] = useState({
		show: initShow
	});

	return (
		<Modal centered show={show} onHide={() => changeShow(false)}>
			<Modal.Header closeButton>
				Modal
			</Modal.Header>
			<Modal.Body>
			</Modal.Body>
		</Modal>
  	)
}

export default AnnouncementContent