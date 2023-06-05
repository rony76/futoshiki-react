import React from 'react';
import {render, screen} from '@testing-library/react';
import GameBoard from "./GameBoard";
import {createSampleGame} from "../../model/SampleGame";

test('renders fixed cell', () => {
  const onUserValue = jest.fn();
  render(<GameBoard  game={createSampleGame()} onUserValue={onUserValue}/>);

  const fixedCell = screen.getByText("2");
  expect(fixedCell).toBeInTheDocument();
});
