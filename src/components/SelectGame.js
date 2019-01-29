import React, { Component } from "react";
import _ from "lodash";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    maxWidth: 345,
  }
};

class SelectGame extends Component {
  state = {
    addFormVisible: false,
    addFormValue: ""
  };

  render() {
    const { addFormVisible } = this.state;
    return (<>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Host
            </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" color="primary" variant="raised">
            Host
          </Button>
        </CardActions>
      </Card>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Join
            </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" color="primary" variant="raised">
            Join
          </Button>
        </CardActions>
      </Card>
      </>
    );
  }
}

export default withStyles(styles)(SelectGame);