/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 24.4.2013
 * Time: 15:17
 * To change this template use File | Settings | File Templates.
 */

// Step that handles drawing/updating/physics
// This is performed every 10 milliseconds
function step() {

    // If player drops to the bottom
    if (player.object.GetCenterPosition().y > canvasHeight){
        player.object.SetCenterPosition(new b2Vec2(20,0),0)
    }
    // If player reaches the right end of the level
    else if (player.object.GetCenterPosition().x > canvasWidth-50){
        showWin();
        return;
    }


    // Handle the interactions
    //handleInteractions();
    gPhysicsEngine.HandleInteractions();

    var stepping = false;
    var timeStep = 1.0/60;
    var iteration = 1;

    // Make the physics step
    world.Step(timeStep, iteration);
    // Clear the canvas
    //context.clearRect(0, 0, canvasWidth, canvasHeight);
    gRenderEngine.context.clearRect(0,0, gRenderEngine.canvas.width, gRenderEngine.canvas.height);

    // Draw the new situation
    //drawWorld(world, context);
    drawWorld(world, gRenderEngine.context);
    // Order to wait for a few moments before running the step again
    setTimeout('step()', 10);
}

/*
function handleInteractions(){
    // up arrow

    // Get the list of collisions
    var collision = world.m_contactList;

    player.canJump = false;
    // If there are collisions
    if (collision != null){
        if (DEBUG) {
            var collisionObject1 = collision.GetShape1().GetUserData() ;
            var collisionObject2 = collision.GetShape2().GetUserData();
            // If the collided object is something different than previous collision
            if (collisionObject1 != DEBUG_COLLISION) {
                // Save to DEBUG_COLLISION
                DEBUG_COLLISION = collisionObject1;

                // Inform
                console.log(collisionObject1.getTileName() + " collided with " + collisionObject2.getTileName() + " and was hidden: " + collisionObject1.getHidden());


            }
        }   // End of DEBUG


        CheckPlayerCollision(collision);

    }  // End of if (collision != null)

    var vel = player.object.GetLinearVelocity();
    if (keys[38] && player.canJump){
        vel.y = -150;
    }

    // left/right arrows
    if (keys[37]){
        vel.x = -60;
    }
    else if (keys[39]){
        vel.x = 60;
    }


    player.object.SetLinearVelocity(vel);
}     */