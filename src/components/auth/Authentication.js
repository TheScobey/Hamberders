import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    
    render() {
      const { classes } = this.props;

      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
      }
      return <CircularProgress className={classes.progress} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth };
  }

  Authentication.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps)(withStyles(styles)(Authentication));
}