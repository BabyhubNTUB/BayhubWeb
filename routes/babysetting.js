var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const baby = require('./utility/baby');
const noti = require('./utility/notification');

//接收GET請求
router.get('/:babyno', function (req, res, next) {
    var babyno = req.params.babyno;   //取出參數

    baby.one(babyno).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else {
                    res.render('notFound', { noti: noti });  //導向找不到頁面
                }
            })
        } else {
            data.baby.birthday = moment(data.baby.birthday).format("YYYY-MM-DD");
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
                } else {
                    res.render('babysetting', { result: data, noti: noti });  //將資料傳給顯示頁面
                }
            })
        }
    })
});

module.exports = router;
