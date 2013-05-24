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


// Creates a platform object in the given coordinates
function CreatePlatform(x, y, tileData) {

    // Set the x and y to be correct sizes
    x=x*gMap.tileSize.x;
    y=y*gMap.tileSize.y;

    // Create the new TileObject
	var tile = new TileObject(tileData.tileType, "platform"+tileData.tileName.toString(), x,y);


    //gPhysicsEngine.CreateBox(x+TILEOFFSET, y+TILEOFFSET, TILE_WIDTH, TILE_HEIGHT, true, tile);
    gPhysicsEngine.CreateBox(x+TILEOFFSET, y, TILE_WIDTH, TILE_HEIGHT, true, tile);
    //createBox(world, x+TILEOFFSET, y+TILEOFFSET, TILE_WIDTH, TILE_HEIGHT, true, tile)

	if(CONSTANTS.DEBUG) {
		console.log("Created platform" + tileData.tileName.toString() + " at " + x + "," + y);
	}

} // End of CreatePlatform()

