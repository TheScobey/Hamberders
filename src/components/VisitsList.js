import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import List from '@material-ui/core/List';
import ToDoListItem from "./ToDoListItem";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

class VisitsList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state;
    const { addVisits, auth } = this.props;
    event.preventDefault();

    var today = new Date();

    addVisits({ datetime: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() }, auth.uid);
    this.setState({ addFormValue: "" });
  };

  addAVisit(value) {
    const { addVisits, auth } = this.props;
    
    if(value)
      addVisits({ datetime: value.date }, auth.uid);
  }

  renderAddForm = () => {
    const { addFormVisible, addFormValue } = this.state;
    if (addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">Add Visit</i>
              <input
                value={addFormValue}
                onChange={this.handleInputChange}
                id="toDoNext"
                type="text"
              />
              <label htmlFor="toDoNext">Your visit</label>
            </div>
          </form>
        </div>
      );
    }
  };

  getValueVisits(){
    const { data } = this.props;
    
    const visitsMapped = _.map(data, (value, key) => {
      return { date: value.datetime, fake: false };
    });

    
    var fakes = [];

    for(var i = 1; i <= 31; i++){
      fakes.push(
        { date: `2019-01-${i < 10 ? '0' + i : i}`, fake: true },)
    }

    fakes = fakes.filter(f => !visitsMapped.some(p => p.date === f.date))

    if (!_.isEmpty(visitsMapped)) {
      return visitsMapped.concat(fakes);
    }

    return fakes;
  }

  renderVisits() {
    const { data } = this.props;
    const visits = _.map(data, (value, key) => {
      return <ToDoListItem key={key} todoId={key} todo={value} />;
    });
    if (!_.isEmpty(visits)) {
      return visits;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h4>You have no visits</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchVisits(this.props.auth.uid);
  }

  render() {
    const { addFormVisible } = this.state;
    return (
      <div className="to-do-list-container">
        {this.renderAddForm()}

        <h1>Rascal Visits</h1>
        <CalendarHeatmap
          tooltipDataAttrs={value => {
            return {
              'data-tip': `${value.date ? value.date : ''}`,
            };
          }}
          showWeekdayLabels={true}
          startDate={new Date('2019-01-01')}
          endDate={new Date('2020-01-01')}
          values={this.getValueVisits()}
          onClick={value => this.addAVisit(value)}
          classForValue={(value) => {
            if (!value || value.fake === true) {
              return 'color-empty';
            }
            return `color-scale-1`;
          }}
        />
        {
          /*
        <div className="fixed-action-btn">
          <button
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
            className="btn-floating btn-large teal darken-4"
          >
            {addFormVisible ? (
              <i className="large material-icons">close</i>
            ) : (
                <i className="large material-icons">add</i>
              )}
          </button>
        </div>
        */
        }
        <ReactTooltip />
      </div>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(VisitsList);