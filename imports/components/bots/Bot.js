import React from 'react';

import { Meteor } from 'meteor/meteor';
import {withRouter} from 'react-router';

import {
	Col,
	Row,
	Grid,
	Icon,
	Button,
	ListGroupItem,
	Checkbox,
	ButtonGroup,

} from '@sketchpixy/rubix';


@withRouter

export default class Bot extends React.Component {
	removeBot(){
		let {_id} = this.props.bot;
		let url = this.props.url;
		Meteor.call('bots.remove', _id);
	}

	editBot(){
		this.props.router.push(`/bot/edit/${this.props.bot._id}`);
	}

	render(){
		let {bot, url} = this.props.bot;
		return(
			<ListGroupItem>
				<Grid>
					<Row>
						<Col sm={8}>
							<a href={url}>{bot}</a>
						</Col>
						<Col sm={4} className='text-right'>
							<Button bsStyle='red' className='remove-sm' onClick={::this.removeBot} style={{marginRight: 12.5}}>Remove</Button>
							<Button bsStyle='green' className='remove-sm' onlyOnHover onClick={::this.editBot}>Edit</Button>
						</Col>
					</Row>
				</Grid>
			</ListGroupItem>

		);
	}
}