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
 
   getAllChildsId(headerList){
       let ids = [];
       if(headerList)
       for(let  index = 0; index < headerList.length; index++){
        if(headerList[index].RefId){
            ids.push(headerList[index].RefId)
           if(headerList[index].childs && headerList[index].childs.length > 0){
            let childsId = this.getAllChildsId(headerList[index].childs);
            ids = ids.concat(childsId);
           }
        }
      }
      return ids;
   }

   findAllHiddenHeaders(headerList){
     let hiddenHeadersId = [];  
    if(headerList && headerList.length > 0){
      for(let  index = 0; index < headerList.length; index++){
          if(headerList[index].hide){
            hiddenHeadersId.push(headerList[index].RefId)
            let childIds = this.getAllChildsId(headerList[index].childs);
            hiddenHeadersId = hiddenHeadersId.concat(childIds);
          }else{
             if(headerList[index].childs && headerList[index].childs.length > 0){
              let childHiddenHeadersId = this.findAllHiddenHeaders(headerList[index].childs);
              hiddenHeadersId = hiddenHeadersId.concat(childHiddenHeadersId);
             }
          }
        }
     }
     return hiddenHeadersId;
  }

   getMachedHeaderLayoutDetail(headerList, id, level =0){
    let indexCount = 0;
    let indexFound = false;
    let currentLevel = level;
    for(let index =0; index < headerList.length; index++){
        let header = headerList[index];
        if(!header.hide){
            indexCount++;
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
    }
    return {indexFound: indexFound, iteratedCount: indexCount, level: currentLevel} ;
   }

    renderAgendaList(props){
        const {agendaList, startDate, endDate, headerList, view} = props;
        const startDateTimestamp = new Date(startDate).getTime();
        const endDateTimestamp = new Date(endDate).getTime();
        const cellWidth = helper.getCellWidth(view);
        const fixedTopMargin = helper.getTopMargin(view);
        let hiddenHeadersId = this.findAllHiddenHeaders(this.props.headerList);
        return agendaList.map((agenda, index)=> {

        const agStartDateTimestamp = new Date(agenda.StartDate).getTime();
        const agEndDateTimestamp = new Date(agenda.EndDate).getTime();
        const agStartDate = agStartDateTimestamp < startDateTimestamp ? startDate: agenda.StartDate;
        const agEndDate = agEndDateTimestamp > endDateTimestamp ? endDate: agenda.EndDate;
        let matchedHeaderLayoutDetail = this.getMachedHeaderLayoutDetail(headerList, agenda.RefId);
        const top = this.caculateTop(matchedHeaderLayoutDetail.iteratedCount, fixedTopMargin);
        const left = this.caculateLeft(agStartDate, startDate, cellWidth);
        const height = layout.CELL_HEIGHT;
        const width = this.caculateWidth(agEndDate, agStartDate, cellWidth);
        let shouldRenderAgendaDetail = true;
        if(hiddenHeadersId && hiddenHeadersId.length > 0 && hiddenHeadersId.indexOf(agenda.RefId) != -1){
            shouldRenderAgendaDetail = false;
        }
        if(shouldRenderAgendaDetail)
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