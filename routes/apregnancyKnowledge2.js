var express = require('express');
var router = express.Router();

//增加引用函式
const product = require('./utility/pregnancyKnowledge');

//接收GET請求
router.get('/:serno', function(req, res, next) {
    var serno = req.params.serno;   //取出參數

    product.three(serno).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound2');  //導向找不到頁面                
        }else{
            res.render('apregnancyKnowledge2', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;
