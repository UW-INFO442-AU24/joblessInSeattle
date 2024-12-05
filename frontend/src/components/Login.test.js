import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './login.js';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util';

describe("Unit: Login Page", () => {
  test("renders login page without errors", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText("Welcome to DayMax")).toBeInTheDocument(); //assertion
  })
});

