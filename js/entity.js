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


    }, // End of initialize()


    // (x,y) position of the entity in the game world
    position: {x:0, y:0},
    // size of the entity (for drawing purposes)
    size: {x:0, y:0},
    // entitys previous (x,y) position
    last: {x:0, y:0},


    update: function() {

    } // End of update()

}); // End Entity.create()
