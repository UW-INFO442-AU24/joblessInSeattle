import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WaterTracker from './WaterTracker.js';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Unit: Water Page", () => {
  test("renders water without errors", () => {
    render(
      <MemoryRouter>
        <WaterTracker/>
      </MemoryRouter>
    );
    expect(screen.getByText("Water Tracker")).toBeInTheDocument(); //assertion
  })

  test("add 8 fl oz of water", async () => {
    render(
      <MemoryRouter>
        <WaterTracker/>
      </MemoryRouter>
    );
    const addButton = screen.getByTestId("addition-button");
    const waterAmount = screen.getByTestId("waterCounter"); 

    expect(screen.getByText("Water Tracker")).toBeInTheDocument(); //assertion
    expect(waterAmount).toHaveTextContent("0 fl oz");
    
    //click the add button, add 8 fl oz
    await userEvent.click(addButton);
    await waitFor(() => {
        expect(waterAmount).toHaveTextContent("8 fl oz");
    });
  })

  test("add 16 fl oz of water, then subtract 8 fl oz", async () => {
    render(
      <MemoryRouter>
        <WaterTracker/>
      </MemoryRouter>
    );
    const subButton = screen.getByTestId("subtract-button");
    const addButton = screen.getByTestId("addition-button");
    const waterAmount = screen.getByTestId("waterCounter"); 

    expect(screen.getByText("Water Tracker")).toBeInTheDocument(); //assertion
    expect(waterAmount).toHaveTextContent("0 fl oz");
    
    //click the add button, add 8 fl oz
    await userEvent.click(addButton);
    await waitFor(() => {
        expect(waterAmount).toHaveTextContent("8 fl oz");
    });

    // 16 fl oz
    await userEvent.click(addButton);
    await waitFor(() => {
        expect(waterAmount).toHaveTextContent("16 fl oz");
    });

    await userEvent.click(subButton);
    await waitFor(() => {
        expect(waterAmount).toHaveTextContent("8 fl oz");
    });
  })
  
});