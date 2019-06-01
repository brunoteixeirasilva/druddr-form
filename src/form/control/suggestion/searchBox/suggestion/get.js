function getSuggestions(list, inputValue) {
	let count = 0

	return list
		.filter((suggestion) => {
			//Filters by the typed text
			const keep =
				(!inputValue ||
					suggestion.label
						.toLowerCase()
						.indexOf(inputValue.toLowerCase()) !== -1) &&
				count < 5

			if (keep) {
				count += 1
			}

			return keep
		})
		.sort((item, next) => {
			//sorts the list of elements by the label
			if (item.label > next.label) return 1
			else if (item.label < next.label) return -1
			else return 0
		})
}

export default getSuggestions
