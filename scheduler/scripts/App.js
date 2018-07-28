import React, { Component } from 'react';
import ScheduleCalender from './schedule_calender/ScheduleCalender';
import classnames from 'classnames';
import { views } from './schedule_calender/utils/constants';

const agendaList = [{ id: 1, "StartDate": "07-20-2018", "EndDate": '07-23-2018', 'RefId': '2-0' },
{ id: 1, "StartDate": "06-04-2018", "EndDate": '07-12-2018', 'RefId': '3-0' },
{ id: 1, "StartDate": "06-10-2018", "EndDate": '08-05-2018', 'RefId': '1-0' }];



const headerList = [{
  name: "Social Media", RefId: "1-0", title:true, childs: [{
    name: "Facebook", RefId: "1-1", childs: [{
      name: "UAE|Arabic|Newfeed", RefId: "1-2"
    }]
  }]
},
{
  name: "Paid Search", RefId: "2-0", title:true, childs: [{
    name: "Adwords", RefId: "2-1", childs: [{
      name: "UAE|Arabic|Newfeed", RefId: "2-2"
    }]
  }]
},
{
  name: "Video", RefId: "3-0",  title:true, childs: [{
    name: "Youtube", RefId: "3-1", childs: [{
      name: "UAE|Arabic|Newfeed", RefId: "3-2"
    }]
  }]
}
];

let current;

class App extends Component {
  constructor() {
    super();
    this.state = { agendaList: agendaList, headerList: headerList, currentView: views.DAY };
    current = this;
  }

  changeState(index, agenda) {
    current.myState();
  }

  viewChange(e) {
    current.setState({ currentView: e.target.id })
  }

  renderScheduler() {

    const startDate = "06-03-2018";  //mm-dd-yyyy     
    const endDate = "02-05-2019";
    const interval = 30;

    return (<ScheduleCalender changeState={this.changeState}
      startDate={startDate}
      endDate={endDate}
      interval={interval}
      view={this.state.currentView}
      header={this.state.headerList}
      chairFieldName='OperatoryID'
      agendaList={this.state.agendaList} />)
  }

  myState() {
    current.setState({ agendaList: agendaList })
  }

  render() {
    console.log("#####", current.state.currentView);
    let view = current.state.currentView;
    return (
      <div className="componentMain">
        <div className="btn-group">
          <button className={(view == 'day' ? classnames('btn btn-secondary active') : 'btn btn-default')} type="button" id="day" onClick={this.viewChange}>Day</button>
          <button className={(view == 'week' ? classnames('btn btn-secondary active') : 'btn btn-default')} type="button" id="week" onClick={this.viewChange}>Week</button>
          <button className={(view == 'month' ? classnames('btn btn-secondary active') : 'btn btn-default')} type="button" id="month" onClick={this.viewChange}>Month</button>
        </div>
        {current.renderScheduler('day')}
      </div>
    );
  }
}
export default App;