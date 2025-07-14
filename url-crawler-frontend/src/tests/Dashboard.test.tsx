import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Dashboard from "../pages/Dashboard";

test("renders dashboard", () => {
  render(<Dashboard />);
  expect(screen.getByText(/URL Dashboard/i)).toBeInTheDocument();
});
