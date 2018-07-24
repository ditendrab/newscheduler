import React, { Component, PropTypes} from 'react';
import helper from './utils/helper';
import classnames from 'classnames';


 class AgendaDetail extends Component{
    
    constructor(){
      super();
     
    }  

  
   
   
    render(){
        const { connectDragSource, id, top, height, width, left, agenda } = this.props;
        let timeSlotLabel = '';//helper.getTimeIntervalLabel(agenda.ScheduledDate, agenda.Duration);

        return (
            <div id={id} 
                 draggable="true" 
                 className={classnames('agenda-container-cell')}
                 style = {{
                    top : `${top}px`,
                    height: `${height}px`,
                    width: `${width}px`,
                    left: `${left}px`
                }}>
                <div className={classnames('sc-agenda-details')}>{timeSlotLabel}</div>
              
              </div>
        );
    }
 }

export default AgendaDetail;
