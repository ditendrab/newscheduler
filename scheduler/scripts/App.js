import React, { Component } from 'react';
import ScheduleCalender from './schedule_calender/ScheduleCalender';
import classnames from 'classnames';
import { views } from './schedule_calender/utils/constants';
import helper from './schedule_calender/utils/helper';
import { schedulerData } from './schedule_calender/data/scheduler';
import { SchedulerHeader, Agenda } from './schedule_calender/models/Scheduler';

const agendaList = [
{ id: 1, "StartDate": "2018-06-10", "EndDate": '2018-07-05', 'RefId': '1-0', cost:'$10,53,000' },
{ id: 1, "StartDate": "2018-07-20", "EndDate": '2018-08-18', 'RefId': '1-0', cost:'$5,00,000' },
{ id: 1, "StartDate": "2018-06-10", "EndDate": '2018-07-05', 'RefId': '1-1' , cost:'$10,53,000' },
{ id: 1, "StartDate": "2018-06-10", "EndDate": '2018-07-05', 'RefId': '1-2' , cost:'$10,53,000' },
{ id: 1, "StartDate": "2018-07-20", "EndDate": '2018-08-18', 'RefId': '1-3' , cost:'$5,00,000' },
{ id: 1, "StartDate": "2018-07-20", "EndDate": '2018-08-18', 'RefId': '1-4' , cost:'$5,00,000' },
{ id: 1, "StartDate": "2018-07-10", "EndDate": '2018-07-25', 'RefId': '2-0' , cost:'$75,000' },
{ id: 1, "StartDate": "2018-08-05", "EndDate": '2018-08-25', 'RefId': '2-0' , cost:'$75,000' },
{ id: 1, "StartDate": "2018-09-01", "EndDate": '2018-10-23', 'RefId': '2-0' , cost:'$2,10,000' },
{ id: 1, "StartDate": "2018-07-10", "EndDate": '2018-07-25', 'RefId': '2-1' , cost:'$75,000' },
{ id: 1, "StartDate": "2018-08-05", "EndDate": '2018-08-25', 'RefId': '2-1' , cost:'$75,000' },
{ id: 1, "StartDate": "2018-09-01", "EndDate": '2018-10-23', 'RefId': '2-1' , cost:'$2,10,000' },
{ id: 1, "StartDate": "2018-07-10", "EndDate": '2018-07-25', 'RefId': '2-2' , cost:'$75,000' },
{ id: 1, "StartDate": "2018-08-05", "EndDate": '2018-08-25', 'RefId': '2-2' , cost:'$75,000' },
{ id: 1, "StartDate": "2018-09-01", "EndDate": '2018-10-23', 'RefId': '2-2' , cost:'$2,10,000' },
{ id: 1, "StartDate": "2018-06-15", "EndDate": '2018-08-05', 'RefId': '3-0' , cost:'$20,000' },
{ id: 1, "StartDate": "2018-09-15", "EndDate": '2018-12-25', 'RefId': '3-0' , cost:'$60,000' },
{ id: 1, "StartDate": "2018-06-15", "EndDate": '2018-08-05', 'RefId': '3-1' , cost:'$20,000' },
{ id: 1, "StartDate": "2018-09-15", "EndDate": '2018-12-25', 'RefId': '3-1' , cost:'$60,000' },
{ id: 1, "StartDate": "2018-06-15", "EndDate": '2018-08-05', 'RefId': '3-2' , cost:'$20,000' },
{ id: 1, "StartDate": "2018-09-15", "EndDate": '2018-12-25', 'RefId': '3-2' , cost:'$60,000' }];



const headerList = [{
  name: "Social Media", RefId: "1-0", title:true, cost:'$15,53,000', hide:false, childs: [{
    name: "Facebook", RefId: "1-1",  cost:'$10,53,000', hide:false,childs: [{
      name: "UAE | Arabic | Newfeed",  cost:'$10,53,000', hide:false, RefId: "1-2"
    }]
  },
  {
    name: "Instagram", RefId: "1-3",  cost:'$10,53,000', hide:false,childs: [{
      name: "UAE | Arabic | Newfeed",  cost:'$10,53,000', hide:false, RefId: "1-4"
    }]
  }]
},
{
  name: "Paid Search", RefId: "2-0",  cost:'$3,60,000', hide:false, title:true, childs: [{
    name: "Adwords", RefId: "2-1",  cost:'$3,60,000', hide:false, childs: [{
      name: "UAE | Arabic | Newfeed",  cost:'$3,60,000', hide:false, RefId: "2-2"
    }]
  }]
},
{
  name: "Video", RefId: "3-0",  title:true,  cost:'$80,000', hide:false, childs: [{
    name: "Youtube", RefId: "3-1", cost:'$80,000', hide:false, childs: [{
      name: "UAE | Arabic | Newfeed", cost:'$80,000', hide:false, RefId: "3-2"
    }]
  }]
}
];

let current;

class App extends Component {
  constructor() {
    super();
    this.state = { agendaList: agendaList, headerList: headerList, currentView: views.MONTH };
    current = this;
  }

  changeState(index, agenda) {
    current.myState();
  }

  viewChange(e) {
    current.setState({ currentView: e.target.id })
  }

  componentWillMount(){
   let schdulerData =  this.buildDataForScheduler(schedulerData);
   console.log("schdulerData=",schdulerData);
   current.setState({ headerList: schdulerData.headerList, agendaList: schdulerData.agendaList});
  }
  buildDataForScheduler(list) {
    let scheduleHeaderList = [];
    let agendaList = [];
    let mediaAgendaList = [];
    if (list.digitalMediaResponse && list.digitalMediaResponse.length > 0) {
        let digitalMedialist = list.digitalMediaResponse;
        for (let index = 0; index < digitalMedialist.length; index++) {
            let media = digitalMedialist[index];

            let mediaHeader = new SchedulerHeader();
            scheduleHeaderList.push(mediaHeader);
            mediaHeader.name = media.mediaName;
            mediaHeader.hide = false;
            mediaHeader.cost = media.mediaCost;
            mediaHeader.childs = [];
            mediaHeader.refId = "media-" + index;
            mediaHeader.title = true;
            let parentAgendaList = [];

            if (media.digitalChannelListResponse && media.digitalChannelListResponse.length > 0) {
                let channelList = media.digitalChannelListResponse;
                for (let chIndex = 0; chIndex < channelList.length; chIndex++) {
                    let channel = channelList[chIndex];
                    let channelHeader = new SchedulerHeader();

                    channelHeader.name = channel.channelName;
                    channelHeader.hide = false;
                    channelHeader.cost = channel.channelCost;
                    channelHeader.childs = [];
                    channelHeader.refId = "channel-" + chIndex+"-m"+index;
                    mediaHeader.childs.push(channelHeader);
                    let digitalAgendaList = [];

                    if (channel.digitalChannelResponses && channel.digitalChannelResponses.length > 0) {
                        let digitalChannels = channel.digitalChannelResponses;

                        for (let dchIndex = 0; dchIndex < digitalChannels.length; dchIndex++) {
                            let digitalChannel = digitalChannels[dchIndex];
                            let digitalChannelHeader = new SchedulerHeader();
                            let name = digitalChannel.market.marketName + " | " + digitalChannel.language.label + " | " + digitalChannel.adformat.formatName + " | " + digitalChannel.adsize.sizeName
                            digitalChannelHeader.name = name;
                            digitalChannelHeader.cost = digitalChannel.totalCost;
                            digitalChannelHeader.hide = false;
                            digitalChannelHeader.refId = "dgChannel-" + dchIndex + "-"+ channelHeader.refId
                            channelHeader.childs.push(digitalChannelHeader);
                            let digitalFlights = digitalChannel.digitalFlights;
                            if (digitalFlights && digitalFlights.length > 0) {
                                for (let dFlights = 0; dFlights < digitalFlights.length; dFlights++) {
                                    let digitalFlight = digitalFlights[dFlights];
                                    let agenda = new Agenda();
                                    agenda.cost = digitalFlight.flightCost;
                                    agenda.startDate = digitalFlight.startDate;
                                    agenda.endDate = digitalFlight.endDate;
                                    agenda.refId = digitalChannelHeader.refId;
                                    digitalAgendaList.push(agenda);
                                }
                            }else{
                               let agenda = new Agenda();
                                    agenda.cost = digitalChannel.totalCost;
                                    agenda.startDate = digitalChannel.startDate;
                                    agenda.endDate = digitalChannel.endDate;
                                    agenda.refId = digitalChannelHeader.refId;
                                    digitalAgendaList.push(agenda);
                            }

                        }
                    }
                    let tempParentAgendaList = this.getParentDateRange(digitalAgendaList, channelHeader.refId);
                    console.log("==tempParentAgendaList",tempParentAgendaList);
                    agendaList = agendaList.concat(digitalAgendaList);
                    parentAgendaList = parentAgendaList.concat(tempParentAgendaList);
                }
            }
            agendaList = agendaList.concat(parentAgendaList);
            let tempMediaAgendaList = this.getParentDateRange(parentAgendaList, mediaHeader.refId);
            mediaAgendaList = mediaAgendaList.concat(tempMediaAgendaList);
        }
    }
    agendaList = agendaList.concat(mediaAgendaList);
    return {"headerList": scheduleHeaderList, "agendaList" : agendaList};
}


getParentDateRange(agendaList, refId) {
    let updatedAgendaList = helper.mergeAgendaByDate(agendaList, refId, 0);
    console.log("updatedAgendaList",updatedAgendaList);
    return updatedAgendaList;
}

  renderScheduler() {

    const startDate = "08-01-2018";  //mm-dd-yyyy     
    const endDate = "02-05-2019";
    const interval = 30;

    return (<ScheduleCalender changeState={this.changeState}
      startDate={startDate}
      endDate={endDate}
      interval={interval}
      view={this.state.currentView}
      headerList={this.state.headerList}
      chairFieldName='OperatoryID'
      agendaList={this.state.agendaList} />)
  }

  myState() {
    current.setState({ agendaList: agendaList })
  }

  render() {
    
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