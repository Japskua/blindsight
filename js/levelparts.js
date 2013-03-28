/**
 * Created with JetBrains WebStorm.
 * User: Janne
 * Date: 28.3.2013
 * Time: 16:17
 * To change this template use File | Settings | File Templates.
 */

var TILE_WIDTH = 10;
var TILE_HEIGHT = 10;
var levelPlatforms = []
var listGrounds = []

// Creates a platform object in the given coordinates
function CreatePlatform(world, x, y, userdata) {

    tile = new TileObject("ground", "platform"+userdata.toString());

    // Create the box in the given place
    levelPlatforms.push(createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile));
    console.log("Created platform" + userdata.toString());
} // End of CreatePlatform()


function TileObject(tileType, tileName) {

    /*
    Private parameters
     */
    this._tileType = tileType;
    this._tileName = tileName;

    // Getting the tile type
    this.getTileType = getTileType;
    function getTileType() {
        return this._tileType;

    }   // End of getTileType()


    // Getting the tilename
    this.getTileName = getTileName;
    function getTileName() {
        return this._tileName;
    }   // End of getTileName

} // End of TileObject()