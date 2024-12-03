import React from 'react';
import { render, screen } from '@testing-library/react';
import ResourcesPage from './ResourcesPage';

test('renders ResourcesPage without crashing', () => {
  render(<ResourcesPage />);
  expect(screen.getByText('Latest Health News')).toBeInTheDocument();
});