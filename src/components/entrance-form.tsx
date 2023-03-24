type Props = {
	setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
	setUserData: React.Dispatch<
		React.SetStateAction<{
			passPhrase: string
			body: string
		}>
	>
	userData: {
		passPhrase: string
		body: string
	}
}

const EntranceForm = ({ setIsAuthorized, userData, setUserData }: Props) => {
	const secretPassphrase = import.meta.env.VITE_SECRET_PASSPHRASE

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		return userData.passPhrase === secretPassphrase
			? setIsAuthorized(true)
			: null
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { name, value } = e.target
		setUserData((currentVal) => ({
			...currentVal,
			[name]: value,
		}))
	}

	return (
		<main id="logged-out-main">
			<h1>Enter the secret passphrase below:</h1>
			<form onSubmit={handleLogin}>
				<label htmlFor="passPhrase" hidden>
					Passphrase
				</label>
				<input
					onChange={handleChange}
					type="text"
					name="passPhrase"
					id="passPhrase"
					value={userData.passPhrase}
					placeholder="passphrase"
				/>
				<input type="submit" value="Submit" />
			</form>
		</main>
	)
}

export default EntranceForm
