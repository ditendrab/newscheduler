import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Day from './Day';

class ScheduleGrid extends Component {
  
   renderHeader(props){
    if(props.view == 'day'){
     return (
        <Day {...this.props}/>
      );
    }
   }
    render() {
        return(<table className={classnames('schedule-grid')}>{this.renderHeader(this.props)}</table>);
       
    }
 } 

export default ScheduleGrid;