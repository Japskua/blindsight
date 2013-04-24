/**
 * Created with JetBrains WebStorm.
 * User: Janne
 * Date: 28.3.2013
 * Time: 16:17
 * To change this template use File | Settings | File Templates.
 */

var TILE_WIDTH = gMap.tileSize.x/2;
var TILE_HEIGHT = gMap.tileSize.y/2;
var TILEOFFSET = gMap.tileSize.x/2;
var levelPlatforms = []
var listGrounds = []


// Creates a platform object in the given coordinates
function CreateLinkedPlatform(world, x, y, userdata, list) {

    // Set the x and y to be correct sizes
    x=x*gMap.tileSize.x;
    y=y*gMap.tileSize.y;

	var tile = new TileObject("ground", "platform"+userdata.toString(), x, y);

	// Create the box in the given place
	//list.add(createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile))
	//levelPlatforms.push(createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile));


    createBox(world, x+TILEOFFSET, y+TILEOFFSET, TILE_WIDTH, TILE_HEIGHT, true, tile)
    list.add(tile);

	if(DEBUG) {
		console.log("Created platform" + userdata.toString() + " at " + x + "," + y);
	}

} // End of CreatePlatform()

// Creates a platform object in the given coordinates
function CreatePlatform(world, x, y, userdata) {

    // Set the x and y to be correct sizes
    x=x*gMap.tileSize.x;
    y=y*gMap.tileSize.y;

	var tile = new TileObject("ground", "platform"+userdata.toString(), x, y);

	// Create the box in the given place
	//levelPlatforms.push(createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile));
    //createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile)

    createBox(world, x+TILEOFFSET, y+TILEOFFSET, TILE_WIDTH, TILE_HEIGHT, true, tile)

	if(DEBUG) {
		console.log("Created platform" + userdata.toString() + " at " + x + "," + y);
        /*
        console.log("LevelPlatforms:" + levelPlatforms.last().toString());
        for(var i=0; i<levelPlatforms.length; i++) {
            console.log(levelPlatforms[i]);
        } */
	}

} // End of CreatePlatform()

