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
      return res.json()
      .then((data) => {

        // console.log(data);
        let userName = data.name;

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
        (<div className='userInfo'>
          <p>Hi {this.state.name}</p>
          <a href='/logout' className='icon-button logout'>out</a>
        </div>) : (
        <div className='button-group'>
          <a href='/auth/facebook' className='icon-button facebook'><i className="fa fa-facebook"></i></a>
          <a href='/auth/google' className='icon-button google'><i className="fa fa-google-plus"></i></a>
          <a href='/auth/github' className='icon-button github'><i className="fa fa-github"></i></a>
        </div>
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
