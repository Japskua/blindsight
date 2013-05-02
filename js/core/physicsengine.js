/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 29.4.2013
 * Time: 9:03
 * To change this template use File | Settings | File Templates.
 */

var PhysicsEngine = Class.create({

    world: null,

    initialize: function() {

        this.world = null;

    }, // End of initialize()

    CreateWorld: function() {

        var worldAABB = new b2AABB();
        worldAABB.minVertex.Set(-1000, -1000);
        worldAABB.maxVertex.Set(1000, 1000);
        var gravity = new b2Vec2(0, 300);
        var doSleep = true;
        this.world = new b2World(worldAABB, gravity, doSleep);
        return world;

    }, // End of CreateWorld()

    update: function() {

        // Get the start time for the update
        var start = Date.now();

        // Make a new physics step
        /*this.world.Step(
             CONSTANTS.PHYSICS_LOOP_HZ, // Frame rate
             10, // velocity iterations
             10 // position iterations
        );*/





        // Return the amount of time it took to update
        return (Date.now() - start);




    }, // End of update()

    CreateBox: function(x, y, width, height, fixed, userData) {

        if (typeof(fixed) == 'undefined') fixed = true;
        var boxSd = new b2BoxDef();
        if (!fixed) boxSd.density = 1.0;

        boxSd.userData = userData;

        boxSd.extents.Set(width, height);
        var boxBd = new b2BodyDef();
        boxBd.AddShape(boxSd);
        boxBd.position.Set(x,y);
        return this.world.CreateBody(boxBd)

    }, // End of CreateBox()

    DrawDebugBox: function(x, y, size) {
        context.moveTo(x-size,y-size);

        context.lineTo(x-size, y+TILE_HEIGHT+size);
        context.lineTo(x+TILE_WIDTH+size, y+TILE_HEIGHT+size);
        context.lineTo(x+TILE_WIDTH+size, y-size);

        context.lineTo(x-size,y-size);
    }, // End of DrawDebugBox()


    HandleInteractions: function() {
        // up arrow

        // Get the list of collisions
        var collision = this.world.m_contactList;

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
    } // End of HandleInteractions()


}); // End of PhysicsEngine.create()


var gPhysicsEngine = new PhysicsEngine();