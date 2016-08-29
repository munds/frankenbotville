import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import {
	Row,
	Col,
	Grid,
	Form,
	Alert,
	Button,
	Checkbox,
	ControlLabel,
	FormGroup,
	FormControl } from '@sketchpixy/rubix';


export default class ReportForm extends React.Component {
	state = {
		errors: [],
	};

	createReport(event){
		event.preventDefault();

		let nameInput = ReactDOM.findDOMNode(this.refs.nameInput);
		let urlInput = ReactDOM.findDOMNode(this.refs.urlInput);

		let report = nameInput.value.trim();
		let url = urlInput.value.trim();

		Meteor.call('reports.create', report, url, (err, res) => {
			if(err){
				this.setState({
					errors: [].concat(err),
				});
				return;
			}

			this.setState({errors: []});
		});

		nameInput.value = "";
		urlInput.value = "";

	}

	render(){
		let errors = this.state.errors.length?
			(
				<Alert danger dismissible>
					{this.state.errors.map(({message}, i) =>{
						return <div key={i}>{message}</div>
					})}
				</Alert>
			):null;
		return(



				<Form horizontal onSubmit={::this.createReport}>
					{errors}
					<Grid>
						<Col xs={12}>
							<FormGroup controlId="formControlsText">
								<ControlLabel>Report Name</ControlLabel>
								<FormControl type='text' placeholder='Report Name.' ref="nameInput" autoFocus />
							</FormGroup>
							<FormGroup controlId="formControlsUrl">
								<ControlLabel>Report Url</ControlLabel>
								<FormControl type='text' placeholder='Report Url.' ref="urlInput" autoFocus />
							</FormGroup>
							<FormGroup>
								<Col smOffset={2} sm={10}>
									<Button type='submit' bsStyle='blue' block onlyOnHover>Create Report</Button>
								</Col>
							</FormGroup>
						</Col>
					</Grid>
				</Form>


		);
	}
}