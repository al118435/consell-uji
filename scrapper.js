var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var mongoose = require('mongoose');

// Models
/*
var Degree = mongoose.model("Degree");
var Subject = mongoose.model("Subject");
*/
// Constants
const COURSEYEAR = 2015;
const BASEURL = 'https://e-ujier.uji.es/pls/www/';
const DREGREELISTURL = "!gri_ass.lleu_portada_g?p_curso_init=";



// Scraps and stores first lleu's view: Subjects
request(BASEURL+DREGREELISTURL+COURSEYEAR, {encoding:'utf8'}, function (err, response, body) {
  if (!err && response.statusCode == 200) {

    $ = cheerio.load(body);

    var asignaturas={};

    $('li a', '.listaTitulaciones' ).each(function(i, elem) {
        // new JSON (id, name, url)
        asignaturas[$(this)[0].children[0].data]=$(this)[0].attribs.href;
        });

    console.log(asignaturas);

  }else {
    console.log(err);

  }
});


// Scraps and stores all subj
request(BASEURL+COURSEYEAR, {encoding:'utf8'}, function (err, response, body) {
  if (!err && response.statusCode == 200) {

    $ = cheerio.load(body);

    var asignaturas={};

    $('li a', '.listaTitulaciones' ).each(function(i, elem) {
        asignaturas[$(this)[0].children[0].data]=$(this)[0].attribs.href;
        });

    console.log(asignaturas);

  }else {
    console.log(err);

  }
});
