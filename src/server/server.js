(function () {
	"use strict";

	var http = require( "http" );
	var fs = require( "fs" );
	var server;

	exports.start = function ( homePageToServer, notFoundPageToServe, portNumber ) {
		if ( !portNumber ) {
			throw "port number is required";
		}

		server = http.createServer();
		server.on( "request", function ( request, response ) {
			if ( request.url === "/" || request.url === "/index.html" ) {
				response.statusCode = 200;
				serverFile( response, homePageToServer );
			}
			else {
				response.statusCode = 404;
				serverFile( response, notFoundPageToServe );
			}
		} );

		server.listen( portNumber );
	};

	exports.stop = function ( callback ) {
		server.close( callback );
	};

	function serverFile( response, file ) {
		fs.readFile( file, function ( err, data ) {
			if ( err ) {
				throw err;
			}
			response.end( data );
		} );
	}

}());