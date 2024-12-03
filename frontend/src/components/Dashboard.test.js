import "@testing-library/jest-dom";
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from './Dashboard.js';
import WaterTracker from "./WaterTracker";
import SleepTracker from "./SleepTracker.js";
// import HealthJournal from "./components/healthJournal.js";
// import MyBuddy from "./components/myBuddy.js";
import MedicationTracker from "./MedicationTracker.js";
// import ResrourcesPage from "./components/ResourcesPage.js"


describe("Unit: Dashboard Page", () => {
  test("renders dashboard without errors", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(screen.getByText("MY DASHBOARD")).toBeInTheDocument(); //assertion
  })

  test("navigate to water tracker", async () => {
      render(
          <MemoryRouter initialEntries={["/dashboard"]}>
            {/* Set up routes inside MemoryRouter */}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/watertracker" element={<WaterTracker />} />
            </Routes>
          </MemoryRouter>
      ); //render into testing DOM!

        // On Dashboard Page
        expect(screen.getByText("MY DASHBOARD")).toBeInTheDocument(); //assertion

        // Navigate to Water Tracker
        const link = screen.getByTestId("watertracker-box");
        await userEvent.click(link)

        await waitFor(() => {
          expect(screen.getByText("Water Tracker")).toBeInTheDocument();
        })   
    })

  test("navigate to sleep tracker", async () => {
  render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        {/* Set up routes inside MemoryRouter */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sleeptracker" element={<SleepTracker />} />
        </Routes>
      </MemoryRouter>
  ); //render into testing DOM!

    // On Dashboard Page
    expect(screen.getByText("MY DASHBOARD")).toBeInTheDocument(); //assertion

    // Navigate to Sleep Tracker
    const link = screen.getByTestId("sleeptracker-box");
    await userEvent.click(link)

    await waitFor(() => {
      expect(screen.getByText("Going to Bed?")).toBeInTheDocument();
    })
  })

  test("navigate to medication", async () => {
  render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        {/* Set up routes inside MemoryRouter */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medications" element={ <MedicationTracker/> } />
        </Routes>
      </MemoryRouter>
  ); //render into testing DOM!

    // On Dashboard Page
    expect(screen.getByText("MY DASHBOARD")).toBeInTheDocument(); //assertion

    // Navigate to Medication Page
    const link = screen.getByTestId("medication-box");
    await userEvent.click(link)

    await waitFor(() => {
      expect(screen.getByText("Medication List")).toBeInTheDocument();
    })
  })

})