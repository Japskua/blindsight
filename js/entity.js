/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 26.4.2013
 * Time: 10:52
 * To change this template use File | Settings | File Templates.
 */


// Definition for Entity
var Entity = Class.create({

    initialize: function() {

	    // Initialize the values to zeros
	    this.position.x = 0;
	    this.position.y = 0;
	    this.size.x = 0;
	    this.size.y = 0;
	    this.last.x = 0;
	    this.last.y = 0;
	    this.killed = false;
	    this.currentSpriteName = null;
	    this.hsize.x = 0;
	    this.hsize.y = 0;
	    this.markedForDeath = false;


    }, // End of initialize()


    // (x,y) position of the entity in the game world
    position: {x:0, y:0},
    // size of the entity (for drawing purposes)
    size: {x:0, y:0},
    // entitys previous (x,y) position
    last: {x:0, y:0},
	// Hsize
	hsize: {x:0,y:0},
	// Whether the entity is killed or not
	killed: false,
	// The current sprite used
	currentSpriteName: null,
	// The Z-index for rendering layer
	zIndex: 0,
	markedForDeath: null,



    update: function() {

	    // If we are marked for death, DIE!
	    if(this.markedForDeath == true)
	    {
		    // Die!
		    this.kill();
		    // And return, as nothing should be done for me anymore
		    return;

	    }

    }, // End of update()

	kill: function() {

	}, // End of kill()

	draw: function() {

		// If we have a sprite
		if(this.currentSpriteName) {

			// Draw the sprite
			// and make the center to be the origin (this.hsize) instead of top left corner
			drawSprite(this.currentSpriteName,
				this.position.x.round() - this.hsize.x,
				this.position.y.round() - this.hsize.y);
		}

	} // End of draw()

}); // End Entity.create()
