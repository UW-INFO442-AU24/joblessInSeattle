import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { NavBar } from "../frontend/Navbar.js";
import { LineChart } from '@mui/x-charts/LineChart';

function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 8);
    const decrement = () => setCount(count - 8);

    return (
        <div>
            <Button variant='primary' onClick={decrement}>-</Button>
            <span id="counter" class="mx-3">{count} fl oz</span>
            <Button variant='primary' onClick={increment}>+</Button>
        </div>
    );
}

export default function WaterTracker() {
  return (   
    <div>
        <Col className='m-4'>
            {/* WATER TRACKER TODAY */}
            <h1>Water Tracker</h1>
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Water Consumed Today</Card.Title>
                        <Counter />
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