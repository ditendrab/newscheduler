import React, { Component, PropTypes } from 'react';
import { timeSlot, views } from './utils/constants';
import ScheduleGrid from './ScheduleGrid';
import Agenda from './Agenda';
import classnames from 'classnames';

class ScheduleCalender extends Component {

render(props) {
   const {header} = this.props; 
    return (
     <div id="scheduleCalender" className={classnames('sc-container')}>
       <ScheduleGrid  {...this.props} />
       <Agenda {...this.props}/>
      </div>
    );
  }
}
 

ScheduleCalender.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  interval: PropTypes.number,
  view: PropTypes.string,
  header: PropTypes.array,
  agendaList: PropTypes.array
};

ScheduleCalender.defaultProps = {
  startDate: timeSlot.START_TIME,
  endDate: timeSlot.END_TIME,
  interval: timeSlot.INTERVAL,
  view: views.DAY,
  header: [],
  agendaList: []
};


export default ScheduleCalender;