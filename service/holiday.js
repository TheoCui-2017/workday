var promise = require('promise');
var request = require('../utility/request')();

exports.init = init; //初始化假期列表
exports.holidayByYear = holidayByYear; //根据年份获取假期列表
exports.daysBetween = daysBetween; // 获取时间段内工作日天数
exports.intervalHoliday = intervalHoliday; // 获取时间段内假期列表
exports.intervalWorkday = intervalWorkday; // 获取时间段内工作日列表
exports.dateDistance = dateDistance; // 获取固定时间前后多少工作日的时间
exports.workday = workday; // 根据日期判断是否为工作日

var holiday = [];

function init(years){
    console.log('初始化'+years.toString()+'年份的假期列表......');
    var times = [];
    for(var j in years){
        for(var k=1; k<13; k++){
            if(k < 10){
                k = '0'+k;
            }
            times.push(years[j]+''+k);
        }
    }
    // 获取假期列表
    var url = "http://www.easybots.cn/api/holiday.php?m="+times.toString();
    var headers = {
        "Content-Type": 'application/json'
    }
    var params = {};
    request.getData(url, 'GET', params, headers).then(function(body){
        try{
            var data = JSON.parse(body);
        }catch(exception){
            throw new Error('获取假期数据失败!');
        }
        for(var k in data){
            var m = data[k];
            for(var s in m){
                if(s < 1){
                    s = '0'+s;
                } 
                holiday.push(k+s);
            }
        }
        console.log('初始化完成！');
    }).catch(function(err){
        console.log(err);
        return holiday;
    });
}

function holidayByYear(year){
    var list = [];
    if(!year){
        return holiday;
    }
    for(var k in holiday){
        if(holiday[k].substring(0,4).indexOf(year) == 0){
            list.push(holiday[k]);
        }
    }
    return list;
}

function daysBetween(start, end){
    var holidayList = holiday;
    if(start.getFullYear() == end.getFullYear()){
        var year = start.getFullYear();
        holidayList = holidayByYear(year);
    }
    start = start.toDateString();
    end = end.toDateString();
    var startTime = new Date(start);
    var endTime = new Date(end);
    var workdays = intervalWorkday(startTime, endTime);
    return workdays.length;
}

function interval(startTime, endTime){
    // 获取时间区间
    var intervals = [];
    while((endTime.getTime()-startTime.getTime())>=0){
        var year = startTime.getFullYear();
        var month = startTime.getMonth().toString().length==1?"0"+(startTime.getMonth()+1).toString():startTime.getMonth()+1;
        var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
        intervals.push(year+month+day);
        startTime.setDate(startTime.getDate()+1);
    }
    return intervals;
}

function intervalHoliday(start, end){
    var holidayList = holiday;
    if(start.getFullYear() == end.getFullYear()){
        var year = start.getFullYear();
        holidayList = holidayByYear(year);
    }
    start = start.toDateString();
    end = end.toDateString();
    var startTime = new Date(start);
    var endTime = new Date(end);
    var intervals = interval(startTime,endTime);
    var list = [];
    for(var k in intervals){
        if(holidayList.indexOf(intervals[k]) > -1){
            list.push(intervals[k]);
        }
    }
    return list;
}

function intervalWorkday(start, end){
    var holidayList = holiday;
    if(start.getFullYear() == end.getFullYear()){
        var year = start.getFullYear();
        holidayList = holidayByYear(year);
    }
    start = start.toDateString();
    end = end.toDateString();
    var startTime = new Date(start);
    var endTime = new Date(end);
    var intervals = interval(startTime,endTime);
    var list = [];
    for(var k in intervals){
        if(holidayList.indexOf(intervals[k]) == -1){
            list.push(intervals[k]);
        }
    }
    return list;
}

function dateDistance(date, count){
    var start = new Date(date);
    var holidayList = holiday;
    var len = Math.abs(count);
    if(workday(start)){
        len--;
    }
    while(len >= 0){
        if(count > 0 && len > 0){
            start.setDate(start.getDate()+1);
        }
        else if(count < 0 && len > 0){
            start.setDate(start.getDate()-1);
        }
        var startTime = new Date(start);
        var year = startTime.getFullYear();
        var month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():startTime.getMonth()+1;
        var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
        var tmp = year.toString()+month.toString()+day.toString();
        if(len == 0){
            return year+'-'+month+'-'+day;
            break;
        }
        if(holidayList.indexOf(tmp) == -1){
            len--;
        }
    }
}

function workday(date){
    var year = date.getFullYear();
    var list = holidayByYear(year);
    var month = (date.getMonth()+1).toString().length==1?"0"+(date.getMonth()+1).toString():date.getMonth()+1;
    var day = date.getDate().toString().length==1?"0"+date.getDate():date.getDate();
    var tmp = year.toString()+month.toString()+day.toString();
    return (list.indexOf(tmp) == -1);
}