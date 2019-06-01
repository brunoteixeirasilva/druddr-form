import React from 'react'
import DruddrForm from '../base/DruddrForm'

/**
 * Should render totally ok for success
 *
 * @description Created the test component
 * @author brunoteixeirasilva
 * @version 1.0
 */
class TestForm extends React.PureComponent {
	render() {
		const model = { name: 'Test Name', type: 'Dashboard', active: true }
		// * usage sample: new Plugin(this.props.model[this.props.id]) || new Plugin()

		return (
			<DruddrForm
				id={this.props.id}
				model={model}
				// onSave={applySave} // ! commented out because no lib is available
				render={(props, form) => {
					return form.addWrapper([
						form.addTitle('Test form'),
						form.addCompanyRef(),
						form.addLine([
							form.addTextField('name', 'Name'),
							form.addSelectBox('type', 'Type', [
								{ label: 'Dashboard', key: 'Dashboard' }
							])
						]),
						form.addLine(form.addSwitch('active', 'Active'))
					])
				}}
			/>
		)
	}
}

/** BEGIN: redux integration sample **/

// import { connect } from 'react-redux'

// const applySave = async (id, model) => {
// 	return doSet(id, model).then(() => alert('updated!'))
// }

// const makeMapStateToProps = () => {
// 	const getModel = makeGetActiveModel()
// 	const getId = makeGetActiveModelId()
// 	const mapStateToProps = (state) => {
// 		return {
// 			id: getId(state),
// 			model: getModel(state)
// 		}
// 	}

// 	return mapStateToProps
// }

// export default connect(makeMapStateToProps())(TestForm)

/** END: redux integration sample **/

export default TestForm
