import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from './common/sidebar';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */
import Home from './routes/Home';
import About from './routes/About';
import AllReports from './routes/AllReports';
import EditReport from './routes/EditReport';
import Bots from './routes/Bots';
import EditBot from './routes/EditBot';

class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/reports' component={AllReports} />
    <Route path='/report/edit/:id' component={EditReport} />
    <Route path='/bots' component={Bots} />
    <Route path='/bot/edit/:id' component={EditBot} />
    <Route path='/about' component={About} />
    <Redirect path='*' to='/' />
  </Route>
);
