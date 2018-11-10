import React, { Component } from "react";
import ToDoList from "./components/ToDoList";
import requireAuth from "./components/auth/Authentication";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PageAppBar from "./components/page/PageAppBar";
import white from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: white,
  },
});

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Grid
            container
            spacing={24}
            direction="column"
          >
            <PageAppBar />
            <Grid item xs={12}>
              <Paper>
                <Route path="/" component={requireAuth(ToDoList)} />
              </Paper>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);