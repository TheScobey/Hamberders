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

const DateChoices = [
  {
    label: "3 months",
    value: new Date('2019-03-01')
  },
  {
    label: "6 months",
    value: new Date('2019-06-01')
  },

  {
    label: "12 months",
    value: new Date('2020-01-01')
  }
]

class VisitsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateEnd: DateChoices[1].value
    };
  }

  onDateEndChange(value) {
    this.setState({
      dateEnd: value
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

    const startDate = this.formatDate(new Date('2018-12-31'));


    return (
      <Paper className={this.props.classes.root} elevation={1}>
        <div className={this.props.classes.title}>
          <Typography variant="h5" component="h3">
            {this.props.auth.displayName}'s Burgers Consumed
        </Typography>
          <div>
            <Button variant={this.state.dateEnd === DateChoices[0].value ? "contained" : "outlined"} size="small" color="primary" className={this.props.classes.margin} onClick={this.onDateEndChange.bind(this, DateChoices[0].value)}>
              3 months
            </Button>
            <Button variant={this.state.dateEnd === DateChoices[1].value ? "contained" : "outlined"} size="small" color="primary" className={this.props.classes.margin} onClick={this.onDateEndChange.bind(this, DateChoices[1].value)}>
              6 months
            </Button>
            <Button variant={this.state.dateEnd === DateChoices[2].value ? "contained" : "outlined"} size="small" color="primary" className={this.props.classes.margin} onClick={this.onDateEndChange.bind(this, DateChoices[2].value)}>
              12 months
          </Button>
          </div>
        </div>
        <CalendarHeatmap
          tooltipDataAttrs={value => {
            return {
              'data-tip': `${value.date ? value.date : ''}`,
            };
          }}
          showWeekdayLabels={true}
          startDate={startDate}
          endDate={this.state.dateEnd}
          values={this.getValueVisits()}
          onClick={value => value.fake ? this.addAVisit(value) : this.removeAVisit(value.vid)}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }

            var classes = [];
            if (value.date == todaysDate) {
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