import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export default function HealthJournal() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState("");

    const [diaryInfo, setDiaryInfo] = useState({
        totalEntries: [],
        entry: "",
    });

    const [userId, setUserId] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                console.error("User not logged in");
            }
        });
        return () => unsubscribe();
    }, []);

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

        if (!userId) {
            console.error("No user ID available");
            return;
        }

        const newEntry = {
            entry: diaryInfo.entry,
            date: localDate, // this will collect the date autpmatically
            user_id: userId
        };

        try {
            await axios.post(`http://localhost:3001/api/diary`, newEntry, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setDiaryInfo((prevState) => ({
                ...prevState, 
                totalEntries: [...prevState.totalEntries, newEntry], 
                entry: "",
            }));

            console.log("form submitted");
            console.log("Entry saved successfully");
        } catch (err) {
            console.error("Error saving entry: ", err.response ? err.response.data : err);
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/diary`)
        .then((res) => {
            if (res.status === 200) {
                setApiResponse(res.data);
            } else {
                throw new Error("Network response was not okay");
            }
        }).catch((error) => {
            console.log(error.message);
            setError(error.message);
        });
    }, [apiUrl, userId, apiResponse]);

    return (
        <div>
            <Col className='m-4'>
                <h1>Health Journal</h1>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <Form onSubmit={handleSubmit} className="my-2">
                    <Form.Label htmlFor="entry">How are you doing today? Write a journal entry to document how you feel emotionally, mentally, and/or physically</Form.Label>
                    <Form.Control
                        as="textarea" 
                        rows={10}
                        placeholder="I feel refreshed because..."
                        aria-label="Text box to input diary entry about your day"
                        name="entry"
                        value={diaryInfo.entry}
                        onChange={handleInputChange}
                        className="my-2"
                    />
                    <Button variant="primary" className="my-2" type="submit">Submit</Button>
                </Form>

                <div>
                    <h2>Previous Entries</h2>
                    {diaryInfo.totalEntries.length > 0 ? (
                        <ul>
                            {diaryInfo.totalEntries.map((entry, id) => (
                                <li key={id}>
                                    <strong>{entry.date}</strong>: {entry.entry}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Start Journaling!</p>
                    )}
                </div>
            </Col>
            <NavBar />
        </div>
    );
}

