import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { faIdCard, faEnvelope, faUser, faKey, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import FormFieldText from './FormFieldText';
import FormFieldCheckBox from './FormFieldCheckBox';
import FormFieldSelect from './FormFieldSelect';

import axios from 'axios';

const SignUp = ({ signUp, onSignUp }) => {
	const trySignUp = async () => {
		let arr = username.split(/\s+/);
		const signUpData = {'user': {'nationalId': id, 'name': arr[0], 'surname': arr[1], 'mail': email, 'password': password}, 'type': userType.toUpperCase()};
		const data  = await axios.post('http://localhost:8080/user/signup', signUpData);
		if(!data.data) {
			setErrors((prevState) => ({ ...prevState, mismatchErr: 'Username and password does not match!' }));
		} else {
			onSignUp(email);
			setErrors((prevState) => ({ ...prevState, mismatchErr: '' }));
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		let isError = false;

		if(id) {
			if(!/^[0-9]{11}$/.test(id)) {
				setErrors((prevState) => ({ ...prevState, idErr: 'Please enter a valid national ID.' }))
				isError = true;
			} else {
				setErrors((prevState) => ({ ...prevState, idErr: '' }))
			}
		} else {
			setErrors((prevState) => ({ ...prevState, idErr: 'Please enter a national ID.' }))
			isError = true;
		}

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

		if(username) {
			let errors = []
			if(!/^[A-Za-z ]+$/.test(username)) {
				errors.push('Contain only letters.');
			}
			if(!/^[A-Za-z]+[ ]+[A-Za-z]+$/.test(username)) {
				errors.push('Must be separated with whitespace into name and surname.');
			}
			if(errors.length !== 0) {
				isError = true;
				setErrors((prevState) => ({ ...prevState, usernameErr:
					<div>Your username does not:
						<ul className='m-0'> {errors.map(error => {
						return (
						  <li key={error}>
							{error}
						  </li>
						)})}
						</ul>
					</div> }))
			} else {
				setErrors((prevState) => ({ ...prevState, usernameErr: '' }))
			}
		} else {
			setErrors((prevState) => ({ ...prevState, usernameErr: 'Please enter a username.' }))
			isError = true;
		}

		if(password) {
			let errors = []
			if(!/^[A-Za-z0-9\.\,\!\?\+\-\_]+$/.test(password)) {
				errors.push('Contain only letters, digits and (.,!?+-_).');
			}
			if(!/[A-Z]+/.test(password)) {
				errors.push('Contain at least 1 capital letter.');
			}
			if(!/[0-9]+/.test(password)) {
				errors.push('Contain at least 1 digit.');
			}
			if(!/[\.\,\!\?\+\-\_]+/.test(password)) {
				errors.push('Contain at least 1 special character from (.,!?+-_).');
			}
			if(!/^.{6,12}$/.test(password)) {
				errors.push('Have a length between 6-12 characters.');
			}
			if(errors.length !== 0) {
				isError = true;
				setErrors((prevState) => ({ ...prevState, passwordErr:
				<div>Your password does not:
					<ul className='m-0'> {errors.map(error => {
					return (
					  <li key={error}>
						{error}
					  </li>
					)})}
					</ul>
				</div> }))
			} else {
				setErrors((prevState) => ({ ...prevState, passwordErr: '' }))
			}
		} else {
			setErrors((prevState) => ({ ...prevState, passwordErr: 'Please enter a password.' }))
			isError = true;
		}

		if(agreeToTerms) {
			setErrors((prevState) => ({ ...prevState, agreeToTermsErr: '' }))
		} else {
			setErrors((prevState) => ({ ...prevState, agreeToTermsErr: 'You must agree to the terms and conditions to proceed.' }))
			isError = true;
		}

		if(!isError) {
			trySignUp();
		}
	}

	const [{ id, email, username, password, userType, showUsernameReqs, showPasswordReqs, agreeToTerms }, setValues] = useState({
		id: '',
		email: '',
		username: '',
		password: '',
		userType: 'Undergraduate',
		showUsernameReqs: false,
		showPasswordReqs: false,
		agreeToTerms: false
	});

	const [{idErr, emailErr, usernameErr, passwordErr, agreeToTermsErr, alreadyExistErr}, setErrors] = useState({
		idErr: '',
		emailErr: '',
		usernameErr: '',
		passwordErr: '',
		agreeToTermsErr: '',
		alreadyExistErr: ''
	})

	return (
			<div>
				<Form noValidate className = 'rounded p-3 col-md-3 w-100'>
					<h5 className='text-center fw-bold'>WELCOME TO<br></br>LINKED HU</h5>
					<FormFieldText prependIcon={faIdCard} type='text' value='' placeholder='National ID' onChange={({ target }) => setValues((prevState) => ({ ...prevState, id: target.value }))} error={idErr}/>
					<FormFieldText prependIcon={faEnvelope} type='email' value='' placeholder='E-mail' onChange={({ target }) => setValues((prevState) => ({ ...prevState, email: target.value }))} error={emailErr}/>
					<FormFieldText prependIcon={faUser} appendIcon={faQuestionCircle} type='text' value='' placeholder='Username' onChange={({ target }) => setValues((prevState) => ({ ...prevState, username: target.value }))}
					onClick={() => setValues((prevState) => ({ ...prevState, showUsernameReqs: !showUsernameReqs }))} error={usernameErr}
					requirements={showUsernameReqs ? <>Your username must:<ul className='m-0'><li>Contain only letters.</li><li>Be separated with whitespace to name and surname.</li></ul></> : null}/>
					<FormFieldText prependIcon={faKey} appendIcon={faQuestionCircle} type='password' value='' placeholder='Password' onChange={({ target }) => setValues((prevState) => ({ ...prevState, password: target.value }))}
					onClick={() => setValues((prevState) => ({ ...prevState, showPasswordReqs: !showPasswordReqs }))} error={passwordErr}
					requirements={showPasswordReqs ? <>Your password must:<ul className='m-0'><li>Contain only letters, digits and (.,!?+-_).</li><li>Contain at least 1 capital letter.</li><li>Contain at least 1 digit.</li>
					<li>Contain at least 1 special character from (.,!?+-_).</li><li>Must be between 6-12 characters.</li></ul></> : null}/>
					<div className='d-flex justify-content-between align-items-center flew-row'>
						<p>I am a(n):</p>
						<FormFieldSelect onChange={({ target }) => setValues((prevState) => ({ ...prevState, userType: target.value }))}/>
					</div>
					<FormFieldCheckBox label='I agree to the terms and conditions.' onChange={({ target }) => setValues((prevState) => ({ ...prevState, agreeToTerms: target.checked }))} error={agreeToTermsErr}/>
					<Button variant='primary' className='w-100 mb-3' onClick={handleSubmit}>SIGN UP</Button>
					{alreadyExistErr ?
					<Alert dismissible variant='danger' onClose={() => setErrors((prevState) => ({ ...prevState, alreadyExistErr: '' }))}>
						{alreadyExistErr}
					</Alert>
					: null}
					<div className='text-center'><span className='fw-light'>Already have an account?</span> <span className='text-primary fw-bold' role='button' onClick={signUp}>Sign Up!</span></div>
				</Form>
			</div>
  	)
}

export default SignUp