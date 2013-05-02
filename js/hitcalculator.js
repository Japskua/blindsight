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

	    // And then fix it to fit more nicely within the game's purpose
	    force = force/1000;

        if (DEBUG) {
            console.log("Hit object with force of " + force);
        }

        // Return the force value
        return force;

    }, // End of CalculateHit(collision)     ,

	getCloseByElements: function(x,y, distance) {

		// Get all world bodies
		var body = gPhysicsEngine.world.GetBodyList();

		// Get the amount of bodies to check
		var size = gPhysicsEngine.world.m_bodyCount;

		// Loop through the whole list of bodies
		for(var i=0; i<size; i++) {

			// Get the X and Y Positions of the body in question
			var posY = body.m_position.y;
			var posX = body.m_position.x;

			// Again, if debugging
			if (DEBUG) {
				console.log("Checking nearby at",x,y);
			}

			// If we are on the same y-level
			if((y >= posY - TILE_HEIGHT) && (y <= posY + TILE_HEIGHT) ) {


				// Check for left side
				this.CheckForRevealingSides(x,body, distance, "left");

				// Check for right side
				this.CheckForRevealingSides(x,body, distance, "right");


			} // End of checking for y-value

			// Get the next bodyvalue
			body = body.m_next;

		} // End of for loop


	},  // End of getCloseByElements()

	CheckForRevealingSides: function(x,body, amount, side) {

		// Check the x-values of the bodies, if they match or not


		// Get the body position and fix it with -16 (to get the center point)
		var bodyPosX = body.m_position.x - 16;

		// Loop amount of times
		for(var i=1; i<=amount; i++) {

			// If the x location is within the amount of tiles to reveal
			// Calculation: x = body position.x + amount * TILE_WIDTH

			// If we are on the left side
			if(side == "left") {



				// We will add the tiles to the position
				if(x == bodyPosX  + i * gMap.tileSize.x) {
					// Reveal the tile
					body.GetShapeList().GetUserData().Reveal();
				}

			}
			// If we are on the right side
			if (side == "right") {

				// We will subtract the tile position
				if(x == bodyPosX - i * gMap.tileSize.x) {
					// Reveal the tile
					body.GetShapeList().GetUserData().Reveal();
				}
			}

		}

		// Reveal the body
		//body.GetShapeList().GetUserData().Reveal();

	} // End of CheckForRevealingSides()



};
