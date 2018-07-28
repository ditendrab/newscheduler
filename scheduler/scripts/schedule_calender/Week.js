import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
import {month} from './utils/constants';
class Week extends Component {


    renderHeaderForMonth(dateDifferencesForMonth) {
       return (
            <tr className={classnames('header1-row')}>
                 <th  className={classnames('sc-top-header-col')}>
                        <div className={classnames('sc-top-header-cell')}>
                            <div  className={classnames('sc-header-innercell')}></div>
                        </div>
                    </th>
                 {
                    dateDifferencesForMonth.map((dateDifference, i)=>{
                    return <th  className={classnames('sc-top-header-col')} colSpan={dateDifference.diff} key={i}>
                        <div   className={classnames('sc-top-header-cell sc-grid-cell-border-right')}>
                            <div className={classnames('sc-header-innercell ')}>{month[dateDifference.month]} {dateDifference.year}</div>
                        </div>
                    </th>})  
                }
            </tr>
           
        );
    }
    renderHeaderForWeek(getWeekList) {
        return (
             <tr className={classnames('header2-row')}>
                  <th  className={classnames('sc-top-header-col')}>
                         <div className={classnames('sc-left-header-cell  left-header')}>
                             <div  className={classnames('sc-header-innercell')}>Meadia/Channel</div>
                         </div>
                     </th>
                  {
                     getWeekList.map((weekDetail, i)=>{
                     return <th  className={classnames('sc-top-header-col')} colSpan={weekDetail.dayDiff} key={i}>
                         <div   className={classnames('sc-top-header-cell sc-grid-cell-border-right')}>
                             <div className={classnames('sc-header-innercell')}>{month[weekDetail.start.month]} {weekDetail.start.date} - {month[weekDetail.end.month]} {weekDetail.end.date} </div>
                         </div>
                     </th>})  
                 }
             </tr>
            
         );
     }
    
      render() {
        const {startDate, endDate, width} = this.props; 
        let dateList =  helper.getDateList(startDate, endDate);
        let getWeekList = helper.getWeekList(startDate, endDate);
        let dateDifferencesForMonth = helper.getDateDifferences(startDate, endDate);
        
        return (
         <thead>
              {this.renderHeaderForMonth(dateDifferencesForMonth)}
              {this.renderHeaderForWeek(getWeekList)}
         </thead>
        );
      }
    }
export default Week;