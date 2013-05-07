/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 19:57
 * To change this template use File | Settings | File Templates.
 */


var Player = Class.create(Entity, {

    initialize: function() {

        this.canJump = false;
        this.object = null;
        this._legSpriteAnimList = [];
        this._currLegAnimIndex = 0;
        this.spriteSheet = null;
        this._currentState = this.states.IDLE;





    },

    object: null,
    canJump: false,
    _legSpriteAnimList: [],
    _currLegAnimIndex: 0,
    spriteSheet: null,
    states: {
        IDLE: "idle",
        WALKING: "walking",
        RUNNING: "running",
        JUMPING: "jumping",
        FIRING: "firing"
    },
    _currentState: null,

    LoadSpriteAnimations: function() {

        var names = ["idle"];
        // Loop through all the animations in the list
        for (var animationNumber=0; animationNumber<names.length; animationNumber++) {

            // Create a new animation sheet
            var animationSheet = new SpriteSheetAnimClass();
            animationSheet._animIncPerFrame = 0.05;

            // Load the sheet
            animationSheet.loadSheet("blindsight", "/assets/soldier.png");

            // Loop through the amount of animations
            for( var i=1; i<4; i++) {
                animationSheet.pushFrame(names[animationNumber] + "_" + i + ".png");

            }

            // And finally, add this to the leg list
            this._legSpriteAnimList.push(animationSheet);

        }


    }, // End of LoadSpriteAnimations()


    ChangeState: function(state) {

        // TODO: Check that the state is in states

        // Change the state
        this._currentState = state;


    }, // End of ChangeState(state)

    loadSprite: function(filename) {

        this.spriteSheet = new Image();
        // Load the image
        this.spriteSheet.src = filename;
        // loaded!

    }, // End of loadSprite(filename)

    draw: function(shape){

		this._drawPlayerAvatar(shape);

	    //drawSprite("idle_1.png", 220, 220, settings);

        //this._drawPlayerAvatar(context);

    }, // end of draw()

    update: function($super) {
        // Call the parent
        //$super.update();

        //this._legSpriteAnimList[this._currLegAnimIndex].pause(true);




    }, // End of update


     _drawPlayerAvatar: function(shape) {



         // Get the current animation index
         var sprite = this._legSpriteAnimList[this._currLegAnimIndex].getCurrentFrameStats();



	     var posX = shape.m_position.x;
	     var posY = shape.m_position.y;

	     //console.log("Drawing player to position", posX);

	     var settings = {
		     rotRadians: 90 * (Math.PI / 180.0),
		     noMapTrans: true

	     };

         this._legSpriteAnimList[this._currLegAnimIndex].draw(posX, posY, settings);


	     //drawSprite(sprite.id, posX, posY, settings);
	     //drawSprite("idle_1.png", posX, posY, settings);



     } // end of _drawPlayerAvatar()


}); // End of Player.create()

gFactory.nameClassMap["Player"] = Player;