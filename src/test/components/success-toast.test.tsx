import SuccessToast from "../../components/success-toast"
import { render, screen } from "../utils/test-utils"

describe("Success toast", async () => {
	it('should say "success"', () => {
		render(<SuccessToast />)

		expect(screen.getByText("success")).toBeInTheDocument()
	})
})
