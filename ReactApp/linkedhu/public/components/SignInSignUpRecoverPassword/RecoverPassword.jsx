import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { faEnvelope, faPaperPlane, faKey, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import FormFieldText from './FormFieldText'

import axios from 'axios';

const ForgotPassword = ({ goBack }) => {
	const tryResetPassword = async () => {
		const emailData = {'mail': email};
		const data  = await axios.post('http://localhost:8080/user/forgotpassword', emailData);
		goBack();
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		let isError = false;

		if(email) {
			if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
				setErrors((prevState) => ({ ...prevState, emailErr: 'Please enter a valid e-mail adress.' }))
				isError = true;
			} else {
				setErrors((prevState) => ({ ...prevState, emailErr: '' }))
			}
		} else {
			setErrors((prevState) => ({ ...prevState, emailErr: 'Please enter an e-mail.' }))
			isError = true;
		}

		if(!isError) {
			tryResetPassword();
		}
	}

	const [{ email }, setValues] = useState({
		email: ''
	});

	const [{emailErr }, setErrors] = useState({
		emailErr: ''
	})

	return (
		<div>
			<Form noValidate className = 'rounded p-3 col-md-3 w-100'>
				<h5 className='text-center fw-bold'>WELCOME BACK TO<br></br>LINKED HU</h5>
				<p className='text-center fw-light'>To recover your account, please enter your e-mail below:</p>
				<FormFieldText prependIcon={faEnvelope} type='text' value='' placeholder='E-mail' onChange={({ target }) => setValues((prevState) => ({ ...prevState, email: target.value }))} error={emailErr}/>
				<Button variant='primary' className='w-100 mb-3' onClick={handleSubmit}>RECOVER</Button>
				<div className='text-center'><span className='fw-light'>Misclicked?</span> <span className='text-primary fw-bold' role='button' onClick={goBack}>Go Back!</span></div>
			</Form>
		</div>
  	)
}

export default ForgotPassword