import React from 'react';
import { Breadcrumb, Card } from 'react-bootstrap';

function Driver (props) {
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
			</Breadcrumb>
			<Card className='mb-3'>
				<Card.Header>Current Trip</Card.Header>
				<Card.Body>No Trips.</Card.Body>
			</Card>
			<Card className='mb-3'>
				<Card.Header>Requested Trips</Card.Header>
				<Card.Body>No Trips.</Card.Body>
			</Card>
			<Card className='mb-3'>
				<Card.Header>Recent Trips</Card.Header>
				<Card.Body>No Trips.</Card.Body>
			</Card>
		</>
	);
}

export default Driver;
