import React from "react";
import { Routes, Route } from 'react-router-dom'

//import components
import Dashboard from "./components/Dashboard.js"
import WaterTracker from "./components/WaterTracker.js"
import SleepTracker from "./components/sleepTracker.js"
import HealthJournal from "./components/healthJournal.js";
import MyBuddy from "./components/myBuddy.js";
import MedicationTracker from "./components/medicationTracker.js";
import ResrourcesPage from "./components/ResourcesPage.js"

// import login from "./components/login.js"

const App = () => {
  // return (
  //   <div>
  //     <h1>Welcome to DayMax</h1>
  //     {/* Render the API response or error message */}
  //     {error ? (
  //       <p style={{ color: 'red' }}>Error: {error}</p>
  //     ) : apiResponse ? (
  //       <div>
  //         <h2>API Response:</h2>
  //         <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
  //       </div>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );
    return (
        <div className="App">
                <Routes>
                    <Route path="/" element={ <Dashboard/> } />
                    <Route path="/dashboard" element={ <Dashboard/> } />
                    <Route path="/watertracker" element={ <WaterTracker/> } />
                    <Route path="/sleeptracker" element={ <SleepTracker/> } />
                    <Route path="/healthjournal" element={ <HealthJournal/> } />
                    <Route path="/medications" element={ <MedicationTracker/> } />
                    <Route path="/buddy" element={ <MyBuddy/> } />
                    <Route path="/resources" element={ <ResrourcesPage/> } />
                </Routes>
                <div id="errorInfo" style={{opacity: 0, transition: 'opacity 0.5s ease', color: 'red',}}/>
        </div>
    );
};

export default App;
