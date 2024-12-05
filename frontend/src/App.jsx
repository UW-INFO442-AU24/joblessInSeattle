import React from "react";
import { Routes, Route } from 'react-router-dom'

//import components
import Dashboard from "./components/Dashboard"
import WaterTracker from "./components/WaterTracker"
import SleepTracker from "./components/SleepTracker"
import HealthJournal from "./components/HealthJournal";
import MyBuddy from "./components/MyBuddy";
import MedicationTracker from "./components/MedicationTracker";
import ResourcesPage from "./components/ResourcesPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ErrorPage from "./components/ErrorPage"

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
