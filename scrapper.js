var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

/*
// Models for mongo
var mongoose = require('mongoose');

var Degree = mongoose.model("Degree");
var Subject = mongoose.model("Subject");
 */

// Constants
const COURSEYEAR = 2015;
const BASEURL = 'https://e-ujier.uji.es/pls/www/';
const DREGREELISTURL = "!gri_ass.lleu_portada_g?p_curso_init=";


// Global JSON ariable carreras
var carreras ={};


// Scraps and stores first lleu's view: Degrees.
request(BASEURL+DREGREELISTURL+COURSEYEAR, {encoding:'utf8'}, function (err, response, body) {

		if (!err && response.statusCode == 200) {

		//Loads the whole html to be parsed
		$ = cheerio.load(body);

		//Selects all degrees
		$('li a', '.listaTitulaciones' ).each(function(i, elem) {

			// Fills the JSON=> id: [name, url]
			var url=$(this)[0].attribs.href;
			var id=url.slice(-3);
			carreras[id]= [$(this)[0].children[0].data, url];
			});

		
		console.log("Start scrapping degrees");
		


///// -------- Falta comunicar cuando termina de guardar el json al siguiente for

		// Start scraping urls
		for(i=0; i<carreras.length; i++){
			
			// Degree url generation
			var degreeUrl=carreras[i][1];
			console.log("Carrera: "+i+". URL:"+ degreeUrl);
			
			// Scraps and stores all subjects
			request(BASEURL+degreeUrl, {encoding:'utf8'}, function (err, response, body) {
					
					if (!err && response.statusCode == 200) {
						
						// Loads degree info
						$ = cheerio.load(body);

					}else {console.log("Error 2o request, asignaturas:", err);}
			});

		}

		}else {console.log("Error 1er request, carreras", err);}

});



