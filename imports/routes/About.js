import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {
	Row,
	Col,
	Grid,
	Panel,
	PanelBody,
	PanelContainer,
} from '@sketchpixy/rubix';

export default class About extends React.Component {
	render() {
		return (
			<PanelContainer>
				<Panel>
					<PanelBody style={{padding: 0, paddingBottom: 25}}>
						<Grid>
							<Row>
								<Col xs={12}>
									<h3>About Page</h3>
								</Col>
							</Row>
						</Grid>
					</PanelBody>
				</Panel>
			</PanelContainer>
		);
	}
}
