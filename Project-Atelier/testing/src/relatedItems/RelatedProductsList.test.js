jest.mock('../../../client/src/components/relatedItems/SingleCard.jsx', () => () =>
<div data-testid="single-card"/>
)

import RelatedProductsList from "../../../client/src/components/relatedItems/RelatedProductsList.jsx";

import React from "react";
import '@testing-library/jest-dom';
import {render, fireEvent, waitFor, screen} from "@testing-library/react";

/**************** RelatedProductsList.jsx test ***********************/

describe("RelatedProductsList ", () => {


  it("should contain given related products", () => {
    const {getAllByTestId} = render(<RelatedProductsList relatedItemsId={[1,2,3,4,5]}/>)

    expect(getAllByTestId(/single-card/).length).toBe(5);
  })

  //go left && get right doesn't test
})