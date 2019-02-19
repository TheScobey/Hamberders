import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SignIn from '../auth/SignIn';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function PageAppBar(props) {
    const { classes, auth } = props;
    return (
        <AppBar position="static">
            <Toolbar>
                {
                    /*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>*/
                }
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Burger Tracker v1.07
                    </Typography>
                {
                    auth ? <Avatar>{auth ? auth.displayName.split(" ").map(s => s[0]) : 'IDK'}</Avatar> : undefined
                }
                <SignIn />
            </Toolbar>
        </AppBar>
    );
}

PageAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(withStyles(styles)(PageAppBar));