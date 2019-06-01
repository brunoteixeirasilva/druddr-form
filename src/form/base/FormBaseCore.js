import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Grid, Typography } from '@material-ui/core'
import CompanyHint from '../hint/company'
import { SwitchBox } from './control/switchBox'
import SimpleSelect from './control/simpleSelect/SimpleSelect'
import { generateRandom } from '../../../utils/string'
import SuggestionSearchBox from '../suggestion/searchBox/SuggestionSearchBox'
import SaveButton from '../button/save/SaveButton'
import { translate } from '../../../utils/lang'

/**
 * Manages to supply a form pattern for implementation
 *
 * @description Created the component
 * @author brunoteixeirasilva
 * @version 1.0
 */
class FormBaseCore extends React.Component {
	model = null
	initialModelState = null
	companyRef = <CompanyHint key={generateRandom(5)} />
	mustValidate = []
	invalids = []
	_mounted = false

	constructor(props) {
		super(props)

		//No model? trouble.
		if (!!props && !props.model) {
			throw Error('error/new-formBase-requires-a-model')
		} else {
			//We have a model then
			this.state = {
				...this.setModelInitialState(props.model)
			}
		}
	}

	componentDidMount() {
		this._mounted = true
	}

	componentWillUnmount() {
		this._mounted = false
	}

	changePropAtState(objectPropName, event) {
		const self = this,
			value =
				event.target.type === 'checkbox'
					? event.target.checked
					: event.target.value

		//Changes the prop at the state
		self.setState({ [objectPropName]: value })
	}

	beforeSubmit() {
		if (!this.validate()) {
			return false
		}

		return true
	}

	validate() {
		//Resetting invalidator
		this.invalids = []

		//Validates emptyness for required fields
		this.mustValidate.forEach((field) => {
			if (
				undefined === this.state[field] ||
				null === this.state[field] ||
				!this.state[field]
			) {
				this.invalids.push(field)
			}
		})

		//Success when no invalids were found
		return this.invalids.length === 0
	}

	addTitle(title, margin = false) {
		const { classes } = this.props

		return this.addLine(
			<Typography
				className={!!margin ? classes.title : classes.titleNoMargin}
				variant="h6"
				key={title}
			>
				{title}
			</Typography>
		)
	}

	addCompanyRef() {
		return this.addLine(this.companyRef, { xs: 12, sm: 12, md: 12, lg: 12 })
	}

	addForm(content) {
		const self = this

		return (
			<form
				onSubmit={(event) => this.handleSubmit(self, event)}
				autoComplete="off"
			>
				{content}
				{this.addSaveButton()}
			</form>
		)
	}

	addWrapper(content) {
		return this.gridContainer(content)
	}

	addLine(content = [], sizes = { xs: 12, sm: 12, md: 6, lg: 3 }) {
		let contentDimensionedSizes = { ...sizes }
		//Whenever the content is actually a collection of fields
		if (content instanceof Array) {
			//redimension the columns quantity based on content.length
			//limiting at 12 columns
			contentDimensionedSizes = {
				xs: 12,
				sm: Math.max(12 / content.length, 6),
				md: Math.max(12 / content.length, 3),
				lg: Math.max(12 / content.length, 2)
			}

			return content.map((item, key) =>
				this.gridItem(item, contentDimensionedSizes, key)
			)
		}

		return this.gridItem(
			content,
			sizes,
			content.hasOwnProperty('name') ? content.name : generateRandom(5)
		)
	}

	gridContainer(content) {
		const { classes, theme } = this.props

		return (
			<Grid
				container
				spacing={theme.spacing.unit}
				className={classes.root}
				children={content}
			/>
		)
	}

	gridItem(content, sizes = fullWidthSizes, key = generateRandom(5)) {
		return (
			<Grid
				item
				xs={sizes.xs}
				sm={sizes.sm}
				md={sizes.md}
				lg={sizes.lg}
				children={content}
				key={key}
			/>
		)
	}

	addComponent(content, sizes = fullWidthSizes) {
		return this.gridItem(content, sizes)
	}

	addTypeahead(objectPropName, label, source, placeholder = undefined) {
		const self = this,
			{ margin } = self.props

		return (
			<SuggestionSearchBox
				key={1}
				margin={margin}
				label={label}
				placeholder={placeholder}
				listItems={
					!source
						? []
						: typeof source === 'function'
						? source()
						: source
				}
				onSelect={(item, values) =>
					self.setState({
						[objectPropName]:
							!!values && values.length > 0 ? [...values] : null
					})
				}
				name={objectPropName}
			/>
		)
	}

	addSelectBox(objectPropName, label, source) {
		const self = this,
			{ state } = self

		return (
			<SimpleSelect
				// TODO: apply margin functionality margin={margin}
				listItems={typeof source === 'function' ? source() : source}
				currentValue={state[objectPropName]}
				name={objectPropName}
				label={label}
				onChange={(event, value) =>
					self.setState({ [objectPropName]: value })
				}
			/>
		)
	}

	addSwitch(objectPropName, label) {
		const self = this,
			{ state } = self

		return (
			<SwitchBox
				// TODO: apply margin functionality margin={margin}
				checked={state[objectPropName]}
				name={objectPropName}
				label={label}
				onChange={(name) => (event) =>
					self.changePropAtState(name, event)}
			/>
		)
	}

	addTextField(
		objectPropName,
		label,
		required = true,
		placeholder = undefined,
		disabled = false
	) {
		const self = this,
			{ state } = self,
			{ classes, margin } = self.props

		return (
			<TextField
				required={required}
				key={generateRandom(5)}
				id={objectPropName}
				label={label}
				placeholder={placeholder}
				className={classes.textField}
				value={state[objectPropName]}
				onChange={(event) =>
					self.changePropAtState(objectPropName, event)
				}
				margin={margin}
				fullWidth
				disabled={disabled}
			/>
		)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.modelHasChanged(nextState)
	}

	setModelInitialState(modelState) {
		this.model = { ...modelState }
		this.initialModelState = JSON.stringify(modelState)

		//Will force the rerendering of the component
		return modelState
	}

	modelHasChanged(state = null) {
		const self = this,
			initialState = state || self.initialModelState,
			usefulState = self.state

		// The button will disable whenever the initial-model state versus current state
		// are not equal
		return !!self && JSON.stringify(usefulState) !== initialState
	}

	async handleSubmit(form, event) {
		const { onSave } = form.props

		if (!!event && !!event.preventDefault) event.preventDefault()

		//If any action required prior to submitting data
		//Is not successful, stops the saving method
		if (!form.beforeSubmit()) {
			return Promise.reject('invalid-form')
		}

		//Invoking the specified save action
		return onSave(form.props.id, form.state).then((result) => {
			//Setting a new initialModel state
			form.setModelInitialState(form.state)

			return Promise.resolve(result)
		})
	}

	addSaveButton() {
		const self = this

		return (
			<SaveButton
				type="submit"
				ariaLabel={translate('label/save')}
				// action={}
				disabled={() => !self.modelHasChanged()}
			/>
		)
	}

	render() {
		const { render } = this.props

		return !!render && typeof render === 'function' ? (
			<React.Fragment>
				{this.addForm(render(this.props, this))}
			</React.Fragment>
		) : null
	}
}

FormBaseCore.defaultProps = {
	id: null,
	margin: 'normal'
}

const fullWidthSizes = {
	xs: 12,
	sm: 12,
	md: 12,
	lg: 3
}

export const FormBaseCorePropTypes = {
	classes: PropTypes.object,
	id: PropTypes.string,
	margin: PropTypes.oneOf(['normal', 'dense']),
	model: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	render: PropTypes.func,
	onSave: PropTypes.func
}

FormBaseCore.propTypes = FormBaseCorePropTypes

export default FormBaseCore
