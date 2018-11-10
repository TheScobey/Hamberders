import React, { Component } from "react";
import { connect } from "react-redux";
import { completeToDo } from "../actions";
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class ToDoListItem extends Component {
  handleCompleteClick = completeToDoId => {
    const { completeToDo, auth } = this.props;
    completeToDo(completeToDoId, auth.uid);
  };

  render() {
    const { todoId, todo } = this.props;
    return (
        <ListItem>
          <ListItemText>
            {todo.title}
          </ListItemText>
          <ListItemSecondaryAction
            variant="contained"
            color="primary"
            onClick={() => this.handleCompleteClick(todoId)}
            className="complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn"
          >
            Done
          </ListItemSecondaryAction>
        </ListItem>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { completeToDo })(ToDoListItem);
