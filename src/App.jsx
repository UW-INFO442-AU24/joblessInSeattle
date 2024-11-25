import React from "react";
import { Routes, Route } from 'react-router-dom'

//import components
import Dashboard from "./frontend/Dashboard.js"
import WaterTracker from "./frontend/WaterTracker.js"
import SleepTracker from "./frontend/sleepTracker.js"
import HealthJournal from "./frontend/healthJournal.js";

const App = () => {
    return (
        <div className="App">
                <Routes>
                    <Route path="/" element={ <Dashboard/> } />
                    <Route path="watertracker" element={ <WaterTracker/> } />
                    <Route path="sleeptracker" element={ <SleepTracker/> } />
                    <Route path="healthjournal" element={ <HealthJournal/> } />
                </Routes>
        </div>
    )
}

export default App;