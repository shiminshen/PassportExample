'use strict';

import React from 'react';

require('styles/Login.styl');

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  login() {
  }

  render() {
    return (
      <div className="login-component">
        {this.state.name ?
        (<div>
            <p>Hi {this.state.name}</p>
            <a href='/logout' className='icon-button facebook'>out</a>
          </div>) : (
        <a href='/auth/facebook' className='icon-button facebook'>f</a>
        )}
      </div>
    );
  }
}

LoginComponent.displayName = 'LoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default LoginComponent;
