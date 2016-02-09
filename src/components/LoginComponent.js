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
  
  // check authorization before mount
  componentWillMount() {
    fetch('/getUser', {
      method: 'get',
      // add for sending cookies
      credentials: 'same-origin'
    }).then((res) => {

      res.json()
      .then((data) => {

          let userName = data.first_name;

          // if user is authorized, update status
          if(userName)
            return this.setState({name: userName});
          else return;
        });
    });
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
