import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../Loader";

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    
    render() {

      return <Loader loading={!this.props.authenticated}> 
          <ComposedComponent {...this.props} />
        </Loader>
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}