var mongoose = require("mongoose");


var subject = new mongoose.Schema({
   name: 'string',
   url: 'string',
   credits:'float',

 });

 var Subject = mongoose.model('Degree', subject);
