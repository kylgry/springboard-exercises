import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Box from "./Box"

it("renders without crashing", function() {
  render(
    <Box bgColor='green' width={100} height={100} />)
})

it("matches snapshot", function() {
  const { asFragment } = render(<Box bgColor='green' width={100} height={100} />)
  expect(asFragment()).toMatchSnapshot()
})
