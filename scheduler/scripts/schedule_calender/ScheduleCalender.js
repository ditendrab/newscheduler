import React, { Component, PropTypes } from 'react';
import { timeSlot, views, layout } from './utils/constants';
import ScheduleGrid from './ScheduleGrid';
import Header from './Header';
import Agenda from './Agenda';
import classnames from 'classnames';

let current;
class ScheduleCalender extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = { agendaList: props.agendaList, headerList: props.headerList, hiddenHeadersId:[], schduleCalenderWidth:1000};
    current = this;
  }

  changeHeaderState(header) {
    current.setState({ headerList: header});
  }


  changeAgendaState(agendaList) {
    current.setState({ agendaList: agendaList});
  }
  componentDidMount(){
    console.log("****scheduleCalender==",this.refs.scheduleCalender.offsetWidth);
    current.setState({ schduleCalenderWidth: this.refs.scheduleCalender.offsetWidth});
  }
 
render(props) {
   let schduleCalWidth = this.state.schduleCalenderWidth;
   console.log("schduleCalWidth==",schduleCalWidth);
      
   let widthStyle = { width: (schduleCalWidth - layout.LEFT_TREE_WIDTH -5)+'px' };
  
    return (
     <div id="scheduleCalender"  ref="scheduleCalender" className={classnames('sc')}> 
       <Header 
        changeHeaderState={this.changeHeaderState}
        {...this.props}
        headerList={this.state.headerList}
        agendaList={this.state.agendaList} 
         />
        
     <div style={widthStyle} className={classnames('right inline')}>
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