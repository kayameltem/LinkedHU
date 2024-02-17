import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "../tabs/home/Home";

const Login = ({ userEmail, changeUser }) => {
    const navigate = useNavigate();
    const goToNextPage = () => {
        navigate('/home')
       }
  return (
	  <>
	  <Home userEmail={userEmail} changeUser={changeUser}/>
	  </>
  );
};

export default Login;
