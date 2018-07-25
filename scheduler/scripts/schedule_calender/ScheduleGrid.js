import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
import { layout} from './utils/constants';
import Day from './Day';
import Week from './Week';

class ScheduleGrid extends Component {
  
   renderIntervalRows(props){
    if(props.view == 'day'){
     return (
        <Day width={layout.DAY_CELL_WIDTH} {...this.props}/>
      );
    }else  if(props.view == 'week'){
      return (
          <Week  width={layout.MONTH_CELL_WIDTH} {...this.props}/>
       
       );
     }
   }
   
   renderHeaderRows(props){
    const { header, startDate, endDate } = props; 
    let dateList =  helper.getDateList(startDate, endDate);
    const width = props.view == 'day'? layout.DAY_CELL_WIDTH  : layout.MONTH_CELL_WIDTH;
    let widthStyle = { width: width+'px' }
    return (
      <tbody> 
              {
                header.map(function(head, index){
                return <tr key={head.RefId + index}>
                   <td className={classnames('sc-header-col')} >
                        <div  className={classnames('sc-left-header-cell')} ><div className={classnames('sc-grid-innercell')}  >{head.name}</div></div>
                      </td> {
                       dateList.map((head, i)=>{
                       return <td className={classnames('sc-header-col')} key={head+i} >
                        <div  style={widthStyle}  className={classnames('sc-grid-cell')} ><div className={classnames('sc-grid-innercell')}  ></div></div>
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