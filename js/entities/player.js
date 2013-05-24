/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 19:57
 * To change this template use File | Settings | File Templates.
 */


var Player = Class.create(Entity, {

    initialize: function($super) {

        $super();
        this.canJump = false;
        this.object = null;
        this._spriteAnimList = [];
        this._animIndex = 0;
        this.spriteSheet = null;
        this._currentState = this.states.IDLE;
        this._runSpriteAnimList = [];
        this.name = "Player";






    },

    position: {x:0, y:0},
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
            animationSheet.loadSheet(CONSTANTS.SHEET_NAME, CONSTANTS.OBJECTS_SHEET_NAME);

            // Defien the name variable and amount of frames
            var amountFrames = 0;
            var name = names[animationNumber];

            // Define the amount of frames in each animation
            if (name == "idle") {
                amountFrames = CONSTANTS.ANIMATION_IDLE_FRAME_AMOUNT;
            }
            else if (name == "run") {
                amountFrames = CONSTANTS.ANIMATION_RUN_FRAME_AMOUNT;
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

         this.setPosition(shape.m_position.x, shape.m_position.y);

         //this.position.x = shape.m_position.x;
         //this.position.y = shape.m_position.y;
	     //var posX = shape.m_position.x;
	     //var posY = shape.m_position.y;


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

         this._spriteAnimList[animIndex].draw(this.position.x, this.position.y, settings);
         //this._spriteAnimList[animIndex].draw(posX, posY, settings);


	     //drawSprite(sprite.id, posX, posY, settings);
	     //drawSprite("idle_1.png", posX, posY, settings);



     }, // end of _drawPlayerAvatar()

    FireProjectile: function() {

        if(DEBUG) {
            console.log("Player firing projectile at x=", this.position.x, "y=", this.position.y);
        }

        // Spawn a new projectile
        var projectile = gGameEngine.spawnEntity("Projectile");

        // Load the projectile assets
        projectile.LoadSpriteAnimations();

        player.LoadSpriteAnimations();


        // add the physics
        var projectileSd = new b2BoxDef();


        // Mass property
        projectileSd.density = 1.0;
        // Sliding value
        projectileSd.friction = 1.0;
        // Bounciness
        projectileSd.restitution = 0.0;
        projectileSd.userData = new TileObject("projectile", "projectile");

        // Create the new body
        var projectileBodyDef = new b2BodyDef();
        // Damping reduces world velocity of the bodies
        projectileBodyDef.angularDamping = 0.0;
        projectileBodyDef.linearDamping = 0.0;
        // Allow body to sleep?
        projectileBodyDef.allowSleep = false;

        // Fix rotation e.g. don't let player to rotate around any axis due to physics
        projectileBodyDef.fixedRotation = true;

        // Is this a really fast moving object?
        projectileBodyDef.bullet = false;

        projectileBodyDef.AddShape(projectileSd);
        projectileBodyDef.position.Set(20,0);
        player.object = gPhysicsEngine.world.CreateBody(projectileBodyDef);

        // Set the location to be where the player is
        //projectile.position.x = this.position.x;
        //projectile.position.y = this.position.y;

        //projectile.position = this.getPosition();

        console.log("Projectile position before setting is", projectile.getPosition())

        //projectile.setPosition(this.getPosition().x, this.getPosition().y);

        projectile.setPosition(200, 200)

        console.log("Projectile position is", projectile.position)

        // Get the spritesheet from the loader
        projectile.currentSpriteName = "projectile_1.png";


    } // End of FireProjectile()


}); // End of Player.create()

gFactory.nameClassMap["Player"] = Player;