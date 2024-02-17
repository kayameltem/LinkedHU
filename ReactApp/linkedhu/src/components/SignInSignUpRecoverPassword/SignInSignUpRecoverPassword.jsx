import React, { useState, useEffect } from 'react'

import SignIn from './SignIn';
import SignUp from './SignUp';
import RecoverPassword from './RecoverPassword';
import Modal from 'react-bootstrap/Modal';

const SignInSignUpForgotPassword = ({ initPage, changeUser }) => {
	const onSign = (val) => {
		changeUser(val);
		changeShow(false);
	}

	const changePage = (val) => {
		setValues((prevState) => ({ ...prevState, page: val }))
	}

	const changeShow = (val) => {
		setValues((prevState) => ({ ...prevState, show: val }))
	}

	const [{ page, show }, setValues] = useState({
		page: initPage,
		show: initPage > 0
	});

	useEffect(() => {
		setValues((prevState) => ({ ...prevState, page: initPage }))
		setValues((prevState) => ({ ...prevState, show: initPage > 0 }))
	}, [initPage]);

	return (
		<Modal centered show={show} onHide={() => changeShow(false)}>
			<Modal.Body>
				{page === 1 ?
				<SignIn forgotPassword={() => changePage(3)} signUp={() => changePage(2)} onSignIn={onSign}/>
				: null}
				{page === 2 ?
				<SignUp signUp={() => changePage(1)} changeUser={changeUser} onSignUp={onSign}/>
				: null}
				{page === 3 ?
				<RecoverPassword goBack={() => changePage(1)}/>
				: null}
			</Modal.Body>
		</Modal>
	);
}

export default SignInSignUpForgotPassword;