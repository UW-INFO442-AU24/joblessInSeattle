import React from "react";
import {Routes, Route} from 'react-router-dom'
import SleepTracker from "../frontend/sleepTracker.js";
import { NavBar } from "../frontend/Navbar.js";
import Dashboard from '../frontend/Dashboard.js'

const App = ({ auth }) => {
    return (
        <div>
            <SleepTracker></SleepTracker>
            <NavBar/>
            {/* <Routes>
                <Route path="home" element={<Dashboard />} />
            </Routes> */}
        </div>
    );
};

export default App;