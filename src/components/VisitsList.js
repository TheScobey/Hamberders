import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const todaysDate = new Date(); //this.formatDate(new Date());

const DateChoices = [
  {
    id: 0,
    label: "3 months",
    value: {
      startDate: todaysDate.setMonth(todaysDate.getMonth() - 1),
      endDate: todaysDate.setMonth(todaysDate.getMonth() + 2)
    }
  },
  /*{
    id: 1,
    label: "6 months",
    value: {
      startDate: new Date("2018-12-31"),
      endDate: todaysDate.setMonth(todaysDate.getMonth() + 4)
    }
  },*/
  {
    id: 2,
    label: "All",
    value: {
      startDate: new Date("2018-12-31"),
      endDate: todaysDate.setMonth(todaysDate.getMonth() + 1),
    }
  }
]

class VisitsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRange: DateChoices[0]
    };
  }

  onDateEndChange(value) {
    this.setState({
      selectedRange: value
    });
  }

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
    this.props.fetchGlobalVisitsTally();
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

    const calcStartDate = this.state.selectedRange ? this.state.selectedRange.value.startDate : new Date('2018-01-01')
    const calcEndDate = this.state.selectedRange ? this.state.selectedRange.value.endDate : new Date('2020-01-01')

    return (
      <Paper className={this.props.classes.root} elevation={1}>
        <div className={this.props.classes.title}>
          <Typography variant="h5" component="h3">
            {this.props.auth.displayName}'s Burgers Consumed
        </Typography>
          <div style={{ display: 'flex' }}>
            {
              DateChoices.map((choice, i) =>
                <Button
                  key={choice.id}
                  variant={this.state.selectedRange.id === DateChoices[i].id ? "contained" : "outlined"}
                  size="small"
                  color="primary"
                  className={this.props.classes.margin}
                  onClick={this.onDateEndChange.bind(this, DateChoices[i])}>
                  {choice.label}
                </Button>
              )
            }
          </div>
        </div>
        <CalendarHeatmap
          tooltipDataAttrs={value => {
            return {
              'data-tip': `${value.date ? value.date : ''}`,
            };
          }}
          showWeekdayLabels={true}
          startDate={calcStartDate}
          endDate={calcEndDate}
          values={this.getValueVisits()}
          onClick={value => value.fake ? this.addAVisit(value) : this.removeAVisit(value.vid)}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }

            var classes = [];
            if (value.date == this.formatDate(new Date())) {
              classes.push(this.props.classes.gridToday);
            }

            if (value.fake === true) {
              classes.push('color-empty');
            } else {
              classes.push(this.props.classes.grid1);
            }

            return classes.reduce((a, b) => a + ' ' + b);


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
  calendar: {
    maxHeight: '390px'
  },
  grid1: {
    fill: 'black'
  },
  gridToday: {
    stroke: 'red'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  margin: {
    marginLeft: theme.spacing.unit
  }
});

export default connect(mapStateToProps, actions)(withStyles(styles)(VisitsList));