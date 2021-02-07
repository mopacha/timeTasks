const schedule = require("node-schedule");
const request = require('request');

var bookFoot = {
    "msgtype": "text",
    "text": {
        "content": "【15:30:00】朋友们，别忘了预订晚餐哦!",
        "mentioned_list": ["@all"]
    }
}

var footCome = {
    "msgtype": "text",
    "text": {
        "content": "【18:00:00】朋友们，晚餐到了，开始干饭喽!",
        "mentioned_list": ["@all"]
    }
}

var bookCar = {
    "msgtype": "text",
    "text": {
        "content": "【20:50:00】朋友们，加班辛苦了，可以打车啦！",
        "mentioned_list": ["@all"]
    }
}

//内部
var test1 = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d1af7337-d0b7-46db-abeb-cbd7acbf8db2"
//大群
var test2 = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=8ea533b5-0991-4daa-b0e0-a9e4081cdf69"

function requestfun(contnet, webhookUrl) {
    // url 为企业机器人的webhook

    // test1: https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d1af7337-d0b7-46db-abeb-cbd7acbf8db2
    // test2: https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=8ea533b5-0991-4daa-b0e0-a9e4081cdf69
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

const scheduleCronstyle = () => {
    //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('00 30 15 * * 1-6', () => {
        console.log('点餐:' + new Date());
        requestfun(bookFoot, test1);
        requestfun(bookFoot, test2);
    });

    schedule.scheduleJob('00 00 18 * * 1-6', () => {
        console.log('饭来了:' + new Date());
        requestfun(footCome, test1);
        requestfun(footCome, test2);
    });

    schedule.scheduleJob('00 50 20 * * 1-6', () => {
        console.log('打车了:' + new Date());
        requestfun(bookCar, test1);
    });

    
}

scheduleCronstyle();

console.log('Start successfully');


