import React, { Component } from 'react';
import helper from './utils/helper';
import classnames from 'classnames';
import {layout} from './utils/constants';
import AgendaDetail from './AgendaDetail';

 class Agenda extends Component {
  
   caculateTop(header, agenda, cellWidth, fixedTopMargin){
       const matchedIndex = this.getMachedHeaderIndex(header, agenda.RefId);
       const top = (40 * matchedIndex) + fixedTopMargin;
    return top;
   }

   caculateLeft(agStartDate, startDate, cellWidth){
    const dayDiff = helper.getDateDifferenceInDay(agStartDate, startDate);
    console.log("############dayDiff###",dayDiff);
    console.log("###########cellWidth####",cellWidth);
    const left =  dayDiff * cellWidth;
    return left;
   }
   
   caculateWidth(agEndDate, agStartDate, cellWidth){
    const agDayDiff = helper.getDateDifferenceInDay(agEndDate, agStartDate);
    const width = (agDayDiff+1) * cellWidth;
    return width;
   }

   getMachedHeaderIndex(headerList, id){
    let matchedIndex = 0;  
    for(let index =0; index < headerList.length; index++){
        let header = headerList[index];
        if(header.RefId == id){
            matchedIndex = index;
            break;
        }
    }
    return matchedIndex;
   }

    renderAgendaList(props){
        const {agendaList, startDate, endDate, header, view} = props;
        const startDateTimestamp = new Date(startDate).getTime();
        const endDateTimestamp = new Date(endDate).getTime();
        const cellWidth = helper.getCellWidth(view);
        const fixedTopMargin = helper.getTopMargin(view);
        
        return agendaList.map((agenda, index)=> {

        const agStartDateTimestamp = new Date(agenda.StartDate).getTime();
        const agEndDateTimestamp = new Date(agenda.EndDate).getTime();
        const agStartDate = agStartDateTimestamp < startDateTimestamp ? startDate: agenda.StartDate;
        const agEndDate = agEndDateTimestamp > endDateTimestamp ? endDate: agenda.EndDate;
        
        const top = this.caculateTop(header, agenda, cellWidth, fixedTopMargin);
        const left = this.caculateLeft(agStartDate, startDate, cellWidth);
        const height = layout.CELL_HEIGHT;
        const width = this.caculateWidth(agEndDate, agStartDate, cellWidth);
        
        return(
            <td>
              <AgendaDetail
                top = {top}
                height = {height}
                width = {width}
                left = {left}
                id = {agenda.id}
                agenda = {agenda}
                {...props}
               />
            </td>
            );
        }
     )
    }
    render() {
    return (
       <table  className={classnames('agenda-container-table')}>
           <tbody>
               <tr> {this.renderAgendaList(this.props)}</tr>
             </tbody>
         </table>
    );
   }
 } 

 export default Agenda;