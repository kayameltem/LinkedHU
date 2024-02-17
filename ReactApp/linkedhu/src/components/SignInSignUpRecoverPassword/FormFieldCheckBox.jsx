import React from 'react'

import Form from 'react-bootstrap/Form'

const FormFieldCheckBox = ({ label, onChange, error }) => {
  return (
	<Form.Group className='mb-3'>
		<Form.Check type='checkbox' label={label} onChange={onChange}/>
		{error ?
		<div className='d-block invalid-feedback'>{error}</div>
		: null}
	</Form.Group>
  )
}

export default FormFieldCheckBox