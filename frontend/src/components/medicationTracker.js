import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { LineChart } from '@mui/x-charts';
import { fetchJSON } from "./utils.js";

// water tracker
function Counter() {
   const [count, setCount] = useState(0);
   const increment = () => setCount(count + 8);
   const decrement = () => setCount(count - 8);

   const reset = () => setCount(0);

   const saveWaterInfo = async () => {
        let waterIntake = {count}.count;
        try {
            console.log(waterIntake)
            // CHANGE LATER -- NEEDS TO NOT BE ABSOLUTE URL PATH
            await fetchJSON("http://localhost:3001/api/water", {
                method: "POST",
                body: { water: waterIntake }
            })
            reset();

        } catch (error) {
            console.error("Error saving count:", error);
        }
    };

   return (
       <div>
            <div>
                <Button onClick={decrement} disabled={count<=0 ? true : false}>-</Button>
                <span id="waterCounter" class="mx-3 pt-2">{count} fl oz</span>
                <Button variant='primary' onClick={increment}>+</Button>
            </div>
               
           <div>
               <Button variant='primary' className="mt-3" disabled={count<=0 ? true : false} onClick={saveWaterInfo}>
                    Submit
                </Button>
           </div>
       </div>
   );
}

export default function WaterTracker() {
    const goBack = () => {
        window.history.back(); // Goes back to the previous page
    };

    return (   
        <div>
            <Col className='m-4'>
                {/* MEDICATION TRACKER TODAY */}
                <div className='d-flex flex-row'>
                    <div>
                        <button className="btn border-0" onClick={goBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <h1>Medications</h1>
                    </div>
                </div>
                
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                        {/* <Card.Body class="text-center"> */}
                            <Card.Title>Water Intake Input</Card.Title>
                            <Counter />
                        </Card.Body>
                    </Card>
                </Row>

                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Water Consumed Today</Card.Title>
                            {/* call funciton to load water info? */}
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