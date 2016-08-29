/**
 * File: imports/routes/AllTodos.js
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {
	Row,
	Col,
	Grid,
	Panel,
	Alert,
	ListGroup,
	PanelBody,
	PanelContainer,
} from '@sketchpixy/rubix';

import { Bots } from '../api/bots.js';

import Bot from '../components/bots/Bot';
import BotForm from '../components/bots/BotForm';

class AllBots extends React.Component {
	static propTypes = {
		bots: React.PropTypes.array.isRequired,
	};

	render() {
		return (
			<Grid>
				<PanelContainer>
					<Panel>
						<PanelBody>
							<BotForm />
						</PanelBody>
					</Panel>
				</PanelContainer>
				<Row>
					<Col xs={12}>
						<ListGroup>
							{this.props.bots.map((bot) => {
								return <Bot key={bot ._id} bot={bot} />;
							})}
						</ListGroup>
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('bots');

	const bots = Bots.find({}).fetch() || [];

	return {
		bots: bots,
	};
}, AllBots);