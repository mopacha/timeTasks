const schedule = require("node-schedule");
const request = require('request');

var resData = {
    "msgtype": "text",
    "text": {
        "content": "朋友们，别忘了点餐哦",
        "mentioned_list": ["@all"]
    }
};

function requestfun() {
    // url 为企业机器人的webhook
    request({
        url: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d1af7337-d0b7-46db-abeb-cbd7acbf8db2",
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(resData)
    }, function (error, response, body) {
        console.log('提示成功！');
    });
}

const scheduleCronstyle = () => {
    //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('30 * * * * *', () => {
        console.log('scheduleCronstyle:' + new Date());
        requestfun();
    });
}

scheduleCronstyle();
console.log('Start successfully');


