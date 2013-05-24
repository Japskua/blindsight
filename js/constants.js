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

    OBJECTS_SHEET_NAME: "",

    // Objects JSON_ADDRESS
    OBJECTS_JSON_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/player.json",

    OBJECTS_IMAGE_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/player.png",

    LEVEL1_JSON_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/level_1.json",

    PROJECTILE_IMAGE_ADDRESS: "https://dl.dropboxusercontent.com/u/4692161/blindsight/projectile_1.png",

    // <<------------ PLAYER ANIMATIONS --------------------->>

    ANIMATION_RUN_FRAME_AMOUNT: 7,
    ANIMATION_IDLE_FRAME_AMOUNT: 4,

    assetListImages: [],
    assetListMaps: [],
    assetListSounds: [],

    initialize: function() {

        this.assetListImages.push(this.PROJECTILE_IMAGE_ADDRESS);
        this.assetListImages.push(this.OBJECTS_IMAGE_ADDRESS);


        if(this.DEBUG) {
            console.log("CONSTANTS Initialized");
        }

    } // End of initialize()

}); // End of Constants.create()

var CONSTANTS = new Constants();