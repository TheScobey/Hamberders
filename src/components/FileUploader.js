import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import _ from "lodash";
import * as actions from "../actions";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as firebase from "firebase";

function FileUploader(props) {
  const { classes } = props;

  function handleFiles(fileList){
    console.log(fileList);
  }

  function onSubmit(){

    console.log("hello");
    const selectedFile = document.getElementById('contained-button-file').files[0];

    var storageRef = firebase.storage().ref();

    const metadata = {
      contentType: 'image/jpeg',
    };

    storageRef.child('burgers/' + selectedFile.name).put(selectedFile, metadata).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
    });
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
        Upload Burger
        </Typography>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => { onSubmit() }}>
        Accept
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </Paper>
  );
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

FileUploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actions)(withStyles(styles)(FileUploader));