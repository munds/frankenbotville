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

import { Bots } from '../api/bots.js';

@withRouter
class EditBotForm extends React.Component {
	state = {
		errors: []
	};

	editBot(e) {
		e.preventDefault();

		let input = ReactDOM.findDOMNode(this.input);
		let urlInput = ReactDOM.findDOMNode(this.inputUrl)

		let bot = input.value;
		let url = urlInput.value;
		let desc = descInput.value;
		let ip = ipInput.value;

		let { _id } = this.props.bot;

		Meteor.call('bots.update', _id, bot, url, desc, ip, (err, n) => {
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
		let { bot, url } = this.props.bot;
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

				<Form onSubmit={::this.editBot}>
					<FormGroup controlId='botText'>
						<ControlLabel>Bot Text</ControlLabel>
						<FormControl type='text' placeholder='A bot item...' defaultValue={bot} ref={(input) => this.input = input} autoFocus />
					</FormGroup>
					<FormGroup controlId='botUrl'>
						<ControlLabel>Bot Url</ControlLabel>
						<FormControl type='text' placeholder='A bot item...' defaultValue={url} ref={(inputUrl) => this.inputUrl = inputUrl} autoFocus />
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
						<Button type='submit' bsStyle='blue' onlyOnHover>Update Bot</Button>
					</FormGroup>
				</Form>
			</div>
		);
	}
}


class EditBot extends React.Component {
	static propTypes = {
		bot: React.PropTypes.object,
	};

	render() {
		let { bot } = this.props;
		if (!bot) return null;

		return (
			<PanelContainer>
				<Panel>
					<PanelBody style={{padding: 0, paddingBottom: 25}}>
						<Grid>
							<Row>
								<Col xs={12}>
									<h3>Bot Settings:</h3>
									<EditBotForm bot={bot}/>
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
	Meteor.subscribe('bots', _id);

	return {
		bot: Bots.find({ _id }).fetch()[0],
	};
}, EditBot);