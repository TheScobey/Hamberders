import React, { Component } from "react";
import ToDoList from "./components/ToDoList";
import SignIn from "./components/auth/SignIn";
import requireAuth from "./components/auth/Authentication";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" component={SignIn} />
          <Route path="/" component={requireAuth(ToDoList)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);