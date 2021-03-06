import React from 'react';
import { render, fireEvent, within } from "@testing-library/react";
import CreatePuzzleModal from './CreatePuzzleModalContent';

afterEach(() => {
    jest.clearAllMocks();
});  

test('can select difficulty on modal', async () => {
    const createGame = jest.fn();
    const {getAllByRole} = render(<CreatePuzzleModal createGame={createGame}/>);
    fireEvent.mouseDown(getAllByRole('button')[0]);
    const listbox = within(getAllByRole('listbox')[0]);
    fireEvent.click(listbox.getByText(/Warmup/i));
    expect(getAllByRole('button')[0]).toHaveTextContent(/Warmup/i);
});

test('submit calls createGame', async () => {
    const createGame = jest.fn();
    const {getAllByTestId, getAllByRole} = render(<CreatePuzzleModal createGame={createGame}/>);
    fireEvent.mouseDown(getAllByRole('button')[0]);
    const listbox = within(getAllByRole('listbox')[0]);
    fireEvent.click(listbox.getByText(/Warmup/i));
    fireEvent.click(getAllByTestId('create-btn')[0]);
    expect(createGame).toHaveBeenCalledTimes(1);
});

test('can input email on modal', async () => {
    const createGame = jest.fn();
    const {getAllByTestId, getAllByRole} = render(<CreatePuzzleModal createGame={createGame}/>);
    fireEvent.mouseDown(getAllByRole('button')[0]);
    const listbox = within(getAllByRole('listbox')[0]);
    fireEvent.click(listbox.getByText(/Warmup/i));
    const inputBox = within(getAllByTestId('modal-section')[0]).getAllByRole('textbox')[0];
    fireEvent.change(inputBox, { target: { value: 'janedoe@gmail.com,bobsmith@gmail.com' } });
    fireEvent.click(getAllByTestId('create-btn')[0]);
    expect(createGame).toHaveBeenCalledTimes(1);
});