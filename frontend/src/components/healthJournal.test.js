import React from 'react';
import { render, screen } from '@testing-library/react';
import HealthJournal from './healthJournal.js';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

describe("Unit: Health Journal Page", () => {
  test("renders health journal without errors", () => {
    render(
      <MemoryRouter>
        <HealthJournal />
      </MemoryRouter>
    );
    expect(screen.getByText("How are you doing today? Write a journal entry to document how you feel emotionally, mentally, and/or physically")).toBeInTheDocument(); //assertion
  })
});