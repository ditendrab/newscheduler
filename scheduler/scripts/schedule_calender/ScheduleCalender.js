import React, { Component, PropTypes } from 'react';
import { timeSlot, views } from './utils/constants';
import ScheduleGrid from './ScheduleGrid';
import Header from './Header';
import Agenda from './Agenda';
import classnames from 'classnames';

let current;
class ScheduleCalender extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = { agendaList: props.agendaList, headerList: props.headerList, hiddenHeadersId:[]};
    current = this;
  }

  changeHeaderState(header) {
    current.setState({ headerList: header});
  }


  changeAgendaState(agendaList) {
    current.setState({ agendaList: agendaList});
  }

 
render(props) {
    return (
     <div id="scheduleCalender" className={classnames('sc')}> 
       <Header 
        changeHeaderState={this.changeHeaderState}
        {...this.props}
        headerList={this.state.headerList}
        agendaList={this.state.agendaList} 
         />
        
     <div  className={classnames('right inline')}>
       <ScheduleGrid  {...this.props} 
        headerList={this.state.headerList}
        agendaList={this.state.agendaList} />
       <Agenda {...this.props}
        headerList={this.state.headerList}
        agendaList={this.state.agendaList} />
       </div>
    
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