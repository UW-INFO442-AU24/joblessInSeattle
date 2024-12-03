import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { Link} from "react-router-dom";
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
        <Form onSubmit={handleLog}>
            <Form.Group className="mb-3" controlId="sleepUserInput">
                <Form.Label>Manually input sleep</Form.Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker className='my-2' label='Bed time' value={bedTimeInput} timezone='system' onChange={setBedTimeInput} />
                    <MobileTimePicker className='my-2' label='Wake-up time' value={wakeTimeInput} timezone='system' onChange={setWakeTimeInput}/>
                </LocalizationProvider>
            </Form.Group>
            <Button variant='primary' type='submit'>Log</Button>
        </Form>
    );
}

export default function SleepTracker() {


    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [valid, setValid] = useState(false);
    const [edit, setEdit] = useState(false);
    const [sleepGoal, setSleepGoal] = useState([]);
    const [sleepInput, setSleepInput] = useState([]);

    function UserSleepGoal({ sleepGoal }) {
        if (sleepGoal) {
            let hourGoal = sleepGoal.sleepGoalHour;
            let minGoal = sleepGoal.sleepGoalMin; 

            return (
                <Card.Text>Current Goal: {hourGoal} hr {minGoal} min</Card.Text>
            );
        }
    }
    
    function UsersSleepInput({ sleepInput }) {
        if (sleepInput) {
            let timeBed = sleepInput.bedTime;
            let timeWake = sleepInput.wakeTime;

            return (
                <div> 
                    <Card.Text>Last Bed Time: {timeBed} </Card.Text>
                    <Card.Text>Last Wake Time: {timeWake} </Card.Text>
                </div>
            );
        }
    }

    useEffect(() => {
        const fetchSleepGoal = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/sleep/getGoal');
                const data = await response.json();
                setSleepGoal(data[data.length - 1]);
            } catch (error) {
                console.error("Error fetching sleep goals:", error);
            }
        };
        fetchSleepGoal();
    }, []);

    useEffect(() => {
        const fetchSleepTimes = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/sleep/getTimeInputs');
                const data = await response.json();
                setSleepInput(data[data.length - 1]);
            } catch (error) {
                console.error("Error fetching sleep goals:", error);
            }
        };
        fetchSleepTimes();
    }, []);

    const enableEdit = (event) => {
        setEdit(true);
    }

    const disableEdit = (event) => {
        setEdit(false);
    }

    // Check value of inputs to make sure response is within time
    const handleHourChange = (event) => {
        const hour = parseInt(event.target.value);
        if (hour > 0 && hour < 12) {
            setHour(hour);
            setValid(true);
        }
        else {
            setValid(false);
            console.log("sleep goal is not working!!!")
        }
    }

    const handleMinChange = (event) => {
        const min = parseInt(event.target.value);
        if (min > 0 && min < 60) {
            setMin(min);
            setValid(true);
        }
        else {
            setValid(false);
            console.log("sleep goal is not working!!!")
        }
    }

    const handleSubmit = async () => {
        try {
            // CHANGE LATER -- NEEDS TO NOT BE ABSOLUTE URL PATH
            await fetchJSON("http://localhost:3001/api/sleep/goals", {
                method: "POST",
                body: { sleepGoalHour: hour, sleepGoalMin: min }
            })

        } catch (error) {
            console.error("Error saving goals:", error);
        }
    };

    return (
        <div>
            {/* error loading for api and loading display */}
            <Col className='m-4'>
                <div className='d-flex flex-row'>
                    <div>
                        <button className="btn border-0"> <Link to="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            </svg>
                            </Link>
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
                            <UsersSleepInput sleepInput={sleepInput} />
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
                            <UserSleepGoal sleepGoal={sleepGoal} />
                            <Button variant='warning' className='my-2' onClick={enableEdit}>Edit Goal</Button>
                            <Form onSubmit={handleSubmit}>
                                <Row className='my-2'>
                                    <Col className='mx-2'>
                                        <Form.Control
                                            type="text"
                                            placeholder="hr"
                                            aria-label="Input for sleep goal hours"
                                            disabled={!edit}
                                            onChange={handleHourChange}
                                        />
                                    </Col>
                                    <Col className='mx-2'>
                                        <Form.Control
                                            type="text"
                                            placeholder="min"
                                            aria-label="Input for sleep goal minutes"
                                            disabled={!edit}
                                            onChange={handleMinChange}
                                        />
                                    </Col>
                                </Row>
                                <Button type='submit' variant={valid ? 'success' : 'outline-success'} disabled={valid ? false : true } className='my-2' onClick={disableEdit} >Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            <NavBar></NavBar>
        </div>   
    );
}