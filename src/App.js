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
import 'react-calendar-heatmap/dist/styles.css';
import VisitsList from "./components/VisitsList";
import FileUploader from "./components/FileUploader";

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
            direction="row"
          >
            <PageAppBar />
            <Grid item xs={12} sm={6}>
                <Route path="/" component={requireAuth(VisitsList)} />
            </Grid>
            {
            /*<Grid item xs={12} sm={6}>
                <Route path="/" component={requireAuth(FileUploader)} />
            </Grid>*/
            }
          </Grid>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);