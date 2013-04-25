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

    // The tilesets within this packet
    tilesets: [],

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

    // Loadcount that keeps track of amount of images to load
    imageLoadCount: 0,


	constructor: MapLoader,

    LoadMapLocalJSON: function(levelMap) {

        // Save the current map to local variable
        gMap.currentMap = levelMap;

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


        // Loop trough "levelMap.tilesets" Array
        for(var i=0; i<levelMap.tilesets.length; i++) {

            // Load each tileset as Images
            var image = new Image();
            image.onload = function() {

                console.log("Inside image.onload()");

                // Increment the load count with 1
                gMap.imageLoadCount++;

                console.log("ImageLoadCount:", gMap.imageLoadCount);

                console.log("gMap.imageLoadCount:", gMap.imageLoadCount, " levelMap.tilesets.length:", levelMap.tilesets.length);

                // If all tilesets are loaded
                if(gMap.imageLoadCount == levelMap.tilesets.length) {
                   // Set fullyloaded flag to true
                    gMap.fullyLoaded = true;

                    console.log("Set gMap.fulloaded to:", gMap.fullyLoaded);
                }
            }; // End of image.onload()

            // The src value to load each new image from is in the
            // "image" property of the "tilesets"
            image.src = "assets/" + levelMap.tilesets[i].image;


            // Next, create the object for each tileset to
            // be stored in the tilesets array

            var tileset = {

                // The GID of the tileset
                "firstgid": i+1,

                // The image
                "image": image,
                // And the image related data
                "imageheight": image.height,
                "imagewidth": image.width,
                "name": gMap.currentMap.tilesets[i].name,

                // Calculate the data from the width and height of the image
                // and the size of each individual tile
                "numXTiles": (image.width/gMap.tileSize.x)|0,
                "numYTiles": (image.height/gMap.tileSize.y)|0


            }; // End of tileset

            console.log("Created tileset", tileset);

            // After creating the tileset,
            // push the information to the Array containing
            // all the loaded tilesets
            this.tilesets.push(tileset);
        }


    },

	LoadMap: function(mapPath) {

		// Use this to load the given map
		console.log("Loading map from:", mapPath);


        throw "MapLoader.LoadMap() Not implemented! (Use LoadMapLocalJSON() instead";
        console.log(mapPath);
        console.log(mapPath["height"])

        /*
        xhrGet(mapPath, false, function(data){
            console.log(data);
        } )*/

        /*
		xhrJSONP(mapPath, function() {
			console.log("LOADED");
		});
          */
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