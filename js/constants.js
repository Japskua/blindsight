/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 29.4.2013
 * Time: 9:08
 * To change this template use File | Settings | File Templates.
 */

var Constants = Class.create({

    GAME_UPDATES_PER_SEC: 10,
    GAME_LOOP_HZ: 1.0 / 10.0,

    PHYSICS_UPDATES_PER_SEC: 60,
    PHYSICS_LOOP_HZ: 1.0 / 60.0,

    initialize: function() {

    } // End of initialize()

}); // End of Constants.create()

var CONSTANTS = new Constants();