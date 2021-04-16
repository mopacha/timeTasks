const schedule = require("node-schedule");
const request = require('request');
const imgList = [
    'https://wx3.sinaimg.cn/mw690/005Ozs6vgy1gple2b38rbj31gh0u04qp.jpg',
    'https://wx4.sinaimg.cn/mw690/005Ozs6vgy1gple26tqe7j30g00a0dg0.jpg',
    'https://wx1.sinaimg.cn/mw690/005Ozs6vgy1gple22i4bnj30tf0icwge.jpg',
    'https://wx3.sinaimg.cn/mw690/005Ozs6vgy1gple1y6an8j30pa0gu75x.jpg',
    'https://wx4.sinaimg.cn/mw690/005Ozs6vgy1gple0wf38tj30dw08pdg3.jpg',
    'https://wx1.sinaimg.cn/mw690/005Ozs6vgy1gple0sac7rj30dw08p0sv.jpg',
    'https://wx3.sinaimg.cn/mw690/005Ozs6vgy1gple0o9dutj30dw08p74g.jpg',
    'https://wx4.sinaimg.cn/mw690/005Ozs6vgy1gple0ka44xj30dw08p3yx.jpg',
    'https://wx3.sinaimg.cn/mw690/005Ozs6vgy1gple0f4ihqj30hs0do752.jpg',
    'https://wx3.sinaimg.cn/mw690/005Ozs6vgy1gplexoq8e8j30rs0fmabg.jpg'
]

const getImg = function () {
    const index = parseInt(Math.random() * 11);
    return imgList[index]
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

//内部
var test = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d1af7337-d0b7-46db-abeb-cbd7acbf8db2"
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

const scheduleCronstyle = () => {
    schedule.scheduleJob(diancan, () => {
       // console.log('点餐:' + new Date());
        requestfun(bookFoot, prod);
        requestfun(atAll, prod);
    });
}

scheduleCronstyle();

console.log('Start successfully');


