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
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var keys = [];
var mouseX;
var mouseY;

var hitCalculator = new HitCalculator();
var spriteManager = SpriteManager();

var gRenderEngine = new RenderEngine();



// Show level completed information
function showWin(){
    context.fillStyle    = '#000';
    context.font         = '30px verdana';
    context.textBaseline = 'top';
    context.fillText('Level Done!', 30, 0);

}


// Initializes the game
function initGame(){

	// Load the map
    //gMap.LoadMap("https://raw.github.com/Japskua/blindsight/master/assets/map1.js");



    gMap.LoadMapLocalJSON(level1);

    console.log("gMap.fullyLoaded", gMap.fullyLoaded);


    if(gMap.fullyLoaded == true) {
        // Load Spritemap
        //spriteManager.LoadSpriteMap("assets/futuretiles.png");
        console.log("-----Fully Loaded!---------");


    }

	CreateLevel();
	createPlayer();

	//gGameEngine.setup();


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
	player.object = world.CreateBody(ballBd);

} // End of createPlayer


// This function is run when the window is loaded
// Starts the game
Event.observe(window, 'load', function() {


    gRenderEngine.setup();
    // Now, lets initialize everything we need in the game
    initGame();
    // Physics step for Box2D
    step();


});


// disable vertical scrolling from arrows :)
document.onkeydown=function(){return event.keyCode!=38 && event.keyCode!=40}