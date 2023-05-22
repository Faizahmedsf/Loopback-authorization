import { screen, render } from "@testing-library/react";
import NotFound from "../Components/NotFound/NotFound";

describe("Not Found test" , () => {

    test("Render notFound Comp" ,  () => {
        render(<NotFound />)
        let renderElement = screen.getByText("Page Not Found 404")
        expect(renderElement).toBeInTheDocument()
    })

})
