'use strict';
var service = require('./service/holiday');

var that = {};

that.init = function (years){
    if(typeof(years) != 'object'){
        throw Error("年份格式不正确！");
    }
    if(!years.length){
        throw Error("年份为空！");
    }
    service.init(years);
}

that.holidayForYear = function(year){
    return service.holidayByYear(year);
}

that.distance = function(start, end){
    return service.daysBetween(start, end);
}

that.holidayInterval = function(start, end){
    return service.intervalHoliday(start, end);
}

that.workdayInterval = function(start, end){
    return service.intervalWorkday(start, end);
}

that.dateDistance = function(date,diff){
    return service.dateDistance(date, diff);
}

that.workday = function(date){
    return service.workday(date);
}

module.exports = that;