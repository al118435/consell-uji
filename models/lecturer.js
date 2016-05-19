var mongoose = require("mongoose");


var lecturer = new mongoose.Schema({
   name: 'string',
   url: 'string',
   credits:'float',

 });

 var Lecturer = mongoose.model('Lecturer', lecturer);
