import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import List from '@material-ui/core/List';
import ToDoListItem from "./ToDoListItem";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

class VisitsList extends Component {
  addAVisit(value) {
    const { addVisits, auth } = this.props;
    
    if(value)
      addVisits({ datetime: value.date }, auth.uid);
  }

  removeAVisit(visitId){
    const { removeVisits, auth } = this.props;

    if(visitId)
      removeVisits(visitId, auth.uid);
  }

  getValueVisits(){
    const { data } = this.props;
    
    const visitsMapped = _.map(data, (value, key) => {
      return { vid: key, date: value.datetime, fake: false };
    });

    
    var fakes = [];

    var startDate = new Date("12/31/2018");
    var endDate  = new Date("01/01/2020");

    const allDates = this.getDates(startDate, endDate);

    /*for(var i = 1; i <= 31; i++){
      fakes.push(
        { date: `2019-01-${i < 10 ? '0' + i : i}`, fake: true },)
    }*/

    fakes = allDates.map((v,k) => {
      return { date: v, fake: true }
    });

    fakes = fakes.filter(f => !visitsMapped.some(p => p.date === f.date))

    if (!_.isEmpty(visitsMapped)) {
      return visitsMapped.concat(fakes);
    }

    return fakes;
  }

  componentWillMount() {
    this.props.fetchVisits(this.props.auth.uid);
  }

  getDates( d1, d2 ){
    var oneDay = 24*3600*1000;
    for (var d=[],ms=d1*1,last=d2*1;ms<last;ms+=oneDay){
      d.push( this.formatDate(new Date(ms)) );
    }
    return d;
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  render() {
    return (
      <div className="to-do-list-container">
        <h1>Burgers Consumed</h1>
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
          onClick={value => value.fake ? this.addAVisit(value) : this.removeAVisit(value.vid)}
          classForValue={(value) => {
            if (!value || value.fake === true) {
              return 'color-empty';
            }
            return `color-scale-1`;
          }}
        />
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