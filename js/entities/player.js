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
        this._spriteAnimList = [];
        this._animIndex = 0;
        this.spriteSheet = null;
        this._currentState = this.states.IDLE;
        this._runSpriteAnimList = [];





    },

    object: null,
    canJump: false,
    _spriteAnimList: [],
    _animIndex: 0,
    _runSpriteAnimList: [],
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

        var names = ["idle", "run"];
        // Loop through all the animations in the list
        for (var animationNumber=0; animationNumber<names.length; animationNumber++) {

            // Create a new animation sheet
            var animationSheet = new SpriteSheetAnimClass();
            animationSheet._animIncPerFrame = 0.05;

            // Load the sheet
            animationSheet.loadSheet("blindsight", "/assets/soldier.png");

            // Defien the name variable and amount of frames
            var amountFrames = 0;
            var name = names[animationNumber];

            // Define the amount of frames in each animation
            if (name == "idle") {
                amountFrames = 3;
            }
            else if (name == "run") {
                amountFrames = 7;
            }

            // Push all the frames to the animation sheet
            animationSheet = this.PushFrames(amountFrames, animationSheet, name);

            // And finally, add this to the animation list
            this._spriteAnimList.push(animationSheet);

        }


    }, // End of LoadSpriteAnimations()

    PushFrames: function(amountFrames, animationSheet, name) {

        // Loop through the amount of animations
        for( var i=1; i<amountFrames; i++) {
            animationSheet.pushFrame(name + "_" + i + ".png");

        }

        return animationSheet;

    }, // End of PushFrames()


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

        //this._spriteAnimList[this._animIndex].pause(true);




    }, // End of update


     _drawPlayerAvatar: function(shape) {

	     var posX = shape.m_position.x;
	     var posY = shape.m_position.y;


	     var settings = {
		     //rotRadians: 90 * (Math.PI / 180.0),
             rotRadians: 180 * (Math.Pi / 180.0),
		     noMapTrans: true

	     };

         var animIndex = this._animIndex;

         // Check the current state and set it to the respective animation
         if (this._currentState == player.states.IDLE) {
             animIndex = 0;
         }
         else if (this._currentState == player.states.WALKING) {
             animIndex = 1;
         }

         this._spriteAnimList[animIndex].draw(posX, posY, settings);


	     //drawSprite(sprite.id, posX, posY, settings);
	     //drawSprite("idle_1.png", posX, posY, settings);



     } // end of _drawPlayerAvatar()


}); // End of Player.create()

gFactory.nameClassMap["Player"] = Player;