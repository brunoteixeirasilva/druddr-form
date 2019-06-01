import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem, ListItemText } from '@material-ui/core'

function renderSuggestion({
	suggestion,
	index,
	itemProps,
	highlightedIndex,
	selectedItem
}) {
	const isHighlighted = highlightedIndex === index
	const isSelected = (selectedItem.label || '').indexOf(suggestion.label) > -1

	return (
		<MenuItem
			{...itemProps}
			key={suggestion.key}
			selected={isHighlighted}
			component="div"
			style={{
				fontWeight: isSelected ? 500 : 400
			}}
		>
			<ListItemText
				primary={suggestion.label}
				secondary={suggestion.secondaryLabel}
			/>
		</MenuItem>
	)
}

renderSuggestion.propTypes = {
	highlightedIndex: PropTypes.number,
	index: PropTypes.number,
	itemProps: PropTypes.object,
	selectedItem: PropTypes.string,
	suggestion: PropTypes.shape({
		key: PropTypes.string,
		label: PropTypes.string,
		secondaryLabel: PropTypes.string
	}).isRequired
}

export default renderSuggestion
