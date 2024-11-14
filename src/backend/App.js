import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SleepTracker from "../frontend/sleepTracker.js";
import { NavBar } from "../frontend/Navbar.js";
import Dashboard from '../frontend/Dashboard.js'


//import components
import Dashboard from "../frontend/Dashboard"
import WaterTracker from "../frontend/WaterTracker"
import SleepTracker from "../frontend/sleepTracker"

function App() {
    return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <Dashboard/> } />
                        <Route path="watertracker" element={ <WaterTracker/> } />
                        <Route path="sleepTracker" element={ <SleepTracker/> } />
                    </Routes>
               </BrowserRouter>
            </div>
    )
};

export default App;