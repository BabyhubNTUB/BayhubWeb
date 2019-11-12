'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 
//---------------------------------------------
var list = async function(id){
    var result={};
    await sql('SELECT * FROM forum order by forumno desc LIMIT 4')
        .then((data) => {            
            result.forum = data.rows;  
        }, (error) => {
            result.forum = [];
        });

	await sql('SELECT * FROM education order by serno desc LIMIT 4')
        .then((data) => {            
            result.education = data.rows;  
        }, (error) => {
            result.education = [];
        });

    await sql('SELECT * FROM pregnancyknowledge order by serno desc LIMIT 4')
        .then((data) => {            
            result.pregnancyknowledge = data.rows;  
        }, (error) => {
            result.pregnancyknowledge = [];
        });	

    await sql('SELECT * FROM member where id like $1', [id])
    .then((data) => {            
        result.member = data.rows;  
    }, (error) => {
        result.member = [];
    });	
    
    await sql('SELECT * FROM baby where id like $1', [id])
    .then((data) => {            
        result.baby = data.rows;  
    }, (error) => {
        result.baby = [];
    });	


    var rowcnt =0;
    await sql('SELECT * FROM notification where id like $1 order by serno desc limit 3', [id])
    .then((data) => {
        rowcnt = data.rowCount;
        result.notification = data.rows; 
    }, (error) => {
        result.notification = [];
    });

    if (rowcnt == 0) {
        await sql('SELECT * FROM notification where serno=21')
        .then((data) => {
            result.notification = data.rows; 
        }, (error) => {
            result.notification = [];
        });
    }
    
    return result;
}


//匯出
module.exports = {list};
