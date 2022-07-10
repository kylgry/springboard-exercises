import React from "react"
import { render, fireEvent } from "@testing-library/react"
import BoxList from "./BoxList"

it("renders without crashing", function() {
  render(
    <BoxList  />)
})

it("matches snapshot", function() {
  const { asFragment } = render(<BoxList />)
  expect(asFragment()).toMatchSnapshot()
})

it("can add a new item", function() {
  const { getByLabelText, queryByText, container } = render(<BoxList />)

  // no items should exist yet
  expect(container.getElementsByClassName('Box').length).toBe(0)

  const bgColorInput = getByLabelText("color")
  const widthInput = getByLabelText("width")
  const heightInput = getByLabelText("height")
  const submitBtn = queryByText("add a new box")

  // fill out the form
  fireEvent.change(bgColorInput, { target: { value: "red" }})
  fireEvent.change(widthInput, { target: { value: 100 }})
  fireEvent.change(heightInput, { target: { value: 100 }})
  fireEvent.click(submitBtn)

  // item exists!
  expect(container.getElementsByClassName('Box').length).toBe(1)
});

it("can remove an item", function() {
  const { getByLabelText, queryByText, container } = render(<BoxList />)

  const bgColorInput = getByLabelText("color")
  const widthInput = getByLabelText("width")
  const heightInput = getByLabelText("height")
  const submitBtn = queryByText("add a new box")

  // create new box
  fireEvent.change(bgColorInput, { target: { value: "red" }})
  fireEvent.change(widthInput, { target: { value: 100 }})
  fireEvent.change(heightInput, { target: { value: 100 }})
  fireEvent.click(submitBtn)

  expect(container.getElementsByClassName('Box').length).toBe(1)

  // click x to delete
  const delBtn = queryByText("x")
  fireEvent.click(delBtn)

  // expect no more box
  expect(container.getElementsByClassName('Box').length).toBe(0)
});
