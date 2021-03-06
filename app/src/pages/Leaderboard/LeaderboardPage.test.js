import React from 'react';
import { render, screen } from "@testing-library/react";
import LeaderboardPage from './LeaderboardPage.js';
import { PLAYERS, EMPTY_PLAYERS } from '../../data/mock_leaderboard_data.js';

afterEach(() => {
  jest.clearAllMocks();
});

function setupFetchStub(data) {
  return function fetchStub(_url) {
    return Promise.resolve({
      json: () => Promise.resolve({ players: data }),
    })
  }
}

function setupUndefinedFetchStub() {
  return function fetchStub(_url) {
    return Promise.resolve({
      json: () => Promise.resolve({ }),
    })
  }
}

test('renders with empty leaderboard message', async () => {
  jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(EMPTY_PLAYERS));
  render(<LeaderboardPage />);
  const emptyMessage = await screen.findAllByText(/No players have finished a game./);
  expect(emptyMessage).toHaveLength(1);
});

test('renders with DataGrid table', async () => {
  jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(PLAYERS));
  render(<LeaderboardPage />);
  const emptyMessage = screen.queryByText('No players have finished a game.')
  expect(emptyMessage).toBeNull()
  const leaderboardTable = await screen.findAllByTestId('datagrid');
  expect(leaderboardTable).toHaveLength(1);
});

test('renders empty with undefined response', async () => {
  jest.spyOn(global, "fetch").mockImplementation(setupUndefinedFetchStub());
  render(<LeaderboardPage />);
  const emptyMessage = await screen.findAllByText(/No players have finished a game./);
  expect(emptyMessage).toHaveLength(1);
});