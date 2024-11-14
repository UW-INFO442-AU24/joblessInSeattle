import React from "react";
import { Routes, Route } from 'react-router-dom'

//import components
import Dashboard from "../frontend/Dashboard"
import WaterTracker from "../frontend/WaterTracker"
import SleepTracker from "../frontend/sleepTracker"

function App() {
    return (
            <div className="App">
                    <Routes>
                        <Route path="/" element={ <Dashboard/> } />
                        <Route path="watertracker" element={ <WaterTracker/> } />
                        <Route path="sleeptracker" element={ <SleepTracker/> } />
                    </Routes>
            </div>
    )
};

export default App;