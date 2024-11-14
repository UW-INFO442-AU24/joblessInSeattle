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
import React from "react";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom"
>>>>>>> c9a5877 (added react routing to app.js, changed dashboard laylout)
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