/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 24.4.2013
 * Time: 15:12
 * To change this template use File | Settings | File Templates.
 */


function CheckPlayerTouchingGround(collision) {

    // Get the collision Objects
    var collisionObject1Type =  collision.GetShape1().GetUserData().getTileGroup();
    var collisionObject2Type =  collision.GetShape2().GetUserData().getTileGroup();

    // If touching ground, allow jumping
    var playerObj = (collisionObject1Type == 'player' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
    var groundObj = (collisionObject1Type == 'ground' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
    if (playerObj.y < groundObj.y){
        player.canJump = true;
    }
}


// Checks if the player has collided with something
function CheckCollision(collision, type1, type2) {


    // Get the collision Objects
    var collisionObject1Type =  collision.GetShape1().GetUserData().getTileGroup();
    var collisionObject2Type =  collision.GetShape2().GetUserData().getTileGroup();

    // Get the collision 1 data
    var collision1Data = collision.GetShape1().GetUserData();

    // Check if one of the colliders is the type1 given
    if (collisionObject1Type == type1 || collisionObject2Type == type1){
        if ((collisionObject1Type == type2 || collisionObject2Type == type2)){
            // The player collided with the ground, so unhide
            if (collision1Data.getHidden() == true) {

                // Check the collision strength
                var force = hitCalculator.CalculateHit(collision);

                // Unhide
                collision1Data.UnHide(force);

            }


        }
    }
}