/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 19:57
 * To change this template use File | Settings | File Templates.
 */


var Player = Class.create(Entity, {

    initialize: function($super) {

        this.canJump = false;
        this.object = null;
        this._legSpriteAnimList = [];
        this._currLegAnimIndex = [];
        this.spriteSheet = null;



    },

    object: null,
    canJump: false,
    _legSpriteAnimList: [],
    _currLegAnimIndex: 0,
    spriteSheet: null,


    loadSprite: function(filename) {

        this.spriteSheet = new Image();
        // Load the image
        this.spriteSheet.src = filename;
        // loaded!

    }, // End of loadSprite(filename)

    draw: function(){

        var context = gRenderEngine.context;

        this._drawPlayerAvatar(context);

    }, // end of draw()


     _drawPlayerAvatar: function(context, settings) {


         context.drawImage(this.spriteSheet, 0, 0, 20, 20, 120, 120, 20, 20);

         //drawSprite("soldier.png", 0, 0 );


     } // end of _drawPlayerAvatar()


}); // End of Player.create()

gFactory.nameClassMap["Player"] = Player;