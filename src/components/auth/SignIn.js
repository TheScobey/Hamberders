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
      this.props.auth ?
        <div onClick={this.props.signIn}>
          <h4>Sign Out</h4>
        </div> :
        <div onClick={this.props.signIn}>
          <h4>Sign In With Google</h4>
        </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn, signOut })(Signin);