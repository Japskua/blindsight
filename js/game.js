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

    var playerSd = new b2BoxDef();

    // Mass property
    playerSd.density = 1.0;
    // Sliding value
    playerSd.friction = 1.0;
    // Bounciness
    playerSd.restitution = 0.0;
    playerSd.userData = new TileObject("player", "player1");

    // Create the new body
    var playerBodyDef = new b2BodyDef();
    // Damping reduces world velocity of the bodies
    playerBodyDef.angularDamping = 0.0;
    playerBodyDef.linearDamping = 0.0;
    // Allow body to sleep?
    playerBodyDef.allowSleep = false;

    // Fix rotation e.g. don't let player to rotate around any axis due to physics
    playerBodyDef.fixedRotation = true;

    // Is this a really fast moving object?
    playerBodyDef.bullet = false;

    playerBodyDef.AddShape(playerSd);
    playerBodyDef.position.Set(20,0);
    player.object = gPhysicsEngine.world.CreateBody(playerBodyDef);


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