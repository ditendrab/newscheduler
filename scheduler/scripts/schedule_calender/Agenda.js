import React, { Component } from 'react';
import helper from './utils/helper';
import classnames from 'classnames';
import {layout} from './utils/constants';
import AgendaDetail from './AgendaDetail';

 class Agenda extends Component {
  
   caculateTop(iteratedCount, fixedTopMargin){
       const top = (40 * iteratedCount) + fixedTopMargin;
    return top;
   }

   caculateLeft(agStartDate, startDate, cellWidth){
    const dayDiff = helper.getDateDifferenceInDay(agStartDate, startDate);
    const left =  dayDiff * cellWidth;
    return left;
   }
   
   caculateWidth(agEndDate, agStartDate, cellWidth){
    const agDayDiff = helper.getDateDifferenceInDay(agEndDate, agStartDate);
    const width = (agDayDiff+1) * cellWidth;
    return width;
   }

   getMachedHeaderLayoutDetail(headerList, id, level =0){
    let indexCount = 0;
    let indexFound = false;
    let currentLevel = level;
    for(let index =0; index < headerList.length; index++){
        indexCount++;
        let header = headerList[index];
        if(header.RefId == id){
            indexFound = true;
            break;
        }else{
            if(header && header.childs && header.childs.length > 0){
                let obj = this.getMachedHeaderLayoutDetail(header.childs, id, level+1);
                indexFound = obj.indexFound
                indexCount = indexCount + obj.iteratedCount;
                if(obj.indexFound == true){
                    currentLevel =  obj.level;
                    break;
                }
            }
        }
    }
    return {indexFound: indexFound, iteratedCount: indexCount, level: currentLevel} ;
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
        let matchedHeaderLayoutDetail = this.getMachedHeaderLayoutDetail(header, agenda.RefId);
        const top = this.caculateTop(matchedHeaderLayoutDetail.iteratedCount, fixedTopMargin);
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
                level = {matchedHeaderLayoutDetail.level}
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