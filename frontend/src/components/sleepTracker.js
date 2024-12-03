import React, { useEffect, useState } from 'react';
import { ButtonGroup, Card, Col, Row, Button, Form } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { LineChart } from '@mui/x-charts';
import { MobileTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/index.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import { fetchJSON } from "./utils.js";


dayjs.extend(utc);
dayjs.extend(timezone);

function ManualTimeInputs() {

    const [bedTimeInput, setBedTimeInput] = useState(dayjs());
    const [wakeTimeInput, setWakeTimeInput] = useState(dayjs());

    const handleLog = async () => {
        try {
            // CHANGE LATER -- NEEDS TO NOT BE ABSOLUTE URL PATH
            await fetchJSON("http://localhost:3001/api/sleep", {
                method: "POST",
                body: { bedTime: bedTimeInput, wakeTime: wakeTimeInput }
            })

        } catch (error) {
            console.error("Error saving times:", error);
        }
    };
     
    return (
        <Form>
            <Form.Group className="mb-3" controlId="sleepUserInput">
                <Form.Label>Manually input sleep</Form.Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker className='my-2' label='Bed time' value={bedTimeInput} timezone='system' onChange={setBedTimeInput} />
                    <MobileTimePicker className='my-2' label='Wake-up time' value={wakeTimeInput} timezone='system' onChange={setWakeTimeInput}/>
                </LocalizationProvider>
            </Form.Group>
            <Button variant='primary' onClick={handleLog}>Log</Button>
        </Form>
    );
}

export default function SleepTracker() {


    const [value, setValue] = useState(false);
    const [edit, setEdit] = useState(false);

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

    const goBack = () => {
        window.history.back(); // Goes back to the previous page
    };

    return (
        <div>
            {/* error loading for api and loading display */}
            <Col className='m-4'>
                <div className='d-flex flex-row'>
                    <div>
                        <button className="btn border-0" onClick={goBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <h1>Sleep</h1>
                    </div>
                </div>
            
                {/* Log sleep (start/end) */}
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Going to Bed?</Card.Title>
                            <ManualTimeInputs />
                        </Card.Body>
                    </Card>
                </Row>
                    
                {/* Sleep stat with graph - Week */}
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

                {/* Goal setting for sleep hours */}
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