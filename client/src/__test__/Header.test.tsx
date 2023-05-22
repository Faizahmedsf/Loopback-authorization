// src/setupTests.js
import {
  fireEvent,
  screen,
} from "@testing-library/react";
import { server } from "../../__Mocks__/Server";
import Header from "../Components/Header/Header";
import { renderWithProviders } from "../../__utils__/utils.test";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("User", () => {
  renderWithProviders(<Header />);

  test("fetches and rendering user", async () => {
    const textEle = screen.getByText("Click Load User to see the Data!!");
    expect(textEle).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Load User/i }));
    expect(
      screen.queryByText("Click Load User to see the Data!!")
    ).not.toBeInTheDocument();
    expect(await screen.findByText("paul")).toBeInTheDocument();
  });


});
