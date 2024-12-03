import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { LineChart } from '@mui/x-charts';
import { fetchJSON } from "./utils.js";
import { Link} from "react-router-dom";

// water tracker
function MedicationList() {
   const [count, setCount] = useState(0);
   const increment = () => setCount(count + 8);
   const decrement = () => setCount(count - 8);

   const reset = () => setCount(0);

   

    return (
        // return the medication list FULL card
        <div>
            <MedicationLine />
        </div>
    );
}

// function to return the html of what a single line of medication looks like
function MedicationLine () {
    return(
        <div className='d-flex flex-row justify-content-between border-bottom'>
            <div className='px-2'>
                {/* left side of card */}
                <div className='d-flex flex-row justify-content-between mt-1'>
                    <p className='fw-bold mb-0'>Zyrtec</p>
                    <p className='m-0'>1x</p>
                </div>
                <p className='text-black-50'>Allergy Medication RAH IM ADDING MORE TEXT TO THIS</p>
            </div>
            <div>
                <button className="btn btn-primary">Status</button>
            </div>
        </div>
        
    )
}

function AddNewMedication () {

    const addNewMedication = async () => {
        let medicationName = document.getElementById('medicationNameInput');
        let medDescription = document.getElementById('medDescriptionInput');
        let medFrequency = document.getElementById('medFrequencyInput');
        try {
            // CHANGE LATER -- NEEDS TO NOT BE ABSOLUTE URL PATH
            await fetchJSON("http://localhost:3001/api/medication", {
                method: "POST",
                body: { water : 3}
            })

        } catch (error) {
            console.error("Error saving count:", error);
        }
    };

    const showInputs = <div><input>Hey!</input></div>

    return(
        <div>
            {/* onClick={showInputs} */}
            <Button variant='primary' className="mt-3" >
                Add Medication
            </Button>
            <div id="medication-input"></div>
        </div>
    )
}

export default function MedicationTracker() {
    const goBack = () => {
        window.history.back(); // Goes back to the previous page
    };

    return (   
        <div>
            <Col className='m-4'>
                {/* MEDICATION TRACKER TODAY */}
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
                        <h1>Medications</h1>
                    </div>
                </div>
                
                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                        {/* <Card.Body class="text-center"> */}
                            <Card.Title>Medication List</Card.Title>
                            <MedicationList />
                            <AddNewMedication />
                        </Card.Body>
                    </Card>
                </Row>

                <Row className='m-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Some other Card</Card.Title>
                            {/* call funciton to load card info? */}
                        </Card.Body>
                    </Card>
                </Row>

                    
                
            </Col>
            <NavBar></NavBar>
        </div>
    );
}