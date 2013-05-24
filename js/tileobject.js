/**
 * Created with JetBrains WebStorm.
 * User: Janne
 * Date: 28.3.2013
 * Time: 17:01
 * To change this template use File | Settings | File Templates.
 */


var TileObject = Class.create({

	_tileType: null,
	_tileName: null,
	_tileDrawWidth: 0,
	_x: 0,
	_y: 0,
	_tileGroup: "",

	initialize: function(tileType, tileName, x, y) {

		this._x = x;
		this._y = y;
		this._tileName = tileName;
		this._tileType = tileType;
		this._tileGroup = "";


		// Player is never hidden
		if (tileType == "player") {
			this._hidden = false;
			// Tilegroup is player
			this._tileGroup = "player";
		}
        else if (tileType == "projectile") {
            this._hidden = false;
            // Tilegroup is projectile
            this._tileGroup = "projectile";
        }
		else {

			// If hiding is turned off
			if(CONSTANTS.HIDING == false) {
				this._hidden = false;
			}
			else {
				this._hidden = true;
			}
			// Tiletype is currently just ground
			this._tileGroup = "ground";
		}

	}, // End of initialize()

	getHidden: function() {
		return this._hidden;
	},


	Hide: function() {
		if (DEBUG) {
			console.log("Hiding " + this._tileName);
		}
		this._hidden = true;
	}, // End of Hide()

	UnHide: function(force) {
		if (DEBUG) {
			console.log("Unhiding " + this._tileName + " with force of: " + force);
		}

		this._tileDrawWidth = force/100;
		this._hidden = false;

		// Check if hit force is higher than 0
		if (force > 0) {
			// Calculate the close by elements and pass the hit to them as well
			hitCalculator.getCloseByElements(this._x, this._y, force);
		}

	}, // End of UnHide(force)


	Reveal: function() {

		console.log("Revealing:", this._x, this._y);
		this._hidden = false;

	}, // End of Reveal()

	RevealNeighbors: function(direction, force) {
		// Get the close by elements on the given side

	},


	getTileDrawWidth: function() {
		return this._tileDrawWidth;
	}, // End of getTileDrawWidth()


	getTileType: function() {
		return this._tileType;
	},   // End of getTileType()

	getTileGroup: function() {
		// Return the tilegroup
		return this._tileGroup;
	}, // End of getTileGroup()

	getTileName: function() {
		return this._tileName;

	} // End of getTileName()


}); // End of TileObject.create()
