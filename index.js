const schedule = require("node-schedule");
const request = require('request');

var bookFoot = {
    "msgtype": "text",
    "text": {
        "content": "【时间：15:30:00】朋友们，别忘了预定晚餐哦!",
        "mentioned_list": ["@all"]
    }
}

var bookCar = {
    "msgtype": "text",
    "text": {
        "content": "【时间：20:50:00】朋友们，加班辛苦了，可以打车啦！",
        "mentioned_list": ["@all"]
    }
}

function requestfun(contnet) {
    // url 为企业机器人的webhook
    request({
        url: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=425f9fea-7e99-4c52-b172-1bda7f62c09c",
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
    schedule.scheduleJob('00 30 15 * * *', () => {
        console.log('点餐:' + new Date());
        requestfun(bookFoot);
    });

    schedule.scheduleJob('00 50 20 * * *', () => {
        console.log('打车:' + new Date());
        requestfun(bookCar);
    });
}

scheduleCronstyle();

console.log('Start successfully');


