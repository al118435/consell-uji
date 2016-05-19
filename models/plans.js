var mongoose = require("mongoose");



/**
  Study plans:




*/
var plan = new mongoose.Schema({
   name: 'String', //Grado
   url: 'String',
   credits:'Number', //creditos totales
   courses:[  ], // lista de cursos (carreras, masters, programas de doctorado)

 });

 var plan = mongoose.model('Degree', subject);
