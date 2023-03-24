import React from 'react';

import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App';

afterEach(() => {
  cleanup();
})

test('App renders successfully', () => {
  render(<App />);

  expect(screen).toBeDefined();
});

test('App renders with expected title: Tenzies', () => {
  render(<App />);

  expect(screen.getByText('Tenzies')).toBeInTheDocument();
});
