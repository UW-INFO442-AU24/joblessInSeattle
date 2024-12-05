import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, FormControl, Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import { NavBar } from "./Navbar.js";
import { LineChart } from '@mui/x-charts';
import { fetchJSON } from "./utils.js";
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

// water tracker
function Counter({user, waterInput, setWaterInput}) {
    const apiUrl = process.env.REACT_APP_API_URL;
   const [count, setCount] = useState(0);
   const increment = () => setCount(count + 8);
   const decrement = () => setCount(count - 8);

   const reset = () => setCount(0);

    // FOR LOCAL TESTING SWITCH TO
    // http://localhost:3001/api/water

    // FOR DEPLOYMENT USE
    // ${apiUrl}/api/water

   const saveWaterInfo = async (event) => {
        event.preventDefault(); //stops page from reloading
        // let waterIntake = {count}.count;
        try {
            await fetchJSON(`${apiUrl}/api/water`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    user: user,
                    water: count
                }
            })
            setWaterInput(waterInput+count)
            reset();

        } catch (error) {
            console.error("Error saving count:", error);
        }
    };

   return (
    //    <div>
    //         <div>
    //             <Button onClick={decrement} disabled={count<=0 ? true : false}>-</Button>
    //             <span id="waterCounter" class="mx-3 pt-2">{count} fl oz</span>
    //             <Button variant='primary' onClick={increment} disabled={count>=96 ? true : false}>+</Button>
    //         </div>
               
    //        <div>
    //            <Button variant='primary' type='submit' className="mt-3" disabled={count<=0 ? true : false} onClick={saveWaterInfo}>
    //                 Submit
    //             </Button>
    //        </div>
    //    </div>

        <Form onSubmit={saveWaterInfo}>
            <Button data-testid="subtract-button" onClick={decrement} disabled={count<=0 ? true : false}>-</Button>
            <span data-testid="waterCounter" id="waterCounter" class="mx-3 pt-2">{count} fl oz</span>
            <Button data-testid="addition-button" variant='primary' onClick={increment} disabled={count>=96 ? true : false}>+</Button>
            <div>
                <Button variant='primary' type='submit' className="mt-3" disabled={count<=0 ? true : false} >Submit</Button>
            </div>
        </Form>


   );
}

export default function WaterTracker() {
    const apiUrl = "https://joblessinseattle.onrender.com";
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(false);
    const [valid, setValid] = useState(false);
    const [waterGoal, setWaterGoal] = useState([]);
    const [waterInput, setWaterInput] = useState([]);
    const [userId, setUserId] = useState("");

    // reads who the user ID is for reference across the page
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                // console.log("User ID set: ", user.uid);
            } else {
                console.error("User not logged in");
            }
        });
        return () => unsubscribe();
    }, []);

    function UserWaterGoal({ waterGoal }) {
        if (waterGoal) {
            let goal = waterGoal;

            return (
                <Card.Text>Current Goal: {goal} fl. oz</Card.Text>
            );
        }
    }
    
    function UsersWaterInput({ waterInput }) {
        if (waterInput) {

            return (
                <Card.Text>Water Intake: {waterInput} fl. oz</Card.Text>
            );
        }
    }

    useEffect(() => {
        const fetchWaterGoal = async (user) => {
            try {
                const response = await fetch(`${apiUrl}/api/water/getGoal`);
                const data = await response.json();
                // filters for only inputs of the user
                let userWaterGoals = data.filter((goals) => goals.user_id === userId)
                setWaterGoal(userWaterGoals[userWaterGoals.length-1].waterGoal);  // updates the state with a new list of medications in state
            } catch (error) {
                console.error("Error fetching water goals:", error);
            }
        };
        fetchWaterGoal(userId);
    }, [userId, apiUrl]);

    useEffect(() => {
        const fetchWaterInput = async (user) => {
            try {
                let totalWater = 0;
                const response = await fetch(`${apiUrl}/api/water/getWaterIntake`);
                const data = await response.json(); // data is an array of objects
                // filters for only inputs of the user
                let userWaterInput = data.filter((inputs) => inputs.user_id === user)
                // go through data, get water input attribute, add them all together
                userWaterInput.forEach(input => {
                    totalWater += input.water                  
                });
                // console.log("This is the total water count for today: " + totalWater);
                // setWaterInput as the sum
                if (userId) { // Check if userId is defined
                    setWaterInput(totalWater);
                }
            } catch (error) {
                console.error("Error fetching water input:", error);
            }
        };
        fetchWaterInput(userId);
    }, [userId, apiUrl]);

    const enableEdit = () => setEdit(true);
    const disableEdit = () => setEdit(false);

    const handleChange = (event) => {
        const value = parseInt(event.target.value);
        if (value > 0 && value < 100) {
            setValue(value);
            setValid(true);
        }
        else {
            setValid(false);
            //throw new Error("Water Goal is too low or too high!");
            console.log("water goal is not working!!!")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); //stops page from reloading
        try {
            await fetchJSON(`${apiUrl}/api/water/goals`, {
                method: "POST",
                body: {
                    user: userId,
                    waterGoal: value
                }
            })
            // fetches the updated data after the adding
            const response = await fetch(`${apiUrl}/api/water/getGoal`);
            const data = await response.json();
            // filters for only meds of the user
            let userWaterGoals = data.filter((goals) => goals.user_id === userId)
            setWaterGoal(userWaterGoals[userWaterGoals.length-1].waterGoal);  // updates the state with a new list of medications in state

        } catch (error) {
            console.error("Error saving goals:", error);
        }
    };

    return (   
        <div>
            <Col className='m-4'>
                {/* WATER TRACKER TODAY */}
                <div className='d-flex flex-row'>
                    <div>
                        <button className="btn border-0"><Link to="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            </svg>
                            </Link>
                        </button>
                    </div>
                    <div>
                        <h1>Water Tracker</h1>
                    </div>
                </div>
                
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                        {/* <Card.Body class="text-center"> */}
                            <Card.Title>Water Intake Input</Card.Title>
                            <Counter user={userId} waterInput={waterInput} setWaterInput={setWaterInput}/>
                        </Card.Body>
                    </Card>
                </Row>

                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Water Consumed Today</Card.Title>
                            {/* call funciton to load water info? */}
                            <UsersWaterInput waterInput={waterInput}/>
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
                            <UserWaterGoal waterGoal={waterGoal} />
                                <hr />
                                <Button variant='warning' className='my-2' onClick={enableEdit}>Edit Goal</Button>
                                <Form onSubmit={handleSubmit}>
                                    <Row className='my-2'> 
                                        <Col>
                                        <FormControl
                                            type="text"
                                            placeholder="fl oz"
                                            aria-label="Disabled input example"
                                            disabled={!edit}
                                            onChange={handleChange}
                                        />
                                        </Col>
                                        <Col className="pt-2">
                                            fl oz
                                        </Col>
                                    </Row>
                                    <Button variant={valid ? 'success' : 'outline-success'} type='submit' disabled={valid ? false : true } className='my-2' onClick={disableEdit}>Submit</Button>
                                </Form>
                        </Card.Body>
                    </Card>
                </Row>

                <Row className='m-4'>
                    <Card className='mb-5'>
                        <Card.Body>
                            <Card.Title>
                                Importance of Drinking Water!
                            </Card.Title>
                            <iframe width="250" height="250" src="https://www.youtube.com/embed/31F0laJjyy8?si=0yW5SdeYmkYLl-EB" 
                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </Card.Body>
                    </Card>

                </Row>
            </Col>
            <NavBar></NavBar>
        </div>
    );
}