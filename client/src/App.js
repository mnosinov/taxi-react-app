import React, { useState } from 'react';
import { Container, Navbar, Button, Form }  from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Landing from './components/Landing.js';
import LogIn from './components/LogIn.js';
import SignUp from './components/SignUp.js';

import './App.css';

function App() {
	const [isLoggedIn, setLoggedIn] = useState(() => {
		return window.localStorage.getItem('taxi.auth') !== null;
	});
	const logIn = async (username, password) => {
		const url = '/api/log_in/';
		try {
			const response = await axios.post(url, { username, password });
			window.localStorage.setItem(
				'taxi.auth', JSON.stringify(response.data)
			);
			setLoggedIn(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Routes>
			<Route path='/' element={<Layout isLoggedIn={isLoggedIn} />}>
				<Route index element={<Landing isLoggedIn={isLoggedIn} />} />
				<Route path='sign-up' element={
						<SignUp isLoggedIn={isLoggedIn} />
					} 
				/>
				<Route path='log-in' element={
						<LogIn 
							logIn={logIn}
							isLoggedIn={isLoggedIn}
						/>
					}
				/>
			</Route>
		</Routes>
	);
}

function Layout ({ isLoggedIn }) {
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
							isLoggedIn && (
								<Form>
									<Button type='button'>Log out</Button>
								</Form>
							)
						}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Container className='pt-3'>
				<Outlet/>
			</Container>
		</>
  );
}

export default App;
