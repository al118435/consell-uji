var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var jsonfile = require('jsonfile');
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
var carreras ={
	"size":0,
	"degrees": {}
};


// Scraps and stores first lleu's view: Degrees.
request(BASEURL+DREGREELISTURL+COURSEYEAR, {encoding:'utf8'}, function (err, response, body) {

		if (!err && response.statusCode == 200) {

		//Loads the whole html to be parsed
		$ = cheerio.load(body);

		//Selects all degrees
		$('li a', '.listaTitulaciones' ).each(function(i, elem) {

				// Fills the JSON=> 
				//    { 
				//		"size":N,
				//		"degrees" :
				//			[
				//    			"id": [name, url]
				//			]		
				//	  }

				var url=$(this)[0].attribs.href;
				var degreeId=parseInt(url.slice(-3), 10);

				// Add the degree to JSON var: carreras 
				carreras.degrees[degreeId] =  [$(this)[0].children[0].data, url];
				carreras.size=parseInt(carreras.size, 10)+1;

				});

		var file = 'carreras.json';

		jsonfile.writeFile(file, carreras, function(err){console.error(err);});
		console.log('########'+carreras.degrees+'########');
		// Start scraping urls
		for(var key in carreras.degrees){

			// Degree url generation
			var degreeUrl=carreras.degrees[key][1];

			//console.log("Carrera: "+i+". URL:"+ degreeUrl);
			console.log("-------------------------", degreeUrl);

			//////====================== TODO: sincronizar el request con cada url ===========

			// Scraps and stores all subjects
			request(BASEURL+degreeUrl, {encoding:'utf8'}, function (err, response, body) {
					

					if (!err && response.statusCode == 200) {
						console.log(response.url);
						// Loads degree info
						$ = cheerio.load(body);
						
						
						$('.datatable', 'td' ).each(function(i, elem) {
							console.log(elem.html());
						});


					}else {console.log("Error 2o request, asignaturas:", err);}
					});

		}

		}else {console.log("Error 1er request, carreras", err);}

});



