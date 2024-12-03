import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from './SignUp.js';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

describe("Unit: Buddy Page", () => {
  test("renders buddy without errors", () => {
    render(
      <MemoryRouter>
        <Signup/>
      </MemoryRouter>
    );
    // THIS TEST WILL FAIL
    expect(screen.getByText("My Buddy")).toBeInTheDocument(); //assertion
  })
});