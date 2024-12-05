import React from 'react';
import { render, screen } from '@testing-library/react';
import MedicationTracker from './MedicationTracker.js';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

describe("Unit: Medications Page", () => {
  test("renders medications page without errors", () => {
    render(
      <MemoryRouter>
        <MedicationTracker />
      </MemoryRouter>
    );
    expect(screen.getByText("Medications")).toBeInTheDocument(); //assertion
  })
});
