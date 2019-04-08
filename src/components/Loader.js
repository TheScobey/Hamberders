import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loader extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        const { classes, loading } = this.props;

        if (loading) {
            return <CircularProgress className={classes.progress} />
        }

        return this.props.children
    }

}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
});

export default withStyles(styles)(Loader);
