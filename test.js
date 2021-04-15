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