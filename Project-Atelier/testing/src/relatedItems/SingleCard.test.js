import SingleCard from "../../../client/src/components/relatedItems/SingleCard.jsx";
import React from "react";
import {rest} from 'msw';
import {setupServer} from 'msw/node';
jest.mock('../../../client/src/components/relatedItems/Modal.jsx', () => () =>
<div data-testid="modal"/>
)
import '@testing-library/jest-dom';

import {render, fireEvent, waitFor, screen} from "@testing-library/react";


import RelatedItems from "../../../client/src/components/relatedItems.jsx";





/**************** SIngleCard.jsx test ***********************/

describe("SingleCard", () => {

  const server = setupServer(
    rest.get('/products/71697', (req, res, ctx) => {
      return res(ctx.json({name: "test1", category: "sport", features: 0}));
    }),
    rest.get('/products/71697/styles', (req, res, ctx) => {
      return res(ctx.json({results:[{
        "default?": true,
        "original_price": "140.00",
        "sale_price": null,
        "photos": [{
          "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      }]
      }] }));
    }),
    rest.get('/reviews/meta?product_id=71697', (req, res, ctx) => {
      return res(ctx.json({ratings:
        {
        "1": "39",
        "2": "21",
        "3": "39",
        "4": "43",
        "5": "101"
        }
      }));
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("load and display related products list", async () => {
    render(<SingleCard icon={'star'} id={71697}/>);
    expect(screen.getByText("NAME")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("test1")).toBeInTheDocument();
    })
  })

  //worst case, console.log( hard to test, optimizing until time enough)
  // it("shouldn't load single card", () => {
  //   render(<RelatedItems productId={12345}/>)
  //   expect().toBeInTheDocument();
  // })
});
