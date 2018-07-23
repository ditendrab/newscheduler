import React, { Component ,PropTypes} from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
class Day extends Component {
 renderHeaderForDay(dateList){
     return (
            <tr>
                 {
                     dateList.map((head, i)=><td key={head+i} className={classnames('sc-header-col')}>
                     <div>{head.day}</div></td> )  
                  }
            </tr>
     );
  }

  renderHeaderForDate(dateList){
     return (
            <tr>
                 {
                     dateList.map((head, i)=><td key={head+i} className={classnames('sc-header-col')}>
                     <div>{head.date}</div></td> )  
                  }
            </tr>
     );
  }

  render() {
    const {startDate, endDate} = this.props; 
    let dateList =  helper.getDateList(startDate, endDate);
    console.log(dateList)
    return (
     <thead>
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
  chairCount: '',
  rowCount: ''
};


export default Day;