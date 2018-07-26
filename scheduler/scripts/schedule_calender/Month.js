import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
import {month} from './utils/constants';
class Month extends Component {


    renderHeaderForMonth(dateDifferencesForMonth) {
       return (
            <tr>
                 <th  className={classnames('sc-top-header-col')}>
                        <div className={classnames('sc-top-header-cell')}>
                            <div  className={classnames('sc-header-innercell')}>Meadia/Channel</div>
                        </div>
                    </th>
                 {
                    dateDifferencesForMonth.map((dateDifference, i)=>{
                        console.log("dateDifference.diff=",dateDifference.diff)
                    return <th  className={classnames('sc-top-header-col')} colSpan={dateDifference.diff} key={i}>
                        <div   className={classnames('sc-top-header-cell')}>
                            <div className={classnames('sc-header-innercell')}>{dateDifference.year} {month[dateDifference.month]} </div>
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
              
         </thead>
        );
      }
    }
export default Month;