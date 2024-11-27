import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { NavBar } from "../frontend/Navbar.js";

const HealthJournal = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState("");

    const [diaryInfo, setDiaryInfo] = useState({
        totalEntries: [],
        entry: "",
    });

    const handleInputChange = (e) => {
        // the entry obj and the value of the entry
        const { name, value } = e.target;
        // sets the diary entry as an arr; takes the new entry and adds it to the existing arr
        setDiaryInfo((prevEntry) => ({...prevEntry, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const utcDate = new Date().toISOString(); // standard time (consistency)
        const localDate = new Date(utcDate).toLocaleDateString(); // local time for user

        const newEntry = {
            text: diaryInfo.entry,
            date: localDate // this will collect the date autpmatically
        };

        try {
            await axios.post("http://localhost:5000/api/entries", newEntry);

            setDiaryInfo((prevState) => ({
                ...prevState, 
                totalEntries: [...prevState.totalEntries, newEntry], 
                entry: ""
            }));

            console.log("form submitted");
            console.log("Entry saved successfully");
        } catch (err) {
            console.error("Error saving entry: ", err);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/healthStats')
        .then((res) => {
            if(!res.ok) {
                throw new Error("Network response was not okay");
            }
            return res.json();
        })
        .then((data) => {
            setApiResponse(data);
        })
        .catch((error) => {
            console.log(error.message);
            setError(error.message);
        });
    }, []);

    return (
        <div>
            <Col className='m-4'>
                <h1>Health Journal</h1>
                {/* add error display and loading display */}
                <Form onSubmit={handleSubmit} className="my-2">
                    <Form.Label htmlFor="entry">How are you doing today? Write a journal entry to document how you feel emotionally, mentally, and/or physically</Form.Label>
                    <Form.Control
                        as="textarea" 
                        rows={20}
                        placeholder="I feel refreshed because..."
                        aria-label="Text box to input diary entry about your day"
                        onChange={handleInputChange}
                        className="my-2"
                    />
                    <Button variant="primary" className="my-2" onSubmit={handleSubmit}>Submit</Button>
                </Form>
            </Col>
            <NavBar></NavBar>
        </div>
    );
}

export default HealthJournal;