import React from 'react';
import { render, screen } from '@testing-library/react';
import SleepTracker from './SleepTracker.js';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

describe("Unit: Sleep Page", () => {
  test("renders sleep without errors", () => {
    render(
      <MemoryRouter>
        <SleepTracker/>
      </MemoryRouter>
    );
    // THIS TEST WILL FAIL
    expect(screen.getByText("Going to Bed?")).toBeInTheDocument(); //assertion
  })
});