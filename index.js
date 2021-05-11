const schedule = require("node-schedule");
const request = require('request');
const imgList = [
    {
        url: 'https://wx2.sinaimg.cn/mw690/005Ozs6vgy1gplrl1u1fej30u00l0tce.jpg',
        origin: 'https://wx4.sinaimg.cn/mw690/005Ozs6vgy1gplodbqtalj30u0140x23.jpg'
    },
    {
        url: 'https://wx3.sinaimg.cn/mw690/005Ozs6vgy1gplrwni3ewj30if0ajtnm.jpg',
        origin: 'https://wx4.sinaimg.cn/mw690/005Ozs6vgy1gplod76f2yj30b40gyaqb.jpg'
    }
]

const getImg = function () {
    const index = parseInt(Math.random() * 2);
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


const diancan1 = '00 00 11 * * 1-6';

const diancan2 = '00 30 15 * * 1-6';

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


