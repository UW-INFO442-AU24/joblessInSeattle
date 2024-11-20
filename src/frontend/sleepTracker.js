import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ButtonGroup } from 'react-bootstrap';
import { NavBar } from "../frontend/Navbar.js";
import { LineChart } from '@mui/x-charts/LineChart';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

function TimeInputs(props) {

    const [time, setTime] = useState(dayjs('2024-11-01T15:30'));
    const label = props.label

    return (
        <MobileTimePicker className='my-2' label={label} value={time} onChange={(newTime) => setTime(newTime)}/>
    );

}

export default function SleepTracker() {

    return (

        <div>
            <Col className='m-4'>
                <h1>Sleep</h1>
                {/* Log sleep (start/end) */}
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Going to Bed?</Card.Title>
                            <ButtonGroup>
                                <Button variant='primary' className='me-4 my-2'>Bed time</Button>
                                <Button variant='success' className='ms-4 my-2'>Awake!</Button>
                            </ButtonGroup>
                            <Form>
                                <Form.Group className="mb-3" controlId="sleepUserInput">
                                    <Form.Label>Manually input sleep</Form.Label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimeInputs label='Bed time'/>
                                        <TimeInputs label='Wake-up time'/>
                                    </LocalizationProvider>
                                </Form.Group>
                                <Button variant='secondary'>Log</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
                    
                {/* Sleep stat with graph - Day, Week, Month, 6 months, Year? */}
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Your Sleep</Card.Title>
                            <LineChart
                                xAxis={[{ 
                                    scaleType: 'time',
                                    data: [new Date('2024-11-11'), new Date('2024-11-12'), new Date('2024-11-13'), new Date('2024-11-14'), new Date('2024-11-15'), new Date('2024-11-16'), new Date('2024-11-17')] 
                                }]}
                                series={[
                                    {
                                    data: [6.3, 8.3, 7.1, 7.9, 7.8, 6.9, 7.4]
                                    },
                                ]}
                                width={200}
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Row>

                {/* Goal setting for sleep hours? */}
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Sleep Goals</Card.Title>
                            <Card.Text>Current Goal: 8 hr 00 min</Card.Text>
                            <Card.Text>You've reached it X% of times</Card.Text>
                            <Card.Text>Icon somewhere to edit goal</Card.Text>
                        </Card.Body>
                    </Card>
                </Row>

                {/* Overall trends or buddy's level of sleep relative to yours? */}
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Buddy's Sleep</Card.Title>
                            <Card.Text>Buddy's health in relation to your sleep</Card.Text>
                            <Card.Text>Maybe some sort of status bar or something</Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            <NavBar></NavBar>
        </div>   
    );
}