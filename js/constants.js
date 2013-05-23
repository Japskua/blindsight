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

    // Collision debugging
    DEBUG_COLLISIONS: false,

    // Platform Hiding
    // False = don't hide
    // True = hide
    HIDING: false,

    // Show debug information
    // True = show information
    // False = don't show any extra info
    DEBUG: true,

    COLLISION_TILE_NUMBER: 4,
    // COLLISION_TILE_NUMBER: 25,
    //COLLISION_TILE_NUMBER: 82,

    // <------- SPRITE AND IMAGE RELATED ------------>

    SHEET_NAME: "blindsight",

    PLAYER_SHEET_NAME: "",
    //PLAYER_SHEET_NAME: "/assets/soldier.png",

    // Player JSON_ADDRESS
    //PLAYER_JSON_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/soldier.json",
    PLAYER_JSON_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/player.json",

    //PLAYER_IMAGE_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/soldier.png",
    PLAYER_IMAGE_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/player.png",

    LEVEL1_JSON_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/level_1.json",

    PROJECTILE_IMAGE_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/projectile.png",

    // <<------------ PLAYER ANIMATIONS --------------------->>

    ANIMATION_RUN_FRAME_AMOUNT: 7,
    ANIMATION_IDLE_FRAME_AMOUNT: 4,

    initialize: function() {

    } // End of initialize()

}); // End of Constants.create()

var CONSTANTS = new Constants();