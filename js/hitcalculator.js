/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 3.4.2013
 * Time: 18:12
 * To change this template use File | Settings | File Templates.
 */


/*
Hit Calculator is used to calculate the hit
strength and distance how far it has an effect
 */
function HitCalculator() {

	// TODO: Create a Singleton out of this constructor

}   // End of HitCalculator()


HitCalculator.prototype = {

    // Constructor
    constructor: HitCalculator,

    // CalculateHit
    CalculateHit: function(collision) {

        // Get the body
        var body = collision.GetShape2().GetBody();
        // Get the mass and velocity of the body
        var mass = body.GetMass();
        var linearVelocity = body.GetLinearVelocity().y;

        if(linearVelocity < 0) {
            // Swap to positive
            linearVelocity *= -1;
        }

        // Calculate the hit based on mass and velocity
        // F = ma
        var force = mass * linearVelocity;


        if (DEBUG) {
            console.log("Hit object with force of " + force);
        }

        // Return the force value
        return force;

    }, // End of CalculateHit(collision)

    FindCollisionFromWorld: function(collisionObject) {
        console.log(collisionObject);

        // Get the position of the object
        var position = collisionObject.GetPosition();
        var x = position.x;
        var y = position.y;

        console.log("x=" + x + "y=" + y);

        var contactEdge = collisionObject.GetBody().GetContactList();
       // console.log("contactEdge", contactEdge);


        // Try to find the next tile from the right
        this.FindNextCollision(x,y);


    }, // End of FindCollisionFromWorld(collisionObject)

    FindNextCollision: function(x,y) {

        // Draw a ray from the position to right

        // First, we need to check the x-position
        // on the right that equals tile width
        var x1 = x + TILE_WIDTH*2;
        var y1 = y + TILE_HEIGHT*2;

        console.log("Checking from", x1, y);

        var aabb = new b2AABB();
        var userData = [];
        aabb.minVertex.Set(x1,y1);
        aabb.maxVertex.Set(x,y);

        var count = world.Query(aabb, userData);
        //console.log("Check AABB", aabb);
        //console.log("Count", count, " userData", userData);


        // Is there a box in the given location


        return true;


    } // End of FindNextCollision(x,y)



};

/*
This function is used to calculate the effect of the hit in question
 */
/*
HitCalculator.prototype.CalculateHit = function(collision) {

	// TODO: Calculate the hit effect

	// Get the body
	var body = collision.GetShape2().GetBody();
	// Get the mass and velocity of the body
	var mass = body.GetMass();
	var linearVelocity = body.GetLinearVelocity().y;

	if(linearVelocity < 0) {
		// Swap to positive
		linearVelocity *= -1;
	}

	// Calculate the hit based on mass and velocity
	// F = ma
	var force = mass * linearVelocity;


	if (DEBUG) {
		console.log("Hit object with force of " + force);
	}

	// Return the force value
	return force;

}   // End of CalculateHit()
  */

/*
HitCalculator.prototype.FindCollisionFromWorld = function(collisionObject) {

    console.log(collisionObject);

    var position = collisionObject.GetPosition();
    var x = position.x;
    var y = position.y;

    console.log("x=" + x + "y=" + y);



}   // End of FindCollisionFromWorld()
  */


HitCalculator.prototype.FindCollisionFromList = function(collisionObject, doublyList) {

    // Get the size of the list
   var length = doublyList.size();

    console.log("Hit " + collisionObject.getTileName());

    // Loop through the list
    for(var i=0; i < length; i++) {
        // Get the new item
        var item = doublyList.item(i);

        // Get the name of the item
        var itemName = item.getTileName();

        // Compare the name to the original collision
        if(itemName == collisionObject.getTileName()) {

            // Then get the tile before and after
            console.log(doublyList.prev + "-" + itemName + "-");
            console.log(itemName);
        }


    }





}   // End of FindCollisionFromList(collision, doublyList)