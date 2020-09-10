import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Main from './pages/main/main.js';

import './global.css'

class Assembly extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path='/' exact component={Main}/>
        </Switch>
      </Router>
    )
  }
}

export default Assembly;
