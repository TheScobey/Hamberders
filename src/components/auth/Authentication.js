import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../Loader";
import { Typography } from "@material-ui/core";

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    
    render() {

      return this.props.authenticated ? <ComposedComponent {...this.props} />
        : <Typography>Please login</Typography>
        
      
      {/*<Loader loading={!this.props.authenticated}> 
          <ComposedComponent {...this.props} />
      </Loader>*/}

    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}