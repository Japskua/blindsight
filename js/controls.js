/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 15.4.2013
 * Time: 20:12
 * To change this template use File | Settings | File Templates.
 */

/*
 KEY EVENTS
 */
function handleKeyDown(evt){
	keys[evt.keyCode] = true;
}


function handleKeyUp(evt){
	keys[evt.keyCode] = false;
}

function handleMouseDown(evt) {
	// Get the mouseX and mouseY in the game field
	mouseX = (evt.clientX - context.canvas.offsetLeft);
	mouseY = (evt.clientY - context.canvas.offsetTop);


	console.log("Clicked at", mouseX, mouseY);
	getBodyAtMouse();
}

/*
 END OF KEY EVENTS
 */

var selectedBody;
var mouseAabb = new b2AABB();
function getBodyAtMouse() {
	// Create the vector
	mousePVec = new b2Vec2(mouseX, mouseY);

	var aabb = new b2AABB();
	aabb.minVertex.Set (mouseX - TILE_WIDTH, mouseY - TILE_HEIGHT);
	aabb.maxVertex.Set(mouseX + TILE_WIDTH, mouseY + TILE_HEIGHT);
	selectedBody = null;

	mouseAabb = aabb;


	//getCloseByElements(mouseX, mouseY);



}   // End of getBodyAtMouse()