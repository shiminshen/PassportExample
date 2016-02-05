require('normalize.css');
require('styles/App.css');

import React from 'react';
import LoginComponent from './LoginComponent.js';


class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <LoginComponent/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
