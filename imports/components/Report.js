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

export default class Report extends React.Component {
	removeReport(){
		let {_id} = this.props.report;
		let url = this.props.url;
		Meteor.call('reports.remove', _id);
	}

	editReport(){
		this.props.router.push(`/report/edit/${this.props.report._id}`);
	}

	render(){
		let {report, url} = this.props.report;
		return(
			<ListGroupItem>
				<Grid>
					<Row>
						<Col sm={8}>
							<a href={url}>{report}</a>
						</Col>
						<Col sm={4} className='text-right'>
							<Button bsStyle='red' className='remove-sm' onClick={::this.removeReport} style={{marginRight: 12.5}}>Remove</Button>
							<Button bsStyle='green' className='remove-sm' onlyOnHover onClick={::this.editReport}>Edit</Button>
						</Col>
					</Row>
				</Grid>
			</ListGroupItem>

		);
	}
}