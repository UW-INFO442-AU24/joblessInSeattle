import React, { useEffect, useState } from 'react';

const App = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Make the API call to the backend
    fetch('http://localhost:3001/api/water')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setApiResponse(data); // Update state with the API response
      })
      .catch((error) => {
        setError(error.message); // Handle errors
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Welcome to DayMax</h1>
      {/* Render the API response or error message */}
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : apiResponse ? (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
