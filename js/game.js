/*
 THE VARIABLES
 */
var initId = 0;

// Create the player
var player = gGameEngine.spawnEntity("Player");


var DEBUG = true;

var DEBUG_COLLISION = null;

//var world = createWorld();
var world = gPhysicsEngine.CreateWorld();
var context;

var keys = [];
var mouseX;
var mouseY;

var hitCalculator = new HitCalculator();
var spriteManager = SpriteManager();

var gRenderEngine = new RenderEngine();



// Show level completed information
function showWin(){
    context = gRenderEngine.context;

    context.fillStyle    = '#000';
    context.font         = '30px verdana';
    context.textBaseline = 'top';
    context.fillText('Level Done!', 30, 0);

}


function showLoad(){
    context = gRenderEngine.context;

    context.fillStyle    = '#000';
    context.font         = '30px verdana';
    context.textBaseline = 'top';
    context.fillText('Loading the level...', 30, 0);

}


// Initializes the game
function initGame(){


	//CreateLevel();
	createPlayer();


	// Testing the game engine spawner
	var enemy = gGameEngine.spawnEntity("Enemy");


}


function createPlayer() {

	// create player ball
	var ballSd = new b2CircleDef();
	ballSd.density = 0.1;
	ballSd.radius = 8;
	ballSd.restitution = 0.5;
	ballSd.friction = 1;
	//ballSd.userData = 'player';
	ballSd.userData = new TileObject("player", "player1");
	var ballBd = new b2BodyDef();
	ballBd.linearDamping = .03;
	ballBd.allowSleep = false;
	ballBd.AddShape(ballSd);
	ballBd.position.Set(20,0);
	player.object = gPhysicsEngine.world.CreateBody(ballBd);

} // End of createPlayer


// This function is run when the window is loaded
// Starts the game
Event.observe(window, 'load', function() {

    gGameEngine.setup();

    gRenderEngine.setup();

    showLoad();

    // Now, lets initialize everything we need in the game
    gGameEngine.preloadAssets();

    // Check for preloading of assets
    // Once done, initialize the game and take the first step
    checkWait(function() {
        return gGameEngine.preloadComplete;
    },
    function() {
        initGame();
        gGameEngine.step();

    }); // End of checkWait()




});


// disable vertical scrolling from arrows :)
document.onkeydown=function(){return event.keyCode!=38 && event.keyCode!=40}