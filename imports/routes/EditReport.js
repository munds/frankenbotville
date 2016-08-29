import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { withRouter } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import {
	Row,
	Col,
	Grid,
	Form,
	Panel,
	Alert,
	Button,
	Checkbox,
	PanelBody,
	FormGroup,
	FormControl,
	ControlLabel,
	PanelContainer } from '@sketchpixy/rubix';

import { Reports } from '../api/reports.js';

@withRouter
class EditReportForm extends React.Component {
	state = {
		errors: []
	};

	editReport(e) {
		e.preventDefault();

		let input = ReactDOM.findDOMNode(this.input);
		let urlInput = ReactDOM.findDOMNode(this.inputUrl)

		let report = input.value;
		let url = urlInput.value;

		let { _id } = this.props.report;

		Meteor.call('reports.update', _id, report, url, (err, n) => {
			if (err) {
				this.setState({
					errors: [ ].concat(err),
				});
				return;
			}

			this.setState({
				errors: []
			}, () => {
				this.props.router.push('/');
			});
		});
	}

	render() {
		let { report, url } = this.props.report;
		let errors = this.state.errors.length ?
			(
				<Alert danger dismissible>
					{this.state.errors.map(({ message }, i) => {
						return <div key={i}>{message}</div>
					})}
				</Alert>
			) : null;

		return (
			<div>
				{errors}

				<Form onSubmit={::this.editReport}>
					<FormGroup controlId='reportText'>
						<ControlLabel>Report Text</ControlLabel>
						<FormControl type='text' placeholder='A report item...' defaultValue={report} ref={(input) => this.input = input} autoFocus />
					</FormGroup>
					<FormGroup controlId='reportUrl'>
						<ControlLabel>Report Url</ControlLabel>
						<FormControl type='text' placeholder='A report item...' defaultValue={url} ref={(inputUrl) => this.inputUrl = inputUrl} autoFocus />
					</FormGroup>
					<FormGroup>
						<Button type='submit' bsStyle='blue' onlyOnHover>Update Report</Button>
					</FormGroup>
				</Form>
			</div>
		);
	}
}


class EditReport extends React.Component {
	static propTypes = {
		report: React.PropTypes.object,
	};

	render() {
		let { report } = this.props;
		if (!report) return null;

		return (
			<PanelContainer>
				<Panel>
					<PanelBody style={{padding: 0, paddingBottom: 25}}>
						<Grid>
							<Row>
								<Col xs={12}>
									<h3>Report Settings:</h3>
									<EditReportForm report={report}/>
								</Col>
							</Row>
						</Grid>
					</PanelBody>
				</Panel>
			</PanelContainer>
		);
	}
}

export default createContainer(({ params }) => {
	let { id } = params;
	let _id = id;
	Meteor.subscribe('reports', _id);

	return {
		report: Reports.find({ _id }).fetch()[0],
	};
}, EditReport);