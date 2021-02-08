const schedule = require("node-schedule");
const request = require('request');

var formatDateTime = function (date) {  
    var h = date.getHours();  
    h=h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    return h+':'+minute+':'+'00';  
};  

var bookFoot = {
    "msgtype": "text",
    "text": {
        "content": "别忘了预订晚餐哦!",
        "mentioned_list": ["@all"]
    }
}

var footCome = {
    "msgtype": "text",
    "text": {
        "content": "晚餐到啦，干饭啦！",
        "mentioned_list": ["@all"]
    }
}

var bookCar = {
    "msgtype": "text",
    "text": {
        "content": "【" +formatDateTime(new Date)+"】"+"加班辛苦了，可以打车啦！",
        "mentioned_list": ["@all"]
    }
}

//内部
var test1 = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d1af7337-d0b7-46db-abeb-cbd7acbf8db2"
//大群
var test2 = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=8ea533b5-0991-4daa-b0e0-a9e4081cdf69"

var is2yue8 = new Date().getMonth() + "-" +new Date().getDate() === '1-8'

function requestfun(contnet, webhookUrl) {
// url 为企业机器人的webhook
   request({
        url: webhookUrl,
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(contnet)
    }, function (error, response, body) {
        console.log('提示成功！');
    });
}


var diancan = is2yue8 ? '00 30 14 * * 1-6' :'00 30 15 * * 1-6'
var fanlai =  is2yue8 ? '00 00 17 * * 1-6' :'00 00 18 * * 1-6'

const scheduleCronstyle = () => {
    //每分钟的第30秒定时执行一次
    schedule.scheduleJob(diancan, () => {
        console.log('点餐:' + new Date());
        requestfun(bookFoot, test1);
        requestfun(bookFoot, test2);
    });

    schedule.scheduleJob(fanlai, () => {
        console.log('饭来了:' + new Date());
        requestfun(footCome, test1);
        requestfun(footCome, test2);
    });

    // 周一到周五 20：50可以打车
    schedule.scheduleJob('00 50 20 * * 1-5', () => {
        console.log('工作日打车:' + new Date());
        requestfun(bookCar, test1);
    });
    // 周六21:00才能打车
    schedule.scheduleJob('00 00 21 * * 6', () => {
        console.log('周六打车:' + new Date());
        requestfun(bookCar, test1);
    });
}

scheduleCronstyle();

console.log('Start successfully');


