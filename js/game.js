

/*
 THE VARIABLES
 */
var initId = 0;
var player = function(){
    this.object = null;
    this.canJump = false;
};


var DEBUG = true;

var DEBUG_COLLISION = null;

var world = createWorld();
var context;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var keys = [];

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
    handleInteractions();

    var stepping = false;
    var timeStep = 1.0/60;
    var iteration = 1;

    // Make the physics step
    world.Step(timeStep, iteration);
    // Clear the canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Draw the new situation
    drawWorld(world, context);
    // Order to wait for a few moments before running the step again
    setTimeout('step()', 10);
}

// Show level completed information
function showWin(){
    context.fillStyle    = '#000';
    context.font         = '30px verdana';
    context.textBaseline = 'top';
    context.fillText('Ye! you made it!', 30, 0);
    context.fillText('thank you, andersonferminiano.com', 30, 30);
    context.fillText('@andferminiano', 30, 60);
}

// Checks if the player has collided with something
// var collision = world.m_contactList (list of contact collisions)
function CheckPlayerCollision(collision) {

    // Get the collision objects
    var collisionObject1Type =  collision.GetShape1().GetUserData().getTileType();
    var collisionObject2Type =  collision.GetShape2().GetUserData().getTileType();

    // Check if one of the colliders is the player
    if (collisionObject1Type == 'player' || collisionObject2Type == 'player'){
        if ((collisionObject1Type == 'ground' || collisionObject2Type == 'ground')){
            var playerObj = (collisionObject1Type == 'player' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
            var groundObj = (collisionObject1Type == 'ground' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
            if (playerObj.y < groundObj.y){
                player.canJump = true;
            }
        }
    }
}   // End of CheckPlayerCollision()

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
                console.log(collisionObject1.getTileName() + " collided with " + collisionObject2.getTileName());

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
}


// Initializes the game
function initGame(){

    CreatePlatform(world, 3, 23, "start");
    CreatePlatform(world, 560, 360, "end");

    // create 2 big platforms
    //createBox(world, 3, 230, 60, 180, true, 'ground');
    //createBox(world, 560, 360, 50, 50, true, 'ground');

    // create small platforms
    for (var i = 0; i < 5; i++){
        CreatePlatform(world, 150+(30*i), 360, i);

        //createBox(world, 150+(80*i), 360, 5, 40+(i*15), true, 'ground');
    }


    // Explain what was just written
    if(DEBUG == true) {
        // Size of levelPlatforms
        console.log("Number of level platforms created: " + levelPlatforms.size());
    }   // End of DEBUG info


    // create player ball
    var ballSd = new b2CircleDef();
    ballSd.density = 0.1;
    ballSd.radius = 12;
    ballSd.restitution = 0.5;
    ballSd.friction = 1;
    //ballSd.userData = 'player';
    ballSd.userData = new TileObject("player", "player1");
    var ballBd = new b2BodyDef();
    ballBd.linearDamping = .03;
    ballBd.allowSleep = false;
    ballBd.AddShape(ballSd);
    ballBd.position.Set(20,0);
    player.object = world.CreateBody(ballBd);

}

/*
KEY EVENTS
 */
function handleKeyDown(evt){
    keys[evt.keyCode] = true;
}


function handleKeyUp(evt){
    keys[evt.keyCode] = false;
}

/*
END OF KEY EVENTS
 */


// This function is run when the window is loaded
// Starts the game
Event.observe(window, 'load', function() {
    // Create the world
    world = createWorld();
    // Get the context
    context = $('game').getContext('2d');
    // Get the game canvas element
    var canvasElement = $('game');
    // Get the values of canvas size
    canvasWidth = parseInt(canvasElement.width);
    canvasHeight = parseInt(canvasElement.height);
    canvasTop = parseInt(canvasElement.style.top);
    canvasLeft = parseInt(canvasElement.style.left);

    // Now, lets initialize everything we need in the game
    initGame();
    // Physics step for Box2D
    step();

    // Add the event listeners for buttons
    window.addEventListener('keydown',handleKeyDown,true);
    window.addEventListener('keyup',handleKeyUp,true);
});


// disable vertical scrolling from arrows :)
document.onkeydown=function(){return event.keyCode!=38 && event.keyCode!=40}