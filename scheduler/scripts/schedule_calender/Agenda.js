import React, { Component } from 'react';
import helper from './utils/helper';
import classnames from 'classnames';
import {layout} from './utils/constants';
import AgendaDetail from './AgendaDetail';

 class Agenda extends Component {
   
    renderAgendaList(props){
        const top = 70, height = 35, left=180;
        const {agendaList} = props;
     return agendaList.map((agenda, index)=> {
         console.log("agenda=",agenda);
        return(
            <td>
              <AgendaDetail
                top = {top}
                height = {height}
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
               {this.renderAgendaList(this.props)}
             </tbody>
         </table>
    );
   }
 } 

 export default Agenda;