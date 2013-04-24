/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 24.4.2013
 * Time: 15:12
 * To change this template use File | Settings | File Templates.
 */

// Checks if the player has collided with something
// var collision = world.m_contactList (list of contact collisions)
function CheckPlayerCollision(collision) {

    // Get the collision objects
    var collisionObject1Type =  collision.GetShape1().GetUserData().getTileGroup();
    var collisionObject2Type =  collision.GetShape2().GetUserData().getTileGroup();
    //var collisionObject2Type =  collision.GetShape2().GetUserData().getTileType();

    var collision1Data = collision.GetShape1().GetUserData();

    // Check if one of the colliders is the player
    if (collisionObject1Type == 'player' || collisionObject2Type == 'player'){
        if ((collisionObject1Type == 'ground' || collisionObject2Type == 'ground')){
            // The player collided with the ground, so unhide
            if (collision1Data.getHidden() == true) {

                // Check the collision strength
                var force = hitCalculator.CalculateHit(collision);

                // Unhide
                collision1Data.UnHide(force);

                // Check for other bodies to unhide besides
                //hitCalculator.getCloseByElements(collision.GetShape1().GetPosition().x, collision.GetShape1().GetPosition().y);

            }

            // If touching ground, allow jumping
            var playerObj = (collisionObject1Type == 'player' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
            var groundObj = (collisionObject1Type == 'ground' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
            if (playerObj.y < groundObj.y){
                player.canJump = true;
            }
        }
    }
}   // End of CheckPlayerCollision()