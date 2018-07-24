import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
import Day from './Day';

class ScheduleGrid extends Component {
  
   renderIntervalRows(props){
    if(props.view == 'day'){
     return (
        <Day {...this.props}/>
      );
    }
   }
   
   renderHeaderRows(props){
    const { header, startDate, endDate } = props; 
    let dateList =  helper.getDateList(startDate, endDate);
    console.log(dateList)

    console.log("props=",props);
    return (
      <tbody> 
              {
                header.map(function(head, index){
                return <tr key={head.RefId + index}>
                   <td className={classnames('sc-header-col')} >
                        <div draggable="true" className={classnames('sc-left-header-cell')} ><div className={classnames('sc-grid-innercell')}  >{head.name}</div></div>
                      </td> {
                       dateList.map((head, i)=>{
                       
                       return <td className={classnames('sc-header-col')} key={head+i} >
                        <div draggable="true" className={classnames('sc-grid-cell')} ><div className={classnames('sc-grid-innercell')}  ></div></div>
                      </td> })  
                    }
                </tr> 
               })
              }
      </tbody>
);
   }
    render() {
        return(<table className={classnames('schedule-grid')}>
        {this.renderIntervalRows(this.props)}
        {this.renderHeaderRows(this.props)}
        </table>);
       
    }
 } 

export default ScheduleGrid;