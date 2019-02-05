import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

class VisitsList extends Component {
  addAVisit(value) {
    const { addVisits, auth, classes } = this.props;

    if (value)
      addVisits({ datetime: value.date }, auth.uid);
  }

  removeAVisit(visitId) {
    const { removeVisits, auth } = this.props;

    if (visitId)
      removeVisits(visitId, auth.uid);
  }

  getValueVisits() {
    const { data } = this.props;

    const visitsMapped = _.map(data, (value, key) => {
      return { vid: key, date: value.datetime, fake: false };
    });

    var startDate = new Date("01/01/2019");
    var endDate = new Date("12/31/2019");

    const allDates = this.getDates(startDate, endDate);

    var fakes = allDates.map((v, k) => {
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

  getDates(d1, d2) {
    var oneDay = 24 * 3600 * 1000;
    for (var d = [], ms = d1 * 1, last = d2 * 1; ms < last; ms += oneDay) {
      d.push(this.formatDate(new Date(ms)));
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
    const todaysDate = this.formatDate(new Date());

    return (
      <Paper className={this.props.classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {this.props.auth.displayName}'s Burgers Consumed
        </Typography>
          <CalendarHeatmap
            tooltipDataAttrs={value => {
              return {
                'data-tip': `${value.date ? value.date : ''}`,
              };
            }}
            showWeekdayLabels={true}
            startDate={new Date('2018-12-31')}
            endDate={new Date('2019-07-01')}
            values={this.getValueVisits()}
            onClick={value => value.fake ? this.addAVisit(value) : this.removeAVisit(value.vid)}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              
              if(value.fake === true) {
                if(value.date == todaysDate){
                  return this.props.classes.gridToday
                }

                return 'color-empty';
              }

              
              return this.props.classes.grid1;
              
            }}
          />
        <ReactTooltip />
      </Paper>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  grid1: {
    fill: 'black'
  },
  gridToday: {
    stroke: 'red',
    fill: '#eeeeee'
  }
});

export default connect(mapStateToProps, actions)(withStyles(styles)(VisitsList));