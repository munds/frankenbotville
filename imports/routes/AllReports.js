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

import { Reports } from '../api/reports.js';

import Report from '../components/Report.js';
import ReportForm from '../components/ReportForm';

class AllReports extends React.Component {
	static propTypes = {
		reports: React.PropTypes.array.isRequired,
	};

	render() {
		return (
			<Grid>
				<PanelContainer>
					<Panel>
						<PanelBody>
							<ReportForm />
						</PanelBody>
					</Panel>
				</PanelContainer>
				<Row>
					<Col xs={12}>
						<ListGroup>
						{this.props.reports.map((report) => {
							return <Report key={report ._id} report={report} />;
						})}
						</ListGroup>
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('reports');

	const reports = Reports.find({}).fetch() || [];

	return {
		reports: reports,
	};
}, AllReports);