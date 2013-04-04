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
function CreateLinkedPlatform(world, x, y, userdata, list) {

	var tile = new TileObject("ground", "platform"+userdata.toString());

	// Create the box in the given place
	//list.add(createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile))
	//levelPlatforms.push(createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile));


    createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile)
    list.add(tile);

	if(DEBUG) {
		console.log("Created platform" + userdata.toString() + " at " + x + "," + y);
	}

} // End of CreatePlatform()

// Creates a platform object in the given coordinates
function CreatePlatform(world, x, y, userdata) {

	var tile = new TileObject("ground", "platform"+userdata.toString());

	// Create the box in the given place
	//levelPlatforms.push(createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile));
    createBox(world, x, y, TILE_WIDTH, TILE_HEIGHT, true, tile)

	if(DEBUG) {
		console.log("Created platform" + userdata.toString() + " at " + x + "," + y);
        /*
        console.log("LevelPlatforms:" + levelPlatforms.last().toString());
        for(var i=0; i<levelPlatforms.length; i++) {
            console.log(levelPlatforms[i]);
        } */
	}

} // End of CreatePlatform()


// Comment for TileObject
function TileObject(tileType, tileName) {

    /*
    Private parameters
     */
    this._tileType = tileType;
    this._tileName = tileName;
	this._tileDrawWidth = 0;

    // Player is never hidden
    if (tileType == "player") {
        this._hidden = false;
    }
    else {
        this._hidden = true;
    }


    // Get hide value
    this.getHidden = getHidden;
    function getHidden() {
        return this._hidden;
    }

    this.Hide = Hide;
    function Hide() {
        if (DEBUG) {
            console.log("Hiding " + this._tileName);
        }
        this._hidden = true;
    }

    this.UnHide = UnHide;
    function UnHide(force) {
        if (DEBUG) {
            console.log("Unhiding " + this._tileName + " with force of: " + force);
        }

	    this._tileDrawWidth = force/100;
        this._hidden = false;
    }

	this.getTileDrawWidth = getTileDrawWidth;
	function getTileDrawWidth() {
		return this._tileDrawWidth;
	} // End of getTileDrawWidth()

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