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
    const [user, setUser] = useState(null);
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

    if (!user) {
        return null;
    }

    return (
        <div className='bg-rose-100 w-full min-h-screen overflow-auto'>
            <h3 className='mt-14 mb-6 mx-4'>Good morning, Leo</h3>
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
                                        16/64 fl oz.
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
                                    <Card.Text className='text-sm'>
                                        8 hours :0
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