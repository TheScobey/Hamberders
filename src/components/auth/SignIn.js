import "./SignIn.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";
import PropTypes from "prop-types";

class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      this.props.auth ? <div>Sign Out</div> :
      <div className="row social-signin-container">
        <div className="col s10 offset-s1 center-align">
          <h4 id="sign-in-header">Sign In to start</h4>
          <a href="#" className="social-signin" onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            Sign In With Google
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn, signOut })(Signin);