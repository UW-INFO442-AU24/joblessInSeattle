import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { LineChart } from '@mui/x-charts';
// import axios from "axios";
// import fetch from 'fetch';

//import saveWaterInfo from './backend/javascripts/water.js'

// async function saveWaterInfo() {
//     //TODO: do an ajax call to save whatever info you want about the user from the user table
//     let waterIntake = document.getElementById('waterTracker');
//     console.log(waterIntake);

//     let responseJson = await fetch(`api/water`, {
//         method: "POST",
//         body: {water: waterIntake}
//     })
// };

// water tracker
function Counter() {
   const [count, setCount] = useState(0);
   const increment = () => setCount(count + 8);
   const decrement = () => setCount(count - 8);

   const reset = () => setCount(0);

   const saveWaterInfo = async () => {
        try {
            let waterIntake = {count}.count;
            console.log(waterIntake)
            await fetch("http://localhost:3001/api/water", {
            method: "POST",
            body: waterIntake
        }) 
        reset();

        } catch (error) {
            console.error("Error saving count:", error);
        }
    };

   return (
       <div>
               <Button onClick={decrement} disabled={count<=0 ? true : false}>-</Button>
               {/* <span id="waterCounter" class="mx-3 pt-2">{count}</span> */}
               <span id="waterCounter" class="mx-3 pt-2">{count} fl oz</span>
               <Button variant='primary' onClick={increment}>+</Button>
           <div>
               <Button variant='primary' className="mt-3" disabled={count<=0 ? true : false} onClick={saveWaterInfo}>
                    Submit
                </Button>
           </div>
       </div>
   );
}

export default function WaterTracker() {
    // const [apiResponse, setApiResponse] = useState(null);
    // const [error, setError] = useState(null);

    // // Fetch data from the API when the component mounts
    // useEffect(() => {
    //     // Make the API call to the backend
    //     fetch('http://localhost:3001/api/water')
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         setApiResponse(data); // Update state with the API response
    //     })
    //     .catch((error) => {
    //         setError(error.message); // Handle errors
    //     });
    // }, []); // Empty dependency array means this effect runs once on start

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
                            {/* <Button as="input" type="submit" value="Submit" className='mt-2'/> */}
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
                    <Card className='mb-5'>
                        <Card.Body>
                            <Card.Title>Water Goals</Card.Title>
                            <Card.Text>
                                this is a placeholder for the user to input their water goal for the day/week?
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            <NavBar></NavBar>
        </div>
    );
}