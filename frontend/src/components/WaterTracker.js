import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { LineChart } from '@mui/x-charts';

export default function WaterTracker() {
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        // Make the API call to the backend
        fetch('http://localhost:3001/api/water')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setApiResponse(data); // Update state with the API response
        })
        .catch((error) => {
            setError(error.message); // Handle errors
        });
    }, []); // Empty dependency array means this effect runs once on start

    return (   
        <div>
            <Col className='m-4'>
                {/* WATER TRACKER TODAY */}
                <h1>Water Tracker</h1>
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Water Consumed Today</Card.Title>
                            <Button variant='primary'>-</Button>
                            <span id="counter" class="mx-3">0 fl oz</span>
                            <Button variant='primary'>+</Button>
                            <Button as="input" type="submit" value="Submit" className='mt-2'/>
                        </Card.Body>
                    </Card>
                </Row>
                    
                {/* WATER DRANK THIS WEEK */}
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                        <Card.Title>This Week</Card.Title>
                        <LineChart
                            xAxis={[{ 
                                scaleType: 'time',
                                data: [new Date('2024-11-11'), new Date('2024-11-12'), new Date('2024-11-13'), new Date('2024-11-14'), new Date('2024-11-15'), new Date('2024-11-16'), new Date('2024-11-17')] 
                            }]}
                            series={[
                                {
                                data: [60, 52, 86, 75, 59, 68, 64]
                                },
                            ]}
                            width={200}
                            height={200}
                        />
                        </Card.Body>
                    </Card>
                </Row>

                {/* WATER GOALS*/}
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                        <Card.Title>Water Goals</Card.Title>
                        <Card.Text>
                            this is a placeholder for the user to input their water goal for the day/week?
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>

                {/* BUDDY  WATER INTAKE */}
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Buddy's Water Intake</Card.Title>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            <NavBar></NavBar>
        </div>
    );
}