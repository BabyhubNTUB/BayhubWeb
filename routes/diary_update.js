var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const diary = require('./utility/diary');
const noti = require('./utility/notification');

//接收POST請求
router.post('/', function (req, res, next) {
    var serno = req.body.serno;

    var newData = {
        serno: serno,
        diary: req.body.diary,
        diarydate: req.body.diarydate
    }

    diary.update(newData).then(d => {
        if (d >= 0) {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound');  //導向找不到頁面                
                } else {
                    res.render('userSuccess', { results: d, noti: noti });  //將資料傳給顯示頁面
                }
            })
        } else {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound');  //導向找不到頁面                
                } else {
                    res.render('userFail', { noti: noti });  //將資料傳給顯示頁面
                }
            })
        }
    })
});

//匯出
module.exports = router;