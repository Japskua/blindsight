/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 16.4.2013
 * Time: 19:05
 * To change this template use File | Settings | File Templates.
 */


/*
Map Loader is used to load a given map
 */

function MapLoader() {

	// Here is the constructor stuff inside

}   // End of MapLoader()

MapLoader.prototype = {

	// Flag for when the map is loaded completely
	fullyLoaded: false,

	// The currently loaded map
	currentMap: null,

	// The amount of tiles in the current map
	numXTiles: 0,
	numYTiles: 0,

	// Size of the tiles
	tileSize: {
		"x":32,
		"y":32
	},

	// Size of the entire map
	pixelSize: {
		"x":32,
		"y":32
	},



	constructor: MapLoader,

	LoadMap: function(mapPath) {

		// Use this to load the given map
		console.log("Loading map from:", mapPath);

		xhrJSONP(mapPath, function() {
			console.log("LOADED");
		});

		//mapPath = mapPath + "?callback=?";

		                   /*
		jQuery.ajax(mapPath, {
			crossDomain:true,
			dataType:"jsonp",
			success:function(data, text, xhqr) {
				var obj = jQuery.parseJSON(data);
				console.log("Data",obj);
			}
		})                   */

		/*
		jQuery.getJSON(mapPath, function(data) {
			console.log("dataaa",data);
		});
          */
		    /*
		// Get the map
		xhrGet(mapPath, function(data) {
			// Once loaded, call the
			// ParseMapJSON method

			console.log("data:",data);
			gMap.ParseMapJSON(data.responseText);


		});

		//var obj = JSON.parse(this.ReadJSON(mapPath));
		//console.log("OBJ is", obj);
             */
	}, // End of LoadMap()

	/*
	This function is used to parse the map from a JSON
	 */
	ParseMapJSON: function(mapJSON) {

		// First, save the loaded file to currentMap
		gMap.currentMap = JSON.parse(mapJSON);

		console.log("currentMap",gMap.currentMap);
		// Then, continue adding the values

		// Number of tiles
		gMap.numXTiles = gMap.currentMap.height;
		gMap.numYTiles = gMap.currentMap.width;

		// Size of the tiles
		gMap.tileSize.x = gMap.currentMap.tilewidth;
		gMap.tileSize.y = gMap.currentMap.tileheight;

		// Pixel size
		gMap.pixelSize.x = gMap.tileSize.x * gMap.numXTiles;
		gMap.pixelSize.y = gMap.tileSize.y * gMap.numYTiles;


		// Finally, set to fully loaded
		gMap.fullyLoaded = true;
	}


}; // End of MapLoader.prototype

// Using Google's example, make this a global loader

var gMap = new MapLoader();