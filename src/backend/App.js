import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
//import Dashboard from '../frontend/Dashboard.js';
//<Dashboard></Dashboard>
//import WaterTracker from "../frontend/WaterTracker";
//<WaterTracker></WaterTracker>

//import components
import Dashboard from "../frontend/Dashboard"
import WaterTracker from "../frontend/WaterTracker"

function App() {
    return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <Dashboard/> } />
                        <Route path="watertracker" element={ <WaterTracker/> } />
                        {/* <Route path="contact" element={ <Contact/> } /> */}
                    </Routes>
               </BrowserRouter>
            </div>
    )
};

export default App;