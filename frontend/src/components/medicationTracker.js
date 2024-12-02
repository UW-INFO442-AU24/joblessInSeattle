import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { LineChart } from '@mui/x-charts';
import { fetchJSON } from "./utils.js";

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
                {/* left side of card -- NEED TO UPDATE WHEN DB STUFF IS IN */}
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

    /* FUNCTION to add "add medication" content after pressing add medication button */
    function medInputs() {
        var medicationDiv = document.getElementById('medication-input');
        var addMedButton = document.getElementById('addMedicationBtn');

        addMedButton.style.display = 'none';  // This hides the button

        
    
        medicationDiv.innerHTML = `<div id='medInputForm' class='py-2'>
            <div class='d-flex flex-row justify-content-between py-1'>
                <label for='medicationNameInput'>Medication Name</label>
                <input type='text' id='medicationNameInput'/>
            </div>

            <div class='d-flex flex-row justify-content-between py-1'>
                <label for='medFrequencyInput'>Daily Frequency</label>
                <input type='number' id='medFrequencyInput' min="0" max="100" step="1"/>
            </div>
            
            <div class='d-flex flex-column justify-content-between py-1'>
                <label for='medDescriptionInput'>Description</label>
                <textarea id='medDescriptionInput' rows="4" cols="50" wrap="soft"></textarea>
            </div>

            <div class='d-flex justify-content-left mt-2'>
                <button id='submitBtn' class="btn btn-success">Submit</button>
            </div>
        </div>`;
        // Attach the submit event handler
        var submitBtn = document.getElementById("submitBtn");
        submitBtn.addEventListener("click", submitMedication);
    }

    function submitMedication () {
        var medicationName = document.getElementById('medicationNameInput');
        var medDescription = document.getElementById('medDescriptionInput');
        var medFrequency = document.getElementById('medFrequencyInput');
        var medicationDiv = document.getElementById('medication-input');
        var addMedButton = document.getElementById('addMedicationBtn');

        medicationDiv.innerHTML = "";
        addMedButton.style.display = 'block';
        console.log("submitted (not really)")
    }
    

    return(
        <div>
            <Button className="mt-3 btn-success" id='addMedicationBtn' onClick={medInputs}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
                ‎ Add Medication
            </Button>
            <div id="medication-input"></div>
        </div>
    )
}

export default function MedicationPage() {
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