import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { fetchJSON } from "./utils.js";
import { Link} from "react-router-dom";

// list of all medications
function MedicationList({ meds }) {
    return (
        // return the medication list FULL card
        <div id='medicationList'>
            {meds.length > 0 ? (
                meds.map((meds) => (
                    <MedicationLine key={meds._id} medication={meds} />
                ))
            ) : (
                <p>Loading medications...</p>
            )}
        </div>
    );
}

// function to return the html of what a single line of medication looks like
function MedicationLine ({ medication }) {
    let medName = medication.medicationName;
    let medDescription = medication.medDescription;
    let medFrequency = medication.medFrequency;

    // const [count, setCount] = useState(0);
    // const increment = () => {
    //     if (count < medFrequency) {
    //         setCount(count + 1);
    //     }
    // };

    // const decrement = () => {
    //     if (count > 0) {
    //         setCount(count - 1);
    //     }
    // };

    // const reset = () => {
    //     setCount(0);
    // };

    // const saveCounter = async () => {
    //     let medCounter = {count}.count;
    //     let lastMedTakenDate = Date.now();
        
    //     try {
    //         console.log(medCounter)
    //         // CHANGE LATER -- NEEDS TO NOT BE ABSOLUTE URL PATH
    //         await fetchJSON("http://localhost:3001/api/medication/counter", {
    //             method: "POST",
    //             body: { medCount: medCounter, medTime: lastMedTakenDate }
    //         })
    //         reset();

    //     } catch (error) {
    //         console.error("Error saving count:", error);
    //     }
    // };

    // function toggleCounterHandler () {
    //     // const increment = () => setCount(count + 1);
    //     // const decrement = () => setCount(count - 1);

    //     // const reset = () => setCount(0);
    //     saveCounter();

    //     let eventBox = document.getElementById(medName + "-buttonBox")

    //     if(eventBox.innerHTML === ''){
    //         console.log("display!")
    //         eventBox.innerHTML = `<div>
    //             <Button variant='success' className='opacity-75' onClick="${decrement}" disabled="${count<=0 ? true : false}">-</Button>
    //             <span id="waterCounter" class="mx-3 pt-2">${count}</span>
    //             <Button variant='success' className='opacity-75' onClick="${increment}" disabled="${count>medFrequency ? true : false}">+</Button>
    //         </div>`
    //     } else {
    //         console.log("hide!")
    //         saveCounter()
    //         eventBox.innerHTML = ``
    //     }
            
    // }

    return(
        <div className='mt-2 mb-3 border-bottom border-secondary'>
            <Row className='my-2'>
                <Col className='col-6'>
                    { medName }
                </Col>
                <Col className='col-2 d-flex flex-row justify-content-end'>
                    { medFrequency  + "x"}
                </Col>
                <Col className='col-4 d-flex flex-row justify-content-end'>
                    {/* onClick={toggleCounterHandler} */}
                    <Button variant='success'>Status</Button>
                </Col>
            </Row>
            <Row className='text-black-50 my-2'>
                <Col id='descriptionBox' className='col-7'>
                    { medDescription }
                </Col>
                {/* <Col id={medName + "-buttonBox"} className='col-5 d-flex flex-row justify-content-end'>
                    <Button variant='success' className='opacity-75' onClick="${decrement}" disabled="${count<=0 ? true : false}">-</Button>
                    <span id="waterCounter" class="mx-3 pt-2">${count}</span>
                    <Button variant='success' className='opacity-75' onClick="${increment}" disabled="${count>medFrequency ? true : false}">+</Button>
                </Col> */}
            </Row>
        </div>
                
    );
}

function AddNewMedication ({ onClick }) {
    const [medName, setMedname] = useState("");
    const [medFrequency, setMedFrequency] = useState("");
    const [medDescription, setMedDescription] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async () => {
        await onClick(medName, medFrequency, medDescription);
        setMedname('');
        setMedFrequency('');
        setMedDescription('');
        setShowForm(false);
    };

    const checkFormValid = medName.trim() !== "" && medFrequency.trim() !== "";

    return(
        <div>
            {!showForm ? (
                <Button className="mt-3 btn-success" id='addMedicationBtn' onClick={() => setShowForm(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                     </svg>
                    ‎ Add Medication
                </Button>
            ) : (
                <div id='medInputForm' className='py-2'>
                    <div className='d-flex flex-row justify-content-between py-1'>
                        <label htmlFor='medicationNameInput'>Medication Name:</label>
                        <input 
                            type='text'
                            class='border'
                            id='medicationNameInput'
                            value={medName}
                            onChange={(e) => setMedname(e.target.value)}
                            required
                        />
                    </div>

                    <div className='d-flex flex-row justify-content-between py-1'>
                        <label htmlFor='medFrequencyInput'>Daily Frequency:</label>
                        <input type='number'
                        class='border'
                        id='medFrequencyInput'
                        min="0"
                        max="100"
                        step="1"
                        value={medFrequency}
                        onChange={(e) => setMedFrequency(e.target.value)}
                        required />
                    </div>
                    
                    <div className='d-flex flex-column justify-content-between py-1'>
                        <label htmlFor='medDescriptionInput'>Description:</label>
                        <textarea
                            id='medDescriptionInput'
                            class='border'
                            rows="4"
                            cols="50"
                            wrap="soft"
                            value={medDescription}
                            onChange={(e) => setMedDescription(e.target.value)}
                        />
                    </div>

                    <div className='d-flex justify-content-left mt-2'>
                        <button 
                            id='submitBtn' 
                            className="btn btn-success" 
                            onClick={handleSubmit} 
                            disabled={!checkFormValid}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MedicationPage() {
    const [medications, setMedications] = useState([]);

    const goBack = () => {
        window.history.back(); // Goes back to the previous page
    };

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/medication/medications');
                const data = await response.json();
                setMedications(data);
            } catch (error) {
                console.error("Error fetching medications:", error);
            }
        };
        fetchMedications();
    }, []);  // Empty dependency array means this effect runs once when the component mounts

    const addNewMedication = async (medicationName, medFrequency, medDescription, medTakenCount, lastMedTakenDate) => {
        try {
            // CHANGE LATER -- NEEDS TO NOT BE ABSOLUTE URL PATH
            await fetchJSON("http://localhost:3001/api/medication", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    name : medicationName,
                    description : medDescription,
                    frequency : medFrequency,
                    medCount : medTakenCount,
                    medLastTaken : lastMedTakenDate
                }
            })
            
            // fetches the updated data after the adding
            const response = await fetch('http://localhost:3001/api/medication/medications');
            const data = await response.json();
            setMedications(data);  // updates the state with a new list of medications in state
        } catch(err) {
            console.err("Error saving medication: ", err);
        }
    }

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
                            <MedicationList meds={medications}/>
                            <AddNewMedication onClick={addNewMedication} />
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
            <NavBar />
        </div>
    );
}