require('normalize.css');
require('styles/App.css');
require('font-awesome/css/font-awesome.css');

import React from 'react';
import LoginComponent from './LoginComponent.js';


class AppComponent extends React.Component {
  render() {
    return (
      <div className='index'>
        <h1>Passport Example</h1>
        <h4>
          Use Passport for authentication with Node.
        </h4>
        <LoginComponent />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
