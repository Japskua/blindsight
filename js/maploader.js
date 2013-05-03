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
    this.viewRect = {
        x: 0,
        y: 0,
        w: 512,
        h: 512
    };

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

    // ViewRect
    viewRect: {
        x: 0,
        y: 0,
        w: 512,
        h: 512
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

    LoadTileSets: function() {

        var levelMap = gMap.currentMap;

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

	// Gets the tile from the "layer" data and returns the
	// "packet" object for the layer we want to draw
	// Takes the parameter "tileIndex",
	// whici is the id of the tile we want to draw
	// in the layer data
	getTilePacket: function(tileIndex) {

		// Define the "packet" object to contain
		//
		// 1. Image object of the given tile
		// 2. (x,y) value of the tile to draw
		//    the tile in map coordinates
		var packet = {
			"image": null,
			"px": 0,
			"py": 0
		};

		// First, find the correct tileset to draw from
		// Loop through the whole tileset
		var tile = 0;
		for(tile=this.tilesets.length -1; tile>=0; tile--) {
			if(this.tilesets[tile].firstgid <= tileIndex) {
				break;
			}
		} // End of for

		// Set the packet image to be the correct tileset image
		packet.image = this.tilesets[tile].image;

		// Calculate the location to draw to
		// The local id of the tile
		// calculated from the "tileIndex" of the tile we want to draw to
		// and the "firstgid" found earlier
		var localIdx = tileIndex - this.tilesets[tile].firstgid;

		// Get the (x,y) position of the tile in terms of the number
		// of tiles in the tileset.
		var lTileX = Math.floor(localIdx % this.tilesets[tile].numXTiles);
		var lTileY = Math.floor(localIdx / this.tilesets[tile].numXTiles);

		// The final (x,y) position of the tileset we want to draw to
		// based on the previously calculated tileset location and multiplied
		// by tilesize to find the correct place
		packet.px = (lTileX * this.tileSize.x);
		packet.py = (lTileY * this.tileSize.y);

		return packet;

	}, // End of getTilePacket(tileIndex)

    drawTile: function(context, locationX, locationY) {

        // Find the layer named "Ground"

        // Loop through teh layers
        for(var layerIndex=0; layerIndex<gMap.currentMap.layers.length; layerIndex++) {
            // If the name of the layer is not "Ground
            if(gMap.currentMap.layers[layerIndex].name != "Ground") {
                // Just leave
                continue;
            }

            // Match the x and y coordinates to used level array
            var tileNumber = this.ConvertToTileNumber(locationX, locationY);

            //console.log("Drawing to tileNumber:", tileNumber);

            // Get the layerData
            var layerData = gMap.currentMap.layers[layerIndex].data;

            // Get the tileId of the tileNumber in question
            var tileId = layerData[tileNumber];

            // a. Check if the tile id is 0. If so, just skip (empty)
            if(tileId == 0) {
                continue;
            }

            // b. if the tile is something else than 0, grab the packet data
            //    using "getTilePacket" calling the tileId
            var tilePacket = gMap.getTilePacket(tileId);

            // And finally draw the image
            context.drawImage(tilePacket.image, tilePacket.px, tilePacket.py,
                this.tileSize.x, this.tileSize.y,
                locationX, locationY,
                this.tileSize.x, this.tileSize.y);


        }

    }, // End of drawTile()

    ConvertToTileNumber: function(worldX, worldY) {

        var localX = worldX/this.tileSize.x;
        var localY = worldY/this.tileSize.y;
        var tileNumber = localX + localY * this.numXTiles;

        // Return the tilenumber
        return tileNumber;

    }, // End of ConvertToTileNumber()


	draw: function(context) {

		// First, check if the mapdata has finished loading
		if(gMap.fullyLoaded != true) {
			// Return, as we are not done yet
			return;
		}


		// For each layer in the "layers" Array of the
		// currentMapData, do the following.
		for(var layerIndex=0; layerIndex<gMap.currentMap.layers.length; layerIndex++)
		{

			// 1. Check, if the type of the layer is "tilelayer".
			//    If not, don't draw
			if(gMap.currentMap.layers[layerIndex].type != "tilelayer") {
				continue;
			}


            // Also, if we are dealing with the Collision Layer
            if(gMap.currentMap.layers[layerIndex].name == "Collision") {

                // If we are not debugging, skip drawing this layer
                if(CONSTANTS.DEBUG_COLLISIONS == false) {
                    continue;
                }

            }

			// 2. If it is a "tilelayer", grab the "data" array of the given
			//    layer
			var layerData = gMap.currentMap.layers[layerIndex].data;

			// 3. For each tile id in the "data" array
			for(var tileIndex=0; tileIndex<layerData.length; tileIndex++)
			{
				// Get the tileId
				var tileId = layerData[tileIndex];

				// a. Check if the tile id is 0. If so, just skip (empty)
				if(tileId == 0) {
					continue;
				}


				// Test, if the tile is within the world bounds
				var worldX = Math.floor(tileIndex % this.numXTiles) * this.tileSize.x;
				var worldY = Math.floor(tileIndex / this.numXTiles) * this.tileSize.x;


                // b. if the tile is something else than 0, grab the packet data
                //    using "getTilePacket" calling the tileId
                var tilePacket = gMap.getTilePacket(tileId);

				// And finally draw the image
				context.drawImage(tilePacket.image, tilePacket.px, tilePacket.py,
								  this.tileSize.x, this.tileSize.y,
								  worldX, worldY,
								  this.tileSize.x, this.tileSize.y);


			} // End of tileIndex for loop

		} // End of layerIndex for loop


	}, // End of draw(context)


	LoadMap: function(mapPath) {

		// Use this to load the given map
		console.log("Loading map from:", mapPath);


        //throw "MapLoader.LoadMap() Not implemented! (Use LoadMapLocalJSON() instead";
        console.log(mapPath);
        console.log(mapPath["height"]);

        jQuery.getJSON(mapPath, function(data) {
            gMap.ParseMapJSON(data);
        });


		//var obj = JSON.parse(this.ReadJSON(mapPath));
		//console.log("OBJ is", obj);

	}, // End of LoadMap()

	/*
	This function is used to parse the map from a JSON
	 */
	ParseMapJSON: function(mapJSON) {

        console.log("LOADED", mapJSON);

		// First, save the loaded file to currentMap
		//gMap.currentMap = JSON.parse(mapJSON);
        gMap.currentMap = mapJSON;

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


        // Load the tilesets
        this.LoadTileSets()

		// Finally, set to fully loaded
		gMap.fullyLoaded = true;




        CreateLevel();

	}  // End of ParseMapJSON(mapJSON)





}; // End of MapLoader.prototype

// Using Google's example, make this a global loader

var gMap = new MapLoader();