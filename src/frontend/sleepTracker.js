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

    const [clicked, setClicked] = useState(false);
    const [value, setValue] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClick = (event) =>{

        const clickTime = new Date();
        setClicked(true);
        console.log(clickTime);
        // send clickTime to DB and then after setClicked(false)
    }

    // Submit time inputted by user
    const handleSubmit = (event) => {

    }

    const enableEdit = (event) => {

        setEdit(true);
    }

    const disableEdit = (event) => {
        setEdit(false);
    }

    // Check value of inputs to make sure response is within time
    const handleChange = (event) => {
        const value = parseInt(event.target.value);
        console.log(value);
        if (value < 60 || value > 0) {
            setValue(value);
        }
        else {
            throw new Error("Value is not within time");
        }

    }

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
                                <Button variant='primary' className='me-4 my-2' onClick={handleClick}>Bed time</Button>
                                <Button variant='success' className='ms-4 my-2' onClick={handleClick}>Awake!</Button>
                            </ButtonGroup>
                            <Form>
                                <Form.Group className="mb-3" controlId="sleepUserInput">
                                    <Form.Label>Manually input sleep</Form.Label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimeInputs label='Bed time'/>
                                        <TimeInputs label='Wake-up time'/>
                                    </LocalizationProvider>
                                </Form.Group>
                                <Button variant='secondary' onClick={handleSubmit}>Log</Button>
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
                    <Card className='mb-5'>
                        <Card.Body>
                            <Card.Title>Sleep Goals</Card.Title>
                            <Card.Text>Current Goal: 8 hr 00 min</Card.Text>
                            <Card.Text>You've reached it X% of times</Card.Text>
                            <Button variant='warning' className='my-2' onClick={enableEdit}>Edit Goal</Button>
                            <Form>
                                <Row className='my-2'>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="hr"
                                            aria-label="Disabled input example"
                                            disabled={!edit}
                                        />
                                    </Col>
                                    <Col>
                                        hrs
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="min"
                                            aria-label="Disabled input example"
                                            disabled={!edit}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        min
                                    </Col>
                                </Row>
                                <Button variant='success' className='my-2' onClick={disableEdit}>Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            <NavBar></NavBar>
        </div>   
    );
}