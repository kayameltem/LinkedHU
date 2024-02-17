import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import FormFieldText from './FormFieldText';
import FormFieldCheckBox from './FormFieldCheckBox';

import axios from 'axios';

const SignIn = ({ forgotPassword, signUp, onSignIn }) => {
	const [show, setShow] = useState(true);

	const trySignIn = async () => {
		const signInData = {'user': {'mail': email, 'password': password}};
		let data  = await axios.post('http://localhost:8080/user/login', signInData);
		if(data.data.nationalId === null) {
			setErrors((prevState) => ({ ...prevState, mismatchErr: 'Username and password does not match!' }));
		} else {
			onSignIn(email);
			setShow(false);
			setErrors((prevState) => ({ ...prevState, mismatchErr: '' }));
		}
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

		if(password) {
			setErrors((prevState) => ({ ...prevState, passwordErr: '' }))
		} else {
			setErrors((prevState) => ({ ...prevState, passwordErr: 'Please enter a password.' }))
			isError = true;
		}

		if(!isError) {
			trySignIn();
		}
	}

	const [{ email, password, isPasswordVisible, rememberMe }, setValues] = useState({
		email: '',
		password: '',
		isPasswordVisible: false,
		rememberMe: false
	});

	const [{emailErr, passwordErr, mismatchErr}, setErrors] = useState({
		emailErr: '',
		passwordErr: '',
		mismatchErr: ''
	})

	return (
			<div>
				<Modal.Dialog show = {show}>
					<Form noValidate className = 'rounded p-3 col-md-3 w-100'>
						<h5 className='text-center fw-bold'>WELCOME BACK TO<br></br>LINKED HU</h5>
						<FormFieldText prependIcon={faEnvelope} type='text' value='' placeholder='Email' onChange={({ target }) => setValues((prevState) => ({ ...prevState, email: target.value }))} error={emailErr}/>
						<FormFieldText prependIcon={faKey} appendIcon={isPasswordVisible ? faEyeSlash : faEye} type={isPasswordVisible ? 'text' : 'password'} value='' placeholder='Password'
						onChange={({ target }) => setValues((prevState) => ({ ...prevState, password: target.value }))} onClick={() => setValues((prevState) => ({ ...prevState, isPasswordVisible: !isPasswordVisible }))} error={passwordErr}/>
						<div className='d-flex justify-content-between flew-row'>
							<FormFieldCheckBox label='Remember me' onChange={({ target }) => setValues((prevState) => ({ ...prevState, rememberMe: target.checked }))}/>
							<div className='text-center'><span className='text-primary fw-bold' role='button' onClick={forgotPassword}>Forgot Password?</span></div>
						</div>
						<Button variant='primary' className='w-100 mb-3' onClick={handleSubmit}>SIGN IN</Button>
						{mismatchErr ?
						<Alert dismissible variant='danger' onClose={() => setErrors((prevState) => ({ ...prevState, mismatchErr: '' }))}>
							{mismatchErr}
						</Alert>
						: null}
						<div className='text-center'><span className='fw-light'>Don't have an account?</span> <span className='text-primary fw-bold' role='button' onClick={signUp}>Sign Up!</span></div>
					</Form>
				</Modal.Dialog>
			</div>
  	)
}

export default SignIn