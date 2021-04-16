var formatDateTime = function (date) {
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return h + ':' + minute + ':' + '00';
};

// var superBookFoot = {
//     msgtype: "markdown",
//     markdown: {
//         content: "<font color=\"warning\">别忘了预订晚餐哦!</font>\n" +
//         "<img src='http://static.runoob.com/images/runoob-logo.png' width='50%'>" + 
//         "@所有人"
//         // mentioned_list: ["@all"]
//     }
// }

var is2yue8 = new Date().getMonth() + "-" + new Date().getDate() === '1-8'


var bookCar = {
    "msgtype": "text",
    "text": {
        "content": "加班辛苦了，可以打车啦！",
        "mentioned_list": ["@all"]
    }
}

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

/* schedule.scheduleJob(fanlai, () => {
     //console.log('饭来了:' + new Date());
     requestfun(footCome, prod);
     requestfun(atAll, prod);
 });*/


var fanlai = '00 00 18 * * 1-6'

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