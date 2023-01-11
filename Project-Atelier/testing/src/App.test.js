import React from "react";
import render from "react-test-renderer";
import App from "../../client/src/components/App.jsx";


describe("App Component", function () {
  it("should have hello world message", function () {
    console.log(App);
    console.log(render.create(<App />));
    // const component = renderer.create(
    //   <App page="http://www.facebook.com">Facebook</App>,
    // );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    // let getByText = renderer(<App />);
    // expect(getByText("Hello World")).toMatchInlineSnapshot(`
    //   <h1>
    //     Hello world
    //   </h1>
    // `);
  });
});