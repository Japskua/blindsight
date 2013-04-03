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

/*
This function is used to calculate the effect of the hit in question
 */
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