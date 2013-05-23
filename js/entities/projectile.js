/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 23.5.2013
 * Time: 20:06
 * To change this template use File | Settings | File Templates.
 */


var Projectile = Class.create(Entity, {


    object: null,
    canJump: false,
    _spriteAnimList: [],
    _animIndex: 0,
    _runSpriteAnimList: [],
    spriteSheet: null,

    LoadSpriteAnimations: function() {

        var names = ["idle", "run"];
        // Loop through all the animations in the list
        for (var animationNumber=0; animationNumber<names.length; animationNumber++) {

            // Create a new animation sheet
            var animationSheet = new SpriteSheetAnimClass();
            animationSheet._animIncPerFrame = 0.05;

            // Load the sheet
            animationSheet.loadSheet(CONSTANTS.SHEET_NAME, CONSTANTS.PLAYER_SHEET_NAME);

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

    } // End of PushFrames()

}); // End of Player.create()

gFactory.nameClassMap["Projectile"] = Projectile;