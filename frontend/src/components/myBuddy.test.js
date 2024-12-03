import React from 'react';
import { render, screen } from '@testing-library/react';
import MyBuddy from './myBuddy.js';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

describe("Unit: Buddy Page", () => {
  test("renders buddy without errors", () => {
    render(
      <MemoryRouter>
        <MyBuddy />
      </MemoryRouter>
    );
    expect(screen.getByText("My Buddy")).toBeInTheDocument(); //assertion
  })
});