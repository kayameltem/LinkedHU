import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarComp from '../src/components/NavbarComp';
import { Home } from './components/tabs/home/Home';

import  Profile   from './components/profile/Profile';

import { Jobs } from './components/tabs/job/Jobs';
import { Internship } from './components/tabs/internship/Internship';
import { Scholarship } from './components/tabs/scholarships/Scholarship';
import { Projects } from './components/tabs/project/Projects';
import Login from './components/login/Login';
import Result from './components/result/Result';

import axios from 'axios';

function App() {

	const [userEmail, setEmail] = useState('');
	const [userType, setType] = useState('');

	const changeUser = async (val) => {
		setEmail(val);
		if( val !== '') {
		const fetchData = {'user': {'mail': val}};
		const data  = await axios.post('http://localhost:8080/user/fetchUser', fetchData);
		setType(data.data.type);
	} else {
		setType('');
	}
	}

  return (
    <div className="App">
	<Routes>
		<Route path="/nav" element={<NavbarComp/>} />
		<Route path="/home" element={<Home userEmail={userEmail} changeUser={changeUser}/>} />
		<Route path="/contact" link to='./tabs/home/Home/contact' />
		<Route path="/profile" element={<Profile userEmail={userEmail} userType={userType} changeUser={changeUser}/>} />
		<Route path="/jobs" element={<Jobs userEmail={userEmail} userType={userType} changeUser={changeUser}/>} />
		<Route path="/internship" element={<Internship userEmail={userEmail} userType={userType} changeUser={changeUser}/>} />
		<Route path="/scholarship" element={<Scholarship userEmail={userEmail} userType={userType} changeUser={changeUser}/>} />
		<Route path="/projects" element={<Projects userEmail={userEmail} userType={userType} changeUser={changeUser}/>} />
		<Route path="/logout" element={<Home userEmail={userEmail} changeUser={changeUser}/>} />
		<Route  path= "/" element ={<Login userEmail={userEmail} userType={userType} changeUser={changeUser}/>}/>
		<Route  path= "/result" element ={<Result userEmail={userEmail} userType={userType} changeUser={changeUser}/>}/>
	</Routes>

    </div>
  );
}

export default App;