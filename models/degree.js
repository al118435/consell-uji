var mongoose = require("mongoose");

/**
    TODO:
    Hacer el modelo para doctorado y masters

    id
    nombre de la carrera
    url
    *facultad (opt)


*/
var schema = new mongoose.Schema({
    id: 'Number',
    name: 'string',
    url: 'string'
 });

var Degree = mongoose.model('Degree', schema);
