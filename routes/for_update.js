var express = require('express');
var router = express.Router();

//增加引用函式
const forum = require('./utility/forum');
const noti = require('./utility/notification');

//接收POST請求
router.post('/', function (req, res, next) {
    var forumno = req.body.forumno;

    var newData = {
        forumno: forumno,
        typeno: req.body.typeno,
        forumname: req.body.forumname,
        content: req.body.content
    }

    forum.update(newData).then(d => {
        if (d >= 0) {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
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
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
                } else {
                    res.render('userFail', { noti: noti });  //將資料傳給顯示頁面
                }
            })
        }
    })
});

//匯出
module.exports = router;