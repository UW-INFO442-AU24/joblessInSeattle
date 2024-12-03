import React from "react";
import { Routes, Route } from 'react-router-dom'

//import components
import Dashboard from "./components/Dashboard.js"
import WaterTracker from "./components/WaterTracker.js"
import SleepTracker from "./components/SleepTracker.js"
import HealthJournal from "./components/HealthJournal.js";
import MyBuddy from "./components/MyBuddy.js";
import MedicationTracker from "./components/MedicationTracker.js";
import ResourcesPage from "./components/ResourcesPage.js";
import Login from "./components/Login.js";
import Signup from "./components/SignUp.js";
import ErrorPage from "./components/ErrorPage.js"

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ <Login/> } />
                <Route path="/login" element={ <Login/> } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={ <Dashboard/> } />
                <Route path="/watertracker" element={ <WaterTracker/> } />
                <Route path="/sleeptracker" element={ <SleepTracker/> } />
                <Route path="/healthjournal" element={ <HealthJournal/> } />
                <Route path="/medications" element={ <MedicationTracker/> } />
                <Route path="/buddy" element={ <MyBuddy/> } />
                <Route path="/resources" element={ <ResourcesPage /> } />
                <Route path="/*" element={ <ErrorPage /> } />
            </Routes>
            <div id="errorInfo" style={{opacity: 0, transition: 'opacity 0.5s ease', color: 'red',}}/>
        </div>
    );
};

export default App;
