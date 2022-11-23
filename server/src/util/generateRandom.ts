const makeID = async () => {
	let makeCompleteString = ""
	const strings =
		"abcdefghijklmnopqrstuvwxyz0123456789"
	for (let index = 0; index < 4; index++) {
		makeCompleteString += strings.charAt(Math.floor(Math.random() * 4))
	}

	return makeCompleteString
}

export { makeID }
