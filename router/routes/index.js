var express = require('express');
var mysql=require("./mysql.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});
//传递数据
router.get('/fetch', function(req, res) {
    mysql.query("select * from category",function(err,result){
        res.send(JSON.stringify(result));
    })

});
router.get('/fetch/:id', function(req, res) {
    mysql.query("select * from list where cid="+req.params.id,function(err,result){
        res.send(JSON.stringify(result));
    })

});
module.exports = router;