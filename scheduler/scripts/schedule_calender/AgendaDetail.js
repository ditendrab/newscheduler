import React, { Component, PropTypes} from 'react';
import helper from './utils/helper';
import classnames from 'classnames';


 class AgendaDetail extends Component{
    
    constructor(){
      super();
     
    }  

  
    render(){
        const { connectDragSource, id, top, height, width, left, agenda, level } = this.props;
        
        return (
            <div id={id} 
                 draggable="true" 
                 className={classnames(`agenda-container-cell level_${level}`)}
                 style = {{
                    top : `${top}px`,
                    height: `${height}px`,
                    width: `${width}px`,
                    left: `${left}px`
                }}>
                <div className={classnames('sc-agenda-details cost-label')}>{agenda.cost}</div>
              
              </div>
        );
    }
 }

export default AgendaDetail;
