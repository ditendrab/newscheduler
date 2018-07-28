import React, { Component ,PropTypes} from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
import {month} from './utils/constants';
class Day extends Component {

  renderHeaderForMonth(dateDifferencesForMonth) {
    return (
        <tr className={classnames('header1-row')}>
             <th  className={classnames('sc-top-header-col')}>
                    <div className={classnames('sc-top-header-cell left-header')}>
                        <div className={classnames('sc-grid-innercell')}></div>
                    </div>
                </th>
             {
                dateDifferencesForMonth.map((dateDifference, i)=>{
                return <th  className={classnames('sc-top-header-col')} colSpan={dateDifference.diff} key={i}>
                    <div className={classnames('sc-top-header-cell')}>
                        <div className={classnames('sc-grid-innercell')}>{month[dateDifference.month]} {dateDifference.year}</div>
                    </div>
                </th>})  
            }
        </tr>
       
    );
}

  renderHeaderForDay(dateList){
    return (
           <tr className={classnames('sc-grid-row header2-row')}> 
             <th className={classnames('sc-header-col')}>
                <div className={classnames('sc-left-header-cell left-header')}><div className={classnames('sc-grid-innercell')} ></div></div>
             </th>
                {
                  dateList.map((head, i)=>{
                  return <th className={classnames('sc-header-col')} key={head+i}>
                  <div className={classnames('sc-grid-cell')} >
                  <div  className={(head.day == 'Sa' ?  classnames('sc-grid-cell sc-grid-cell-border-right') :  classnames('sc-grid-cell'))} >{head.day}</div>
                  </div></th>} )  
                 }
           </tr>
    );
 }

 renderHeaderForDate(dateList){
    return (
           <tr  className={classnames('sc-grid-row header3-row')}>
             <th className={classnames('sc-header-col')}>
                <div className={classnames('sc-left-header-cell left-header')}><div className={classnames('sc-header-innercell')} >Meadia/Channel</div></div>
             </th>
                {
                    dateList.map((head, i)=> {
                      return <th className={classnames('sc-header-col')} key={head+i} >
                      <div className={classnames('sc-grid-cell')} ><div className={classnames('sc-grid-innercell')}  >{head.date}</div></div>
                    </th> })  
                 }
           </tr>
    );
 }

  render() {
    const {startDate, endDate} = this.props; 
    let dateList =  helper.getDateList(startDate, endDate);
    let dateDifferencesForMonth = helper.getDateDifferences(startDate, endDate);
    
    return (
     <thead>
          {this.renderHeaderForMonth(dateDifferencesForMonth)}
          {this.renderHeaderForDay(dateList)}
          {this.renderHeaderForDate(dateList)}
     </thead>
    );
  }
}

Day.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

Day.defaultProps = {
  startDate: '',
  endDate: ''
};


export default Day;