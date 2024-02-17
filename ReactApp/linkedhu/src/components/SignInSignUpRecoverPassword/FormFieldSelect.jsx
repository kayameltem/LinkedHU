import React from 'react'

import Form from 'react-bootstrap/Form'

const FormFieldSelect = ({ onChange }) => {
  return (
	<Form.Group className='mb-3 w-100'>
		<Form.Select onChange={onChange}>
			<option>Undergraduate</option>
			<option>Graduate</option>
			<option>Academician</option>
		</Form.Select>
	</Form.Group>
  )
}

export default FormFieldSelect