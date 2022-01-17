const schedule = require("node-schedule");
const request = require('request');
const imgList = [
    {
        url: 'https://sensorsdata.cn/assets/figure/webhook/1s.jpeg',
        origin: 'https://sensorsdata.cn/assets/figure/webhook/1b.jpeg'
    },
    {
        url: 'https://sensorsdata.cn/assets/figure/webhook/2s.jpeg',
        origin: 'https://sensorsdata.cn/assets/figure/webhook/2b.jpeg'
    },
    {
        url: 'https://sensorsdata.cn/assets/figure/webhook/3s.jpeg',
        origin: 'https://sensorsdata.cn/assets/figure/webhook/3b.jpg'
    },
    {
        url: 'https://sensorsdata.cn/assets/figure/webhook/4s.jpg',
        origin: 'https://sensorsdata.cn/assets/figure/webhook/4b.jpg'
    },
    {
        url: 'https://sensorsdata.cn/assets/figure/webhook/5s.jpg',
        origin: 'https://sensorsdata.cn/assets/figure/webhook/5b.jpg'
    },
    {
        url: 'https://sensorsdata.cn/assets/figure/webhook/6.jpg',
        origin: 'https://sensorsdata.cn/assets/figure/webhook/6.jpg'
    },
    {
        url: 'https://sensorsdata.cn/assets/figure/webhook/7.jpg',
        origin: 'https://sensorsdata.cn/assets/figure/webhook/7.jpg'
    }
]

const getImg = function () {
    const index = parseInt(Math.random() * 3);
    const {
        url,
        origin
    } = imgList[index]
    return {
        url,
        origin
    }
}

const atAll = {
    "msgtype": "text",
    "text": {
        "content": "",
        "mentioned_list": ["@all"]
    }
}

function bookFoot() {
    const {
        url,
        origin
    } = getImg()

    var bookFoot = {
        msgtype: "news",
        news: {
            articles: [
                {
                    title: "别忘了预订晚餐哦!",
                    url: origin,
                    picurl: url
                }
            ]
        }
    }
    return bookFoot
}

//内部
const test1 = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d1af7337-d0b7-46db-abeb-cbd7acbf8db2"
//大群
const prod = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=87d95ac8-497a-4152-b3c0-689ce5108268"

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


const diancan1 = '00 00 11 * * 1-5';

const diancan2 = '00 30 15 * * 1-5';

const scheduleCronstyle = () => {
    schedule.scheduleJob(diancan1, () => {
        // console.log('点餐:' + new Date());
        requestfun(bookFoot(), prod);
        requestfun(atAll, prod);
    });
    schedule.scheduleJob(diancan2, () => {
        // console.log('点餐:' + new Date());
        requestfun(bookFoot(), prod);
        requestfun(atAll, prod);
    });
}

scheduleCronstyle();

console.log('Start successfully');


