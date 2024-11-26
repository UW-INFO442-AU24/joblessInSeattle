import React from 'react';
import { NavBar } from './frontend/Navbar';

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
        <main>
            <NavBar />
            <section className='hero-section text-center'>
            <h1 className='font-semibold text-6xl'>Welcome to DayMax</h1>
            </section>
            {/* more structuring logic/page setup here */}
        </main>
    );
};

export default App;
