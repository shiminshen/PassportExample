'use strict';

import React from 'react';

require('styles/Login.styl');

class LoginComponent extends React.Component {
  render() {
    return (
      <div className="login-component">
        <a href='/Login' className='icon-button facebook'>f</a>
      </div>
    );
  }
}

LoginComponent.displayName = 'LoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default LoginComponent;
