/**
 * Created with JetBrains WebStorm.
 * User: Janne
 * Date: 28.3.2013
 * Time: 17:01
 * To change this template use File | Settings | File Templates.
 */


// Comment for TileObject
function TileObject(tileType, tileName, x ,y) {

	/*
	 Private parameters
	 */
	this._tileType = tileType;
	this._tileName = tileName;
	this._tileDrawWidth = 0;
	this._x = x;
	this._y = y;

	// Player is never hidden
	if (tileType == "player") {
		this._hidden = false;
	}
	else {
		//this._hidden = true;
        this._hidden = false;
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

		// Check if there is still force left
		if (force > 0) {
			// Calculate the close by elements and pass the hit to them as well
			hitCalculator.getCloseByElements(this._x, this._y, force);
		}

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