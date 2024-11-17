import React, { useState } from "react";
import axios from "axios";

const HealthJounral = () => {

    const [diaryInfo, setDiaryInfo] = useState({
        totalEntries: [],
        entry: "",
    });

    const handleInputChange = (e) => {
        // the entry obj and the value of the entry
        const { entry, value } = e.target;
        // sets the diary entry as an arr; takes the new entry and adds it to the existing arr
        setDiaryInfo((prevEntry) => ({...prevEntry, [entry]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEntry = {
            text: diaryInfo.entry,
            date: new Date().toLocaleDateString() // this will collect the date autpmatically
        }

        try {
            await axios.post("http://localhost:5000/api/entries", newEntry);

            setDiaryInfo((prevState) => ({...prevState.totalEntries, newEntry}))
            console.log("form submitted");

            console.log("Entry saved successfully");
        } catch (err) {
            console.error("Error saving entry: ", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="entry">How are you feeling today?</label>
                <textarea
                    id="entry"
                    name="entry"
                    value={diaryInfo.entry}
                    onChange={handleInputChange}
                    placeholder="I am feeling refreshed because..."
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default HealthJounral;