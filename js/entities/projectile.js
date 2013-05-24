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


    }, // End of initialize()

    position: {x:0, y:0},

    object: null,
    canJump: false,
    _spriteAnimList: [],
    _animIndex: 0,
    _runSpriteAnimList: [],
    spriteSheet: null,

    LoadSpriteAnimations: function() {

        var names = ["others"];
        // Loop through all the animations in the list
        for (var animationNumber=0; animationNumber<names.length; animationNumber++) {

            // Create a new animation sheet
            var animationSheet = new SpriteSheetAnimClass();
            animationSheet._animIncPerFrame = 0.05;

            // Load the sheet
            animationSheet.loadSheet(CONSTANTS.SHEET_NAME, CONSTANTS.PROJECTILE_SHEET_NAME);

            // Defien the name variable and amount of frames
            var amountFrames = 0;
            var name = names[animationNumber];

            // 1 frame for animation currently
            amountFrames = 1;

            // Push all the frames to the animation sheet
            animationSheet = this.PushFrames(amountFrames, animationSheet, name);

            // And finally, add this to the animation list
            this._spriteAnimList.push(animationSheet);


            console.log("SPRITEANIMLIST", this._spriteAnimList)
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
        // Incremenet the location by 1
        var x = this.getPosition().x;
        var y = this.getPosition().y;

        x += 1;

        this.setPosition(x, y);

        //console.log("Updated projectile position to", this.position.x);



    }, // End of update()

    draw: function($super) {

        //$super();
        //drawSprite(this.currentSpriteName, this.position.x, this.position.y);
        //drawSprite(this.currentSpriteName, 200, this.position.y)
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

}); // End of Player.create()

gFactory.nameClassMap["Projectile"] = Projectile;