import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
// import { LineChart } from '@mui/x-charts';
import { fetchJSON } from "./utils.js";

// list of all medications
function MedicationList() {
//    const [count, setCount] = useState(0);
//    const increment = () => setCount(count + 8);
//    const decrement = () => setCount(count - 8);
//    const reset = () => setCount(0);
    const [medications, setMedications] = useState([]);
    // Fetch medications from API
    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/medication/medications');
                const data = await response.json();
                setMedications(data);  // Store fetched medications in state
            } catch (error) {
                console.error("Error fetching medications:", error);
            }
        };
        fetchMedications();
    }, []);  // Empty dependency array means this effect runs once when the component mounts

   

    return (
        // return the medication list FULL card
        <div>
            {medications.length > 0 ? (
                medications.map((medication) => (
                    <MedicationLine key={medication._id} medication={medication} />
                ))
            ) : (
                <p>Loading medications...</p>
            )}
        </div>
    );
}

// function to return the html of what a single line of medication looks like
function MedicationLine ({medication}) {
    console.log(medication)
    let medName = medication.medicationName;
    let medDescription = medication.medDescription;
    let medFrequency = medication.medFrequency;

    return(
        // <div className='d-flex flex-row justify-content-between border-bottom col-12'>
        //     <div className='px-2'>
        //         {/* left side of card -- NEED TO UPDATE WHEN DB STUFF IS IN */}
        //         <div className='d-flex flex-row justify-content-between mt-1'>
        //             <p className='fw-bold mb-0'>{ medName }</p>
        //             <p className='m-0'>{ medFrequency  + "x"}</p>
        //         </div>
        //         <p className='text-black-50'>{ medDescription }</p>
        //     </div>
        //     <div>
        //         <button className="btn btn-success">Status</button>
        //     </div>
        // </div>

        <div>
            <Row className='my-2'>
                <Col className='col-6'>
                    { medName }
                </Col>
                <Col className='col-2'>
                    { medFrequency  + "x"}
                </Col>
                <Col className='col-4'>
                    <Button variant='success'>Status</Button>
                </Col>
            </Row>
            <Row className='text-black-50 my-2'>
                <Col>
                    { medDescription }
                </Col>
            </Row>
        </div>
                
    );
}

function AddNewMedication () {

    /* FUNCTION to add "add medication" content after pressing add medication button */
    function medInputs() {
        var medicationDiv = document.getElementById('medication-input');
        var addMedButton = document.getElementById('addMedicationBtn');

        addMedButton.style.display = 'none';  // This hides the button

        
    
        medicationDiv.innerHTML = `<div id='medInputForm' class='py-2'>
            <div class='d-flex flex-row justify-content-between py-1'>
                <label for='medicationNameInput'>Medication Name:</label>
                <input type='text' id='medicationNameInput' required />
            </div>

            <div class='d-flex flex-row justify-content-between py-1'>
                <label for='medFrequencyInput'>Daily Frequency:</label>
                <input type='number' id='medFrequencyInput' min="0" max="100" step="1" required />
            </div>
            
            <div class='d-flex flex-column justify-content-between py-1'>
                <label for='medDescriptionInput'>Description:</label>
                <textarea id='medDescriptionInput' rows="4" cols="50" wrap="soft"></textarea>
            </div>

            <div class='d-flex justify-content-left mt-2'>
                <button id='submitBtn' class="btn btn-success" disabled>Submit</button>
            </div>
        </div>`;

        // submit event handler
        var submitBtn = document.getElementById("submitBtn");
        submitBtn.addEventListener("click", submitMedication);

        // listening to make sure the fields are filled
        document.getElementById('medicationNameInput').addEventListener('input', checkForm);
        document.getElementById('medFrequencyInput').addEventListener('input', checkForm);
    }

    function checkForm() {
        var medicationName = document.getElementById('medicationNameInput').value;
        var medFrequency = document.getElementById('medFrequencyInput').value;
        var submitBtn = document.getElementById('submitBtn');
    
        // Enable submit button only if medication name and frequency are filled out
        if (medicationName.trim() !== "" && medFrequency.trim() !== "") {
            submitBtn.disabled = false;  // Enable button
        } else {
            submitBtn.disabled = true;  // Disable button
        }
    }

    async function submitMedication () {
        var medicationName = document.getElementById('medicationNameInput').value;
        var medDescription = document.getElementById('medDescriptionInput').value;
        var medFrequency = document.getElementById('medFrequencyInput').value;
        var medicationDiv = document.getElementById('medication-input');
        var addMedButton = document.getElementById('addMedicationBtn');

        medicationDiv.innerHTML = "";
        addMedButton.style.display = 'block';

        // take the input elements and put into db

        try {
            // CHANGE LATER -- NEEDS TO NOT BE ABSOLUTE URL PATH
            await fetchJSON("http://localhost:3001/api/medication", {
                method: "POST",
                body: {
                    name : medicationName,
                    description : medDescription,
                    frequency : medFrequency
                }
            })

        } catch (error) {
            console.error("Error saving count:", error);
        }
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