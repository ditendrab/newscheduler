import React, { Component, PropTypes } from 'react';

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
        return(<table>{this.renderHeader(this.props)}</table>);
       
    }
 } 

export default ScheduleGrid;