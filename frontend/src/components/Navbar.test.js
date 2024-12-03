import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
//import Navbar from './Navbar.js';
import userEvent from "@testing-library/user-event";
import Dashboard from './Dashboard.js';
import ResourcesPage from './ResourcesPage.js';
import "@testing-library/jest-dom";

describe("Unit: NavBar navigation", () => {
//   test("renders buddy without errors", () => {
//     render(
//       <MemoryRouter>
//         <Navbar />
//       </MemoryRouter>
//     );
//     // NOTE TO SELF, GET BY TEXT WONT WORK BC NAVBAR DOESNT HAVE TEXT
//     expect(screen.getByText("My Buddy")).toBeInTheDocument(); //assertion
//   })

  test("navigate to water tracker", async () => {
      render(
          <MemoryRouter initialEntries={["/dashboard"]}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resources" element={<ResourcesPage />} />
            </Routes>
          </MemoryRouter>
      ); //render into testing DOM!

        // On Dashboard Page
        expect(screen.getByText("MY DASHBOARD")).toBeInTheDocument(); //assertion

        // Navigate to Water Tracker
        //const link = screen.getByAltText("Resources");
        const image = screen.getByRole('img', { name: /Resources/i });
        await userEvent.click(image)

        await waitFor(() => {
          expect(screen.getByText("Latest Health News")).toBeInTheDocument();
        })   
    })
});