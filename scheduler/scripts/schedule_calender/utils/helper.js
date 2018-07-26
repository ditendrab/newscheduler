import moment from 'moment';
import { clock, dateFormat, day } from './constants';
import { layout } from './constants';

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
    console.log("@@@@@@@@@@",monthDef);
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
    console.log("@@@@@@@@@@",monthDef);
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
    console.log("@@@@@@@@monthDef@@",monthDef);
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
  }

}

export default helper;

