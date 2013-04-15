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

    }, // End of CalculateHit(collision)     ,

	getCloseByElements: function(x,y) {

		// Get all world bodies
		var body = world.GetBodyList();

		var size = world.m_bodyCount;


		for(var i=0; i<size; i++) {
			//console.log(body.m_position);

			var posY = body.m_position.y;
			var posX = body.m_position.x;

			// TODO: Finish the function!

			console.log("Checking nearby at",x,y);

			// If we are on the same y-level
			if((y >= posY - TILE_HEIGHT) && (y <= posY + TILE_HEIGHT) ) {


				// Check if there is a tile on the left side of the current one
				if (x == posX - TILE_WIDTH * 2) {
					console.log("leftside", posX);


					body.GetShapeList().GetUserData().UnHide(1);

				}

				// Check if there is something on the right side
				if (x == posX + TILE_WIDTH * 2) {
					console.log("rightSide", posX);


					body.GetShapeList().GetUserData().UnHide(1);
				}


			} // End of checking for y-value

			// Get the next bodyvalue
			body = body.m_next;

		} // End of for loop


	}  // End of getCloseByElements()

};
