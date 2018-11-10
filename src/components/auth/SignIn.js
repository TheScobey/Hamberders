import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';

class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      this.props.auth ?
        <Button color="inherit" onClick={this.props.signOut}>Logout</Button>
        : 
        <Button color="inherit" onClick={this.props.signIn}>Login</Button>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn, signOut })(Signin);