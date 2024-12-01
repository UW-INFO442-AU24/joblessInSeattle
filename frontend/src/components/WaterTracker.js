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
               <Button variant='info' className="mt-3" disabled={count<=0 ? true : false} onClick={saveWaterInfo}>
                    Submit
                </Button>
           </div>
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