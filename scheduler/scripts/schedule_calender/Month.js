import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
import {month} from './utils/constants';
class Month extends Component {


    renderHeaderForMonth(dateDifferencesForMonth) {
       return (
            <tr className={classnames('header2-row')}>
                  <th  className={classnames('sc-top-header-col')}>
                         <div className={classnames('sc-left-header-cell  left-header')}>
                             <div  className={classnames('sc-header-innercell')}>Meadia/Channel</div>
                         </div>
                     </th>
                 { 
                    dateDifferencesForMonth.map((dateDifference, i)=>{
                        console.log("dateDifference.diff=",dateDifference.diff)
                    return <th  className={classnames('sc-top-header-col')} colSpan={dateDifference.diff} key={i}>
                        <div   className={classnames('sc-top-header-cell sc-grid-cell-border-right')}>
                            <div className={classnames('sc-header-innercell')}> {month[dateDifference.month]} </div>
                        </div>
                    </th>})  
                }
            </tr>
           
        );
    }
    renderHeaderForYear(dateDifferencesForYear) {
        return (
             <tr className={classnames('header1-row')}>
                   <th  className={classnames('sc-top-header-col')}>
                          <div className={classnames('sc-left-header-cell  left-header')}>
                              <div  className={classnames('sc-header-innercell')}></div>
                          </div>
                      </th>
                  { 
                     dateDifferencesForYear.map((dateDifference, i)=>{
                         console.log("dateDifference.diff=",dateDifference.diff)
                     return <th  className={classnames('sc-top-header-col')} colSpan={dateDifference.diff} key={i}>
                         <div   className={classnames('sc-top-header-cell sc-grid-cell-border-right')}>
                             <div className={classnames('sc-header-innercell')}> {dateDifference.year} </div>
                         </div>
                     </th>})  
                 }
             </tr>
            
         );
     }
    
      render() {
        const {startDate, endDate, width} = this.props; 
        let dateList =  helper.getDateList(startDate, endDate);
        let dateDifferencesForYear = helper.getYearList(startDate, endDate);
        let dateDifferencesForMonth = helper.getDateDifferences(startDate, endDate);
        console.log("yearList==",dateDifferencesForYear);
        return (
         <thead>
              {this.renderHeaderForYear(dateDifferencesForYear)}
              {this.renderHeaderForMonth(dateDifferencesForMonth)}

         </thead>
        );
      }
    }
export default Month;