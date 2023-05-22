import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateUser from "../Components/Create User/CreateUser";
import { renderWithProviders } from "../../__utils__/utils.test";


describe("Validation testing for form", () => {
  renderWithProviders(<CreateUser />);
  const user = userEvent.setup();

  it("Validation Testing of Field First Name", async () => {
    // it will passs the test coz max input value is 10 and here we are passing more than 10 character values
    await user.type(
      screen.getByLabelText(/First Name/i),
      "Faiz Ahmed Choudhary"
    )
    fireEvent.click(screen.getByRole("button", { name: /Add User/i }));
    expect(
      await screen.findByText("firstName must be at most 10 characters")
    ).toBeInTheDocument();
  });

  it("Validation Test for Email", async () => {
    await user.type(screen.getByLabelText(/Email/i), "Faiz mail.com");
    fireEvent.click(screen.getByRole("button", { name: /Add User/i }));
    expect(
      await screen.findByText("Invalid Email Address")
    ).toBeInTheDocument();
  });
});
