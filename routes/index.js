var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// baseurl
app.get('/',function(req,res){
    res.send("Consell REST API");
});


app.get('/public/files/:file',function(req,res){
	res.sendFile("public/files/"+req.params.file,{root:application_root});
});


var db = require('./myModule');



module.exports = router;
