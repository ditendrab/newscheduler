import React, { Component } from 'react';
import ScheduleCalender from './schedule_calender/ScheduleCalender';
import classnames from 'classnames';
import { views} from './schedule_calender/utils/constants';

const agendaList = [{ id:1, "StartDate": "07-20-2018", "EndDate": '07-23-2018', 'RefId':'2'},
{ id:1, "StartDate": "07-07-2018", "EndDate": '07-12-2018','RefId':'3'},
{ id:1, "StartDate": "07-05-2018", "EndDate": '07-05-2018','RefId':'1'},
{ id:1, "StartDate": "07-10-2018", "EndDate": '07-20-2018','RefId':'5'},
{ id:1, "StartDate": "07-09-2018", "EndDate": '07-15-2018','RefId':'6'},
{ id:1, "StartDate": "07-19-2018", "EndDate": '07-26-2018','RefId':'1'}];

  

const headerList = [{name:"Advertisement", RefId:"1"}, 
   {name: "Airtel Branding", RefId:"2"}, 
   {name: "Outdoor", RefId:"3"},
   {name: "facebook", RefId:"4"},
   {name: "Other", RefId:"5"},
   {name:"Vodafone Branding", RefId:"6"},
   {name: "Twitter", RefId:"7"}];

let current;   

class App extends Component {
   constructor(){
     super();
     this.state = { agendaList: agendaList, headerList: headerList, currentView: views.WEEK};
     current = this;
  }  

  changeState(index, agenda){
     current.myState();
  }

  viewChange(e){
    current.setState({currentView : e.target.id})
  }

  renderScheduler(){

    const startDate = "07-01-2018";       
    const endDate = "09-03-2018";
    const interval = 30;

    return (<ScheduleCalender changeState={this.changeState}
    startDate={startDate}
    endDate={endDate}
    interval={interval}
    view={this.state.currentView}
    header={this.state.headerList} 
    chairFieldName='OperatoryID'
    agendaList={this.state.agendaList}/>)
  }

  myState(){
    current.setState({agendaList:agendaList})
  }

  render() {
    console.log("#####",current.state.currentView);
    let view = current.state.currentView;
    return (
     <div>
       <button className={(view == 'day' ? classnames('btn active-btn') : 'btn')} type="button"  id="day" onClick={this.viewChange}>Day</button>
       <button className={(view == 'week' ?  classnames('btn active-btn') : 'btn')} type="button"  id="week" onClick={this.viewChange}>Week</button>
       <button className={(view == 'month' ?  classnames('btn active-btn') : 'btn')} type="button" id="month" onClick={this.viewChange}>Month</button>
        {current.renderScheduler('day')}
      </div>
    );
  }
}
export default App;