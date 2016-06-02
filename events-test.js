var express = require('express');
var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var EventEmitter = require('event');
var util = require('util');
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
var req = https.request(BASEURL+DREGREELISTURL+COURSEYEAR, function(response) {
    console.log("resposta");
    if (response.statusCode == 200) {
      console.log("uno");
      
      response.on('data', function(){
      $ = cheerio.load(body);

      var asignaturas={};

      $('li a', '.listaTitulaciones' ).each(function(i, elem) {
          // new JSON (id, name, url)
          asignaturas[$(this)[0].children[0].data]=$(this)[0].attribs.href;
          });

      });

      //console.log(asignaturas);
    }else{console.log("no hay 200");}
  })
  .on('error', function(err){
    console.log("Error ",err);
  });
  
 


