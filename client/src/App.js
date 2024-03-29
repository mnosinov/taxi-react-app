import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Form }  from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import Landing from './components/Landing.js';
import LogIn from './components/LogIn.js';
import SignUp from './components/SignUp.js';
import Driver from './components/Driver.js';
import Rider from './components/Rider.js';
import DriverDashboard from './components/DriverDashboard.js'
import DriverDetail from './components/DriverDetail.js'
import RiderDashboard from './components/RiderDashboard.js'
import RiderDetail from './components/RiderDetail.js'
import RiderRequest from './components/RiderRequest.js';
import { isRider } from './services/AuthService.js';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	const [isLoggedIn, setLoggedIn] = useState(() => {
		return window.localStorage.getItem('taxi.auth') !== null;
	});
	const logIn = async (username, password) => {
		const url = `${process.env.REACT_APP_BASE_URL}/api/log_in/`;
		try {
			const response = await axios.post(url, { username, password });
			window.localStorage.setItem(
				'taxi.auth', JSON.stringify(response.data)
			);
			setLoggedIn(true);
			return { response, isError: false }
		} catch (error) {
			console.error(error);
			return { response: error, isError: true }
		}
	};

	const logOut = () => {
		window.localStorage.removeItem('taxi.auth');
		setLoggedIn(false);
	};

	return (
		<Routes>
			<Route path='/' element={<Layout isLoggedIn={isLoggedIn} logOut={logOut} />}>
				<Route index element={<Landing isLoggedIn={isLoggedIn} />} />
				<Route path='sign-up' element={<SignUp isLoggedIn={isLoggedIn} />} />
				<Route path='log-in' element={<LogIn logIn={logIn} isLoggedIn={isLoggedIn} />} />
				<Route path='rider' element={<Rider />}>
				    <Route index element={<RiderDashboard />} />
				    <Route path='request' element={<RiderRequest/>} />
				    <Route path=':id' element={<RiderDetail/>} />
				</Route>
				<Route path='driver' element={<Driver />}>
				    <Route index element={<DriverDashboard />} />
				    <Route path=':id' element={<DriverDetail/>} />
				</Route>
			</Route>
		</Routes>
	);
}

function Layout ({ isLoggedIn, logOut }) {
  return (
		<>
			<Navbar bg='light' expand='lg' variant='light'>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand className='logo'>Taxi</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						{
							isRider() && (
								<Nav className='me-auto'>
									<LinkContainer to='/rider/request'>
										<Nav.Link data-cy='request-trip'>Request a trip</Nav.Link>
									</LinkContainer>
								</Nav>
							)
						}
						{
							isLoggedIn && (
								<Form className='ms-auto'>
									<Button type='button' data-cy='logOut' onClick={() => logOut()} >Log out</Button>
								</Form>
							)
						}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Container className='pt-3'>
				<Outlet/>
			</Container>
			<ToastContainer />
		</>
  );
}

export default App;