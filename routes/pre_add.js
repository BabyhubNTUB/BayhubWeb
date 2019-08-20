var express = require('express');
var router = express.Router();

//增加引用函式
const pre = require('./utility/pregnancyKnowledge');

//接收POST請求
router.post('/', function (req, res, next) {
    var managerno = "V0124";
    var title = req.body.title;
    var source = req.body.source;
    var content = req.body.content;
    // 建立一個新資料物件
    var newData = {
        managerno: managerno,
        title: title,
        source: source, 
        content: content,
    }
    console.log(newData);
    pre.addMan(newData).then(d => {
        if (d==0) {
            res.render('registerSuccess');  //傳至成功頁面
        } else {
            res.render('registerFail');     //導向錯誤頁面
            console.log("****************************");
        }
    })
});

module.exports = router;