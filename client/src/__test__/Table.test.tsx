import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../__utils__/utils.test'
import Table from '../Components/Table/Table'

describe("User", () => {
  test("Render", () => {
    renderWithProviders(<Table />);
    const textEle = screen.getByText("List of users");
    expect(textEle).toBeInTheDocument();
  });

})