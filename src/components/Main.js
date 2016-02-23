require('normalize.css');
require('styles/App.css');
require('font-awesome/css/font-awesome.css');

import React from 'react';
import LoginComponent from './LoginComponent.js';


class AppComponent extends React.Component {
  render() {
    return (
      <div className='index'>
        <h1>Authorization Example</h1>
        <LoginComponent/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
