import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "./Navbar.js";
import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import MedicationIcon from '@mui/icons-material/Medication';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function Dashboard() {
    const [user, setUser] = useState("");
    const apiUrl = "https://joblessinseattlefe.onrender.com";
    const [waterInput, setWaterInput] = useState([]);
    const [sleepInput, setSleepInput] = useState([]);
    const [sleepTime, setSleepTime] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                navigate("/login");
            }
        })

        return () => checkLoginStatus();
    }, [navigate]);

    // useEffect to fetch water input
    useEffect(() => {
        const fetchWaterInput = async (user) => {
            try {
                let totalWater = 0;
                const response = await fetch("https://joblessinseattle.onrender.com/api/water/getWaterIntake");
                const data = await response.json(); // data is an array of objects
                // filters for only inputs of the user
                let userWaterInput = data.filter((inputs) => inputs.user_id === user.uid)
                // go through data, get water input attribute, add them all together
                userWaterInput.forEach(input => {
                    totalWater += input.water                  
                });
                // console.log("This is the total water count for today: " + totalWater);
                // setWaterInput as the sum
                if (user) { // Check if userId is defined
                    setWaterInput(totalWater);
                }
            } catch (error) {
                console.error("Error fetching water input:", error);
            }
        };
        fetchWaterInput(user);
    }, [user, apiUrl]);

    

    // useEffect to fetch sleep times
    useEffect(() => {
        // filter used in fetchSleepTimes to find sleep times recorded by user
        function timeFilter(time) {
            if (time.user_id === user.uid && time.entryType === 'recordTime') {
                return true;
            }
            return false;
        }

        // finds and updates the sleep time in the dashboard
        const fetchSleepTimes = async (user) => {
            try {
                const response = await fetch("https://joblessinseattle.onrender.com/api/sleep/getTimeInputs");
                const data = await response.json();
                let userTimes = data.filter((timeFilter));
                setSleepInput(userTimes.slice(-1)[0]);

                let timeBed = new Date(sleepInput.bedTime);
                let timeWake = new Date(sleepInput.wakeTime);
                let bedMath = timeBed.getTime();
                // console.log(bedMath);
                let wakeMath = timeWake.getTime();
                // console.log(wakeMath);
                
                // calculate hour and min difference
                // Convert from miliseconds to seconds to minutes to hours
                let sleep = (((wakeMath - bedMath) / 1000) / 60) / 60;
                // console.log(sleep);
                setSleepTime(sleep);
            } catch (error) {
                console.error("Error fetching sleep goals:", error);
            }
        };
        if (user) {
            fetchSleepTimes(user);
        }
    }, [user, apiUrl]);

    if (!user) {
        return null;
    }

    return (
        <div className='bg-rose-100 w-full min-h-screen overflow-auto'>
            <h3 className='mt-14 mb-6 mx-4'>Hi, {user.fname}!</h3>
            <div className='mb-20'>
                <Row className='!mx-4'>
                    {/* WATER TRACKER */}
                    <Col className='my-1 mr-2 p-0'>
                        <Card className='bg-primary border-primary text-white !rounded-2xl'>
                        <WaterDropIcon className='m-3' fontSize='large'/>
                        <Card.Body>
                            <Link to="/watertracker" className="stretched-link " data-testid='watertracker-box'/>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <Card.Title>Water</Card.Title>
                                    <Card.Text className='text-sm'>
                                        {waterInput} fl. oz
                                    </Card.Text>
                                </div>
                            <div className="pt-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                            </div>
                        </Card.Body>
                        </Card>
                    </Col>
                        
                    {/* SLEEP TRACKER */}
                    <Col className='my-1 mr-2 p-0'>
                        <Card className='!bg-violet-700 !border-violet-700 opacity-80 text-white !rounded-2xl'>
                        <BedtimeIcon className='m-3' fontSize='large'/>
                        <Card.Body>
                            <Link to="/sleeptracker" className="stretched-link" data-testid='sleeptracker-box'/>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <Card.Title>Sleep</Card.Title>
                                    <Card.Text className='text-sm' >
                                        {sleepTime} hours
                                    </Card.Text>
                                </div>
                                <div className="pt-9">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </div>
                            </div>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
                <Row className='!mx-4'>
                    {/* MEDICATIONS */}
                    <Col className='my-1 mr-2 p-0'>
                        <Card className='bg-success border-success bg-opacity text-white !rounded-2xl'>
                        <MedicationIcon className='m-3' fontSize='large'/>
                        <Card.Body>
                            <Link to="/medications" className="stretched-link" data-testid="medication-box"/>
                            <div className='d-flex justify-content-between'>
                            <div>
                                <Card.Title className='text-nowrap'>Take Medications</Card.Title>
                                <Card.Text className='text-sm'>
                                    allergy pills!
                                </Card.Text>
                            </div>
                            <div className="pt-9">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                            </div>
                        </Card.Body>
                        </Card>
                    </Col>

                    {/* MY BUDDY */}
                    <Col className='my-1 mr-2 p-0'>
                        <Card className='bg-warning border-warning bg-opacity-75 text-black !rounded-2xl'>
                        <SmartToyIcon className='m-3' fontSize='large'/>
                        <Card.Body>
                            <Link to="/buddy" className="stretched-link"/>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <Card.Title className='text-nowrap'>My Buddy</Card.Title>
                                    <Card.Text className='text-sm'>
                                        :D
                                    </Card.Text>
                                </div>
                                <div className="pt-9">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </div>
                            </div>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            
            <footer>
                <NavBar/>
            </footer>
        </div>
    );
}