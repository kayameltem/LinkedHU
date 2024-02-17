import React from 'react'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FormField = ({ prependIcon, appendIcon, type, value, placeholder, onChange, onClick, requirements, error }) => {
  	return (
		<Form.Group className='mb-3'>
			<InputGroup hasValidation={error || requirements ? true : false}>
				<InputGroup.Text><FontAwesomeIcon icon={prependIcon}/></InputGroup.Text>
				<Form.Control type={type} defaultValue={value} placeholder={placeholder} onChange={onChange}/>
				{appendIcon ?
				<InputGroup.Text onClick={onClick}><FontAwesomeIcon icon={appendIcon}/></InputGroup.Text>
				: null}
				{requirements ?
				<div className='d-block text-primary valid-feedback'>{requirements}</div>
				: null}
				{error ?
				<div className='d-block invalid-feedback'>{error}</div>
				: null}
			</InputGroup>
		</Form.Group>
  	)
}

export default FormField