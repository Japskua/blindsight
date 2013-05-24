/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 23.5.2013
 * Time: 20:06
 * To change this template use File | Settings | File Templates.
 */


var Projectile = Class.create(Entity, {


    initialize: function($super) {

        $super();
        this.position.x = 0;
        this.position.y = 0;
        this.name = "Projectile";

        // Load the projectile assets
        this.LoadSpriteAnimations();

        this._createPhysicsBody();


    }, // End of initialize()

    position: {x:0, y:0},

    object: null,
    canJump: false,
    _spriteAnimList: [],
    _animIndex: 0,
    _runSpriteAnimList: [],
    spriteSheet: null,

    _createPhysicsBody: function() {

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

        // Fix rotation e.g. don't let projectile to rotate around any axis due to physics
        projectileBodyDef.fixedRotation = false;

        // Is this a really fast moving object?
        projectileBodyDef.bullet = false;

        projectileBodyDef.AddShape(projectileSd);

        projectileBodyDef.position.Set(player.position.x, player.position.y);

        this.object = gPhysicsEngine.world.CreateBody(projectileBodyDef);

        var vel = this.object.GetLinearVelocity();

        vel.x = CONSTANTS.BULLET_FIRING_SPEED;
        vel.y = -CONSTANTS.BULLET_FIRING_SPEED;

        this.object.SetLinearVelocity(vel);

    }, // End of _createPhysicsBody()

    LoadSpriteAnimations: function() {

        var names = ["others"];
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

            // 1 frame for animation currently
            amountFrames = 1;

            // Push all the frames to the animation sheet
            animationSheet = this.PushFrames(amountFrames, animationSheet, name);

            // And finally, add this to the animation list
            this._spriteAnimList.push(animationSheet);

            WriteLog("SPRITEANIMLIST", this._spriteAnimList);
        }


    }, // End of LoadSpriteAnimations()

    PushFrames: function(amountFrames, animationSheet, name) {

        // Loop through the amount of animations
        for( var i=1; i<amountFrames; i++) {
            animationSheet.pushFrame(name + "_" + i + ".png");

        }

        return animationSheet;

    }, // End of PushFrames()

    update: function() {

        //$super();

        // If not dead yet
        // Incremenent the location by 1
        //var x = this.getPosition().x;
        //var y = this.getPosition().y;

        //x += 1;

        //this.setPosition(x, y);

        //console.log("Updated projectile position to", this.position.x);



    }, // End of update()

    draw: function() {

        //$super();
        this._drawProjectile();

    }, // End of draw()


    _drawProjectile: function() {

        // Create settings
        var settings = {
            noMapTrans: true
        };

        // Get the animation index
        var animIndex = this._animIndex;



        // And then draw
        this._spriteAnimList[animIndex].draw(this.position.x, this.position.y, settings);


    } // End of drawProjectile()

}); // End of Projectile.create()

gFactory.nameClassMap["Projectile"] = Projectile;