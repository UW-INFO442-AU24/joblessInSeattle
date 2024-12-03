import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import ResourcesPage from './ResourcesPage.js';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";

describe("Unit: Resources Page", () => {
  test("renders resources page without errors", () => {
    render(
      <MemoryRouter>
        <ResourcesPage />
      </MemoryRouter>
    );
    async () => await waitFor(() => screen.getByText("Latest Health News"));
    //expect(screen.getByText("Latest Health News")).toBeInTheDocument(); //assertion
  })
});