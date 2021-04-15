const schedule = require("node-schedule");
const request = require('request');

const getImg = function () {
    const id = parseInt(Math.random() * 10);
    return 'https://github.com/mopacha/timeTasks/blob/master/imgs/' + `${id}` + '.jpg?raw=true'
}

var atAll = {
    "msgtype": "text",
    "text": {
        "content": "",
        "mentioned_list": ["@all"]
    }
}


var bookFoot = {
    msgtype: "news",
    news: {
        articles: [
            {
                title: "别忘了预订晚餐哦!",
                url: "weixin://dl",
                picurl: getImg()
            }
        ]
    }
}


var footCome = {
    msgtype: "news",
    news: {
        articles: [
            {
                title: "晚餐到啦，干饭啦！",
                url: "weixin://dl",
                picurl: getImg()
            }
        ]
    }
}


//内部
var test1 = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d1af7337-d0b7-46db-abeb-cbd7acbf8db2"
//大群
var prod = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=87d95ac8-497a-4152-b3c0-689ce5108268"

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


var diancan = '00 30 15 * * 1-6'
var fanlai = '00 00 18 * * 1-6'

const scheduleCronstyle = () => {
    schedule.scheduleJob(diancan, () => {
       // console.log('点餐:' + new Date());
        requestfun(bookFoot, prod);
        requestfun(atAll, prod);
    });

   /* schedule.scheduleJob(fanlai, () => {
        //console.log('饭来了:' + new Date());
        requestfun(footCome, prod);
        requestfun(atAll, prod);
    });*/
}

scheduleCronstyle();

console.log('Start successfully');


