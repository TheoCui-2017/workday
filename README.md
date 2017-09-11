# 工作日插件

## 用法

```javascipt
  # 初始化
  var current = new Date().getFullYear();
  var last = parseInt(current)-1;
  var next = parseInt(current)+1;
  var years = [last, current, next];
  var workdayPlugin = require('workday-plugin');
  workdayPlugin.init(years);
 
  # 使用
  var start = new Date('2017-01-01');
  var end = new Date('2017-10-10');
  var diff = workdayPlugin.distance(start,end);
  cosole.log('时间间隔为'+diff+'天工作日');
  # 显示：时间间隔为5天工作日

```

## 方法  
### 1. 根据年份获取假期列表
#### 方法名
holidayForYear(year)
#### 请求参数
| 参数     |  数据类型  | 说明         | 
| ------- | :---------: | ------------ |
| year   |  string   | 年份 |
#### 返回数据
例如：year = 2017;
['20170101','20170102','20170107',......]

--- 

### 2. 根据日期区间获取假期列表
#### 方法名
holidayInterval(start,end)
#### 请求参数
| 参数     |  数据类型  | 说明         | 
| ------- | :---------: | ------------ |
| start   |  datetime   | 开始时间 |
| end   |  datetime   | 结束时间 |
#### 返回数据 
例如：start = new Date('2017-01-01'), end = new Date('2017-01-10');
[ '20170101', '20170102', '20170107', '20170108' ]
#### 备注
返回数据包含起止日期

---

### 3. 根据日期区间获取工作日列表
#### 方法名
workdayInterval(start,end)
#### 请求参数
| 参数     |  数据类型  | 说明         | 
| ------- | :---------: | ------------ |
| start   |  datetime   | 开始时间 |
| end   |  datetime   | 结束时间 |
#### 返回数据
例如：start = new Date('2017-01-01'), end = new Date('2017-01-10');
[ '20170103',
  '20170104',
  '20170105',
  '20170106',
  '20170109',
  '20170110' ]
#### 备注
返回数据包含起止日期

---

### 4. 根据日期区间获取之间工作日天数
#### 方法名
distance(start,end)
#### 请求参数
| 参数     |  数据类型  | 说明         | 
| ------- | :---------: | ------------ |
| start   |  datetime   | 开始时间 |
| end   |  datetime   | 结束时间 |
#### 返回数据
例如：start = new Date('2017-01-04'),  end = new Date('2017-01-10');
结果为：5
#### 备注
返回数据包含起止日期

---

### 5. 根据日期和工作日天数获取之前或之后的日期
#### 方法名
dateDistance(date,count)
#### 请求参数
| 参数     |  数据类型  | 说明         | 
| ------- | :---------: | ------------ |
| date   |  datetime   | 开始时间 |
| count   |  int   | 相差天数 |
#### 返回数据
例如：date = new Date('2017-01-10'),  count = -5;
结果为：'2017-01-04' string类型
#### 备注
返回数据包含开始日期

---

### 5. 判断日期是否为工作日日期
#### 方法名
workday(date)
#### 请求参数
| 参数     |  数据类型  | 说明         | 
| ------- | :---------: | ------------ |
| date   |  datetime   | 日期 |
#### 返回数据
例如：date = new Date('2017-01-10');
结果为：true

---

