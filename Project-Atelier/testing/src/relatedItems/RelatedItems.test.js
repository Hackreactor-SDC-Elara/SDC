/* snapshot test way
import React from "react";
import * as rend from "react-test-renderer";
describe("single card", function () {
  it ("snapshot should have related items components", function () {
    const component = rend.create(
      <RelatedItems productId={71697}/>
      );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
  });
});
*/

import React from "react";
import {rest} from 'msw';
import {setupServer} from 'msw/node';

import '@testing-library/jest-dom';

import {render, fireEvent, waitFor, screen} from "@testing-library/react";


import RelatedItems from "../../../client/src/components/relatedItems.jsx";


// import OutfitList from "../../client/src/components/relatedItems/OutfitList.jsx";
// import ComparisonModal from "../../client/src/components/relatedItems/ComparisonModal.jsx";




/**************** RelatedItems.jsx test ***********************/

describe("RelatedItems", () => {

  const server = setupServer(
    rest.get('/products/71697/related', (req, res, ctx) => {
      return res(ctx.json({data:[71700, 71705]}));
    }),
    rest.get('/products/71697', (req, res, ctx) => {
      return res(ctx.json({data:{}}));
    }),
    rest.get('/products/12345/related', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get('/products/12345', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("load and display related products list", () => {
    render(<RelatedItems productId={71697}/>)
    expect(screen.getByText("RELATED PRODUCTS")).toBeInTheDocument();
  })

  //worst case, console.log( hard to test, optimizing until time enough)
  // it("shouldn't load single card", () => {
  //   render(<RelatedItems productId={12345}/>)
  //   expect().toBeInTheDocument();
  // })
});
