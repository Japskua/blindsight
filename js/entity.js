/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 26.4.2013
 * Time: 10:52
 * To change this template use File | Settings | File Templates.
 */

/*function Entity(){

};*/

Entity = Class.extend({

    constructor: Entity,

    // (x,y) position of the entity in the game world
    position: {x:0, y:0},
    // size of the entity (for drawing purposes)
    size: {x:0, y:0},
    // entitys previous (x,y) position
    last: {x:0, y:0},

    update: function() {

    } // End of update()

}); // End of Entity.prototype
