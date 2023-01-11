import React from 'react';
// import {render, fireEvent, screen } from '@testing-library/react';
import jest from 'jest';

import RatingsReviews from '../../client/src/components/ratingsReviews/RatingsReviews.jsx';
import ReviewsList from '../../client/src/components/ratingsReviews/list/ReviewsList.jsx';

test('Heading should be Review Section', () => {
  expect('Review Section').toBe('Review Section');
});