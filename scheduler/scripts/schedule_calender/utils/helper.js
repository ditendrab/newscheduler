import moment from 'moment';
import { clock, dateFormat, day } from './constants';
import { layout } from './constants';
import { Agenda } from '../models/Scheduler';

let helper = {
  splitTime(time, delimiter) {
    const del = delimiter === undefined ? ':' : delimiter;
    const times = time.split(del);
    const hour = parseInt(times[0]);
    const minute = parseInt(times[1]);
    const meridiem = times[2];
    return { hour: hour, minute: minute, meridiem: meridiem }
  },
  addTime(timeStr, hr, min) {
    let totalMin = 0;
    let times = helper.splitTime(timeStr);
    if (times.meridiem == 'PM') {
      times.hour += times.hour + 12;
    }
    totalMin = ((hr + times.hour) * clock.MINUTE) + times.minute + min;
    return totalMin;
  },
  countGridRow(startTime, endTime, interval) {
    const startTimeObj = helper.splitTime(startTime);
    const endTimeObj = helper.splitTime(endTime);
    let rowCount = 0;

    if (startTimeObj.meridiem !== endTimeObj.meridiem) {
      rowCount = 12 - startTimeObj.hour === 0 ? 12 : 12 - startTimeObj.hour
      rowCount += endTimeObj.hour;
    } else {
      rowCount = (endTimeObj.hour - startTimeObj.hour);
    }
    rowCount = rowCount * (60 / interval);
    return rowCount;
  },
  getIndexOfMatchedField(list, id, fieldName) {
    let index = 0;
    for (index = 0; index < list.length; index++) {
      if (list[index][fieldName] == id) {
        break;
      }
    }
    return index;
  },
  getLocalTime(date, formatStr = dateFormat.DATE_TIME_FORMAT) {
    let localDateTime = moment.utc(date).toDate();
    localDateTime = moment(localDateTime).format(formatStr);
    return localDateTime;
  },
  getTimeFromDateString(date, formatStr = 'hh:mm:a') {
    return helper.getLocalTime(date, formatStr);
  },
  getMinutesFromDate(date) {
    let localDateTime = helper.getLocalTime(date);
    return moment.duration(localDateTime).asMinutes();

  },

  getDateDifferenceInDay(date1, date2) {
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    var timeDiff = Math.abs(d1.getTime() - d2.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  },

  getDateDifferences(startDate, endDate, delimiter = 'month') {
    var differencesForMonth = [];
    var lastMonthDate;
    var monthDiff = this.getMonthDifference(new Date(startDate), new Date(endDate));
    for (var index = 0; index <= monthDiff; index++) {
      var startDateObj = new Date();
      var endDateObj = new Date();
      if (index == 0) {
        startDateObj = new Date(startDate);
        endDateObj = this.lastDate(startDateObj.getFullYear(), startDateObj.getMonth());
        lastMonthDate = endDateObj;
      } else if (index == monthDiff) {
        startDateObj = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 1);
        endDateObj = new Date(endDate);
      } else {
        startDateObj = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 1);
        endDateObj = this.lastDate(startDateObj.getFullYear(), startDateObj.getMonth());
        lastMonthDate = endDateObj;
      }
      differencesForMonth.push({ diff: (endDateObj.getDate() - startDateObj.getDate()) + 1, month: startDateObj.getMonth(), year: startDateObj.getFullYear() })
    }
    return differencesForMonth;
  },

  getMinutesFromTimeString(timeStr) {
    let times = helper.splitTime(timeStr);
    if (times.meridiem === 'AM' && times.hour === 12) {
      times.hour = 0;
    }
    let hour = times.meridiem === 'PM' ? 12 + times.hour : times.hour;
    let minute = times.minute;
    return moment.duration(hour + ':' + minute, "hh:mm").asMinutes();
  },
  subTimeToDateByMinute(date, minute) {
    let hr = minute !== 0 ? parseInt(minute / clock.MINUTE) : minute;
    let min = minute !== 0 ? minute % clock.MINUTE : minute;
    let localDateTime = moment.utc(date).format(dateFormat.DATE_TIME_FORMAT);
    return moment(localDateTime).subtract(hr, 'hours').subtract(min, 'minute').format(dateFormat.DATE_TIME_FORMAT_WITH_ZONE)
  },
  addTimeToDateByMinute(date, minute, formatStr = dateFormat.DATE_TIME_FORMAT_WITH_ZONE) {
    let hr = minute !== 0 ? parseInt(minute / clock.MINUTE) : minute;
    let min = minute !== 0 ? minute % clock.MINUTE : minute;
    let localDateTime = moment.utc(date).format(dateFormat.DATE_TIME_FORMAT);
    return moment(localDateTime).add(hr, 'hours').add(min, 'minute').format(formatStr);
  },
  getTimeIntervalLabel(date, duration) {
    let startDateTime = helper.getTimeFromDateString(date, dateFormat.TIME_FORMAT);
    let localDateTime = helper.getLocalTime(date);
    let endDateTime = helper.addTimeToDateByMinute(localDateTime, duration, dateFormat.TIME_FORMAT);
    return startDateTime + " -- " + endDateTime;

  },

  getDateList(startDateStr, endDateStr) {
    let dateList = [];
    let sDate = new Date(startDateStr);
    let eDate = new Date(endDateStr);
    let startDate = sDate.getDate();
    let endDate = eDate.getDate();
    let startMonth = sDate.getMonth();
    let endMonth = eDate.getMonth();
    let startYear = sDate.getFullYear();
    let endYear = eDate.getFullYear();
    let startDay = sDate.getDay();
    let monthDef = this.getMonthDifference(sDate, eDate);
    
    var weekDetail = [];

    var weekStart = true;
    var weekEnd = false;

    for (var index = 0; index <= monthDef; index++) {
      var firstDate = index == 0 ? startDate : 1;
      var lastDate = monthDef == 0 || (monthDef == index) ? endDate : this.lastDate(startYear, startMonth + index).getDate();
      var month = this.lastDate(startYear, startMonth + index).getMonth();

      for (var dIndex = firstDate; dIndex <= lastDate; dIndex++) {
        startDay = startDay % 7;
        dateList.push({ date: dIndex, day: day[startDay + 1] });
        startDay++;
      }
    }
    return dateList;
  },

  getWeekList(startDateStr, endDateStr) {
    let dateList = [];
    let sDate = new Date(startDateStr);
    let eDate = new Date(endDateStr);
    let startDate = sDate.getDate();
    let endDate = eDate.getDate();
    let startMonth = sDate.getMonth();
    let endMonth = eDate.getMonth();
    let startYear = sDate.getFullYear();
    let endYear = eDate.getFullYear();
    let startDay = sDate.getDay();
    let monthDef = this.getMonthDifference(sDate, eDate);
    
    var weekDetail = [];
    var weekStart = true;
    var weekEnd = false;
    var dayCount = 0;
    for (var index = 0; index <= monthDef; index++) {
      var firstDate = index == 0 ? startDate : 1;
      var lastDate = monthDef == 0 || (monthDef == index) ? endDate : this.lastDate(startYear, startMonth + index).getDate();
      var month = this.lastDate(startYear, startMonth + index).getMonth();

      for (var dIndex = firstDate; dIndex <= lastDate; dIndex++) {
        startDay = startDay % 7;
        dayCount++;
        if (startDay == 6) {
          weekEnd = true;
        }
        if (weekStart) {

          weekDetail.push({ start: { date: dIndex, day: day[startDay + 1], month: month }, end: {} });
          weekStart = false;
        }
        if (weekEnd || (index == monthDef && dIndex == lastDate)) {
          var weekObj = weekDetail[weekDetail.length - 1]
          weekObj.end = { date: dIndex, day: day[startDay + 1], month: month };
          weekObj['dayDiff'] = dayCount;
          weekStart = true;
          weekEnd = false;
          dayCount = 0;
        }
        startDay++;
      }
    }
    return weekDetail;
  },

  getMonthList(startDateStr, endDateStr) {
    let dateList = [];
    let sDate = new Date(startDateStr);
    let eDate = new Date(endDateStr);
    let startDate = sDate.getDate();
    let endDate = eDate.getDate();
    let startMonth = sDate.getMonth();
    let endMonth = eDate.getMonth();
    let startYear = sDate.getFullYear();
    let monthDef = this.getMonthDifference(sDate, eDate);
    
    var monthDetail = [];

    for (var index = 0; index <= monthDef; index++) {
      var firstDate = index == 0 ? startDate : 1;
      var lastDate = monthDef == 0 || (monthDef == index) ? endDate : this.lastDate(startYear, startMonth + index).getDate();
      var lastDateObj = this.lastDate(startYear, startMonth + index);
      var month = lastDateObj.getMonth();
      var year = lastDateObj.getFullYear();
      monthDetail.push({ diff: lastDate, month: month, year: year });
    }
    return monthDetail;
  },

  getYearList(startDateStr, endDateStr) {
    let dateList = [];
    let sDate = new Date(startDateStr);
    let eDate = new Date(endDateStr);
    let startDate = sDate.getDate();
    let endDate = eDate.getDate();
    let startMonth = sDate.getMonth();
    let endMonth = eDate.getMonth();
    let startYear = sDate.getFullYear();
    let yearDef = this.getYearDifference(sDate, eDate);
    
    var yearDetail = [];

    for (var index = 0; index <= yearDef; index++) {
      let lastDateOfYearObj = yearDef == 0 || (yearDef == index) ? eDate : this.lastDate(startYear+index, 11);
      let firstDate = index == 0 ? sDate : new Date(lastDateOfYearObj.getFullYear(),0,1);
      let dateDiff = this.getDateDifferenceInDay(firstDate, lastDateOfYearObj)
      yearDetail.push({ diff: dateDiff+1,  year: lastDateOfYearObj.getFullYear() });
    }
    return yearDetail;
  },

  lastDate(y, m) {
    return new Date(y, m + 1, 0);
  },
  getMonthDifference(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months += d2.getMonth();
    months -= d1.getMonth();
    return months <= 0 ? 0 : months;
},
getYearDifference(d1, d2) {
  var year = (d2.getFullYear() - d1.getFullYear());
 return year;
},

//    monthDiff(startDate, endDate) {
//     var months;
//     months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
//     months = months + startDate.getMonth() + endDate.getMonth()+ 1;
//     return months <= 0 ? 0 : months;
// },
  getCellWidth(view) {
    let width;

    switch (view) {
      case 'day':
        width = layout.DAY_CELL_WIDTH
        break;

      case 'week':
        width = layout.WEEK_CELL_WIDTH
        break;

      case 'month':
        width = layout.MONTH_CELL_WIDTH
    }
    return width;
  },
  getTopMargin(view) {
    let marginTop;

    switch (view) {
      case 'day':
      marginTop = layout.DAY_MARGIN_TOP
        break;

      case 'week':
      marginTop = layout.WEEK_MARGIN_TOP
        break;

      case 'month':
      marginTop = layout.MONTH_MARGIN_TOP
    }
    return marginTop;
  },

  
  mergeAgendaByDate(agendaList, refId, currentIndex = 0) {

    console.log("#######################################", agendaList);
    let newAgendaList = [];

    if ((agendaList && agendaList.length > 1) && (currentIndex < agendaList.length)) {
        let firstAgenda = Object.assign({}, agendaList[currentIndex]);
        console.log("firstAgenda==", firstAgenda);
        let shouldMerge = false;
        let mergeFound = false;
        for (var index = 0; index < currentIndex; index++) {
            newAgendaList.push(agendaList[index]);
        }

        for (var inIndex = currentIndex + 1; inIndex < agendaList.length; inIndex++) {
            let nextAgenda = Object.assign({}, agendaList[inIndex]);
            if (!mergeFound) {

                console.log("nextAgenda==", nextAgenda);
                var firstAgendaSD = new Date(firstAgenda.startDate).getTime();
                var firstAgendaED = new Date(firstAgenda.endDate).getTime();
                var nextAgendaSD = new Date(nextAgenda.startDate).getTime();
                var nextAgendaED = new Date(nextAgenda.endDate).getTime();
                let agenda = new Agenda();
                agenda.refId = refId;

                if (firstAgendaSD >= nextAgendaSD && firstAgendaSD <= nextAgendaED) {
                    agenda.startDate = nextAgenda.startDate;
                    shouldMerge = true;
                } else if (nextAgendaSD >= firstAgendaSD && nextAgendaSD <= firstAgendaED) {
                    console.log("***")
                    agenda.startDate = firstAgenda.startDate;
                    shouldMerge = true;
                } else {
                    agenda.startDate = firstAgenda.startDate;
                }

                if (firstAgendaED >= nextAgendaSD && firstAgendaED <= nextAgendaED) {
                    agenda.endDate = nextAgenda.endDate;
                    shouldMerge = true;
                } else if (nextAgendaED >= firstAgendaSD && nextAgendaED <= firstAgendaED) {
                    agenda.endDate = firstAgenda.endDate;
                    console.log("*****")
                    shouldMerge = true;
                } else {
                    agenda.endDate = firstAgenda.endDate;
                }
                if (shouldMerge) {
                    agenda.cost = firstAgenda.cost + nextAgenda.cost;
                    console.log("###shouldMerge##", agenda);
                    newAgendaList.push(agenda);
                    mergeFound = true;

                } else {
                    newAgendaList.push(nextAgenda);
                }
            } else {
                newAgendaList.push(nextAgenda);
            }
        }
        if (!mergeFound) {
            console.log("$$$$$$$$$$3333333333$$$$$$$", newAgendaList)

            newAgendaList.splice(currentIndex, 0, firstAgenda);
            console.log("$$$$$$$$$$$$33333333333333$$$$$", newAgendaList)
            currentIndex++;
        }
    } else {
        console.log("#########################*************########test######");
        for (var index = 0; index < agendaList.length; index++) {
            let agenda = Object.assign({}, agendaList[index]);
            agenda.refId = refId;
            newAgendaList.push(agenda);
        }

        return newAgendaList;
    }

    let test = this.mergeAgendaByDate(newAgendaList, refId, currentIndex);
    console.log("#################################test######", test);
    return test;
}


}

export default helper;

