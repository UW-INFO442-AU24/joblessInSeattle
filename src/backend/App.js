import React from "react";
//import Dashboard from '../frontend/Dashboard.js';
//<Dashboard></Dashboard>
import WaterTracker from "../frontend/WaterTracker";
//<WaterTracker></WaterTracker>


const App = ({ auth }) => {
    return (
        <div>
            <WaterTracker></WaterTracker>
        </div>
    );
};

export default App;