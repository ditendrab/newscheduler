import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
import { layout} from './utils/constants';
import Day from './Day';
import Week from './Week';
import Month from './Month';

class ScheduleGrid extends Component {
  

   renderIntervalRows(props){
    if(props.view == 'day'){
     return (
        <Day width={layout.DAY_CELL_WIDTH} {...this.props}/>
      );
    }else  if(props.view == 'week'){
      return (
          <Week  width={layout.WEEK_CELL_WIDTH} {...this.props}/>
       
       );
     }else  if(props.view == 'month'){
      return (
          <Month  width={layout.MONTH_CELL_WIDTH} {...this.props}/>
       
       );
     } 
   }
   
   getHeaderRowsCount(header){
       var count =0;
       for(var index = 0; index <  header.length; index++){
         if(!header[index].hide){
           count++;
          if(header[index].childs && header[index].childs.length > 0){
              count+= this.getHeaderRowsCount(header[index].childs);
            }
         }
      }
       return count;
   }

   getHeaderRows(header){
    const count = this.getHeaderRowsCount(header);
    return count
   }

   renderHeaderRows(props){
    const { headerList, startDate, endDate, view } = props; 
    let dateList =  helper.getDateList(startDate, endDate);
    const headerRowsCount = this.getHeaderRows(headerList);
    const width = helper.getCellWidth(view);
    let widthStyle = { width: width+'px' }
    let rows = [];
   
    for(var index =0; index < headerRowsCount ; index++){
      rows.push(<tr key={index}>
                    {
                    dateList.map((head, i)=>{
                    return <td className={classnames('sc-header-col')} key={head+i} >
                      <div  style={widthStyle}  className={classnames('sc-grid-cell')} ><div className={classnames('sc-grid-innercell')}  ></div></div>
                    </td> })  
                  }
              </tr> );
    }

    return (
       <tbody>
         {rows}
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