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


export default class BotForm extends React.Component {
	state = {
		errors: [],
	};

	createBot(event){
		event.preventDefault();

		let nameInput = ReactDOM.findDOMNode(this.refs.nameInput);
		let urlInput = ReactDOM.findDOMNode(this.refs.urlInput);
		let descInput = ReactDOM.findDOMNode(this.refs.descInput)
		let ipInput = ReactDOM.findDOMNode(this.refs.ipInput)

		let bot = nameInput.value.trim();
		let url = urlInput.value.trim();
		let desc = descInput.value.trim();
		let ip = ipInput.value.trim();
		Meteor.call('bots.create', bot, url, desc, ip,(err, res) => {
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
		descInut.value = "";
		ipInput.value = "";
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



			<Form horizontal onSubmit={::this.createBot}>
				{errors}
				<Grid>
					<Col xs={12}>
						<FormGroup controlId="formControlsText">
							<ControlLabel>Bot Name</ControlLabel>
							<FormControl type="text"  placeholder='Bot Name.' ref="nameInput" autoFocus />
						</FormGroup>
						<FormGroup controlId="formControlsUrl">
							<ControlLabel>Bot Url</ControlLabel>
							<FormControl type='text' placeholder='Bot Url(Confluence)' ref="urlInput" autoFocus />
						</FormGroup>
						<FormGroup controlId="formControlsIp">
							<ControlLabel>Bot Ip</ControlLabel>
							<FormControl type='text' placeholder='192.168.1.1' ref="ipInput" autoFocus />
						</FormGroup>
						<FormGroup controlId="formControlsDesc">
							<ControlLabel>Bot Description</ControlLabel>
							<FormControl componentClass='textarea' placeholder='Bot Description' ref="urlInput" autoFocus />
						</FormGroup>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button type='submit' bsStyle='blue' block onlyOnHover>Create Bot</Button>
							</Col>
						</FormGroup>
					</Col>
				</Grid>
			</Form>


		);
	}
}