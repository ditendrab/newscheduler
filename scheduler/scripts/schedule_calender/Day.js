import React, { Component ,PropTypes} from 'react';
import classnames from 'classnames';
import helper from './utils/helper';
class Day extends Component {
 renderHeaderForDay(dateList){
     return (
            <tr> 
              <th></th>
                 {
                   
                     dateList.map((head, i)=><th key={head+i}>
                     <div  className={classnames('sc-day-header-col')}>{head.day}</div></th> )  
                  }
            </tr>
     );
  }

  renderHeaderForDate(dateList){
     return (
            <tr>
              <td>Meadia/Channel</td>
                 {
                     dateList.map((head, i)=><td key={head+i} >
                     <div className={classnames('sc-day-cell')}>{head.date}</div></td> )  
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