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


         var frame = {

             x: 2,
             y: 2,
             w:30,
             h:37

         };

         var startX = 0;
         var startY = 0;

         var originWidth = 40;
         var originHeigh = 40;

         var cx = -frame.w * 0.5;
         var cy = -frame.h * 0.5;

         var locationX = 120;
         var locationY = 120;

         var destinationWidth = 30;
         var destinationHeight = 30;

         context.drawImage(this.spriteSheet, frame.x, frame.y, frame.w, frame.h, locationX, locationY, destinationWidth, destinationHeight);

         //drawSprite("soldier.png", 0, 0 );


     } // end of _drawPlayerAvatar()


}); // End of Player.create()

gFactory.nameClassMap["Player"] = Player;