import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'

import QuestionsAnswers from "../../client/src/components/QuestionsAnswers.jsx";



//<QuestionsAnswers productId={this.state.product_id} />
test('test for mount', async () => {
  // ARRANGE
  const { getByText } = render(<QuestionsAnswers />);

  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  //await screen.findByRole('heading')

  // ASSERT
  expect(getByText('QUESTIONS & ANSWERS')).toBeInTheDocument();
  //expect(screen.getByRole('button')).toBeDisabled()
})