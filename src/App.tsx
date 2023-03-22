import { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"
import SuccessToast from "./components/success-toast"
import EntranceForm from "./components/entrance-form"

function App() {
	const baseUrl = import.meta.env.VITE_BASE_URL

	const [isAuthorized, setIsAuthorized] = useState(false)
	const [userData, setUserData] = useState({ passPhrase: "", body: "" })
	const [apiRoute, setApiRoute] = useState("quotes")
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccessfulRequest, setIsSuccessfulRequest] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { name, value } = e.target
		setUserData((currentData) => ({
			...currentData,
			[name]: value,
		}))
	}

	const handleSelectFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setApiRoute(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		const url = `${baseUrl}/${apiRoute}`
		const res = await axios.post(url, {
			body: userData.body,
		})
		if (res.status === 201) setIsSuccessfulRequest(true)
		setIsLoading(false)
	}

	// add logic to remove successful / error toast every so often
	useEffect(() => {
		const removeToast = () => {
			setTimeout(() => {
				const toastElement = document.querySelector(".toast-success")
				if (toastElement) {
					setIsSuccessfulRequest(false)
				}
				return
			}, 1500)
		}
		removeToast()
	}, [isSuccessfulRequest])

	return (
		<div className="App">
			{!isAuthorized ? (
				<EntranceForm
					setUserData={setUserData}
					userData={userData}
					setIsAuthorized={setIsAuthorized}
				/>
			) : (
				<main id="logged-in-main">
					{isSuccessfulRequest ? <SuccessToast /> : null}

					<p>What would you like to add?</p>
					<p> A quote to be said by the bot or a keyword to trigger the bot?</p>
					<select onChange={handleSelectFieldChange}>
						<option value="quotes">Quote</option>
						<option value="keywords">Keyword</option>
					</select>

					<form onSubmit={handleSubmit}>
						<label htmlFor="body-input">
							Enter {apiRoute.substring(0, apiRoute.length - 1)}
						</label>
						<input
							type="text"
							placeholder={apiRoute.substring(0, apiRoute.length - 1)}
							id="body-input"
							name="body"
							onChange={handleChange}
						/>
						<input type="submit" value="Submit" />
					</form>
				</main>
			)}
		</div>
	)
}

export default App
