/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 20:35
 * To change this template use File | Settings | File Templates.
 */

var InputEngine = Class.create({

	initialize: function() {
        if(CONSTANTS.DEBUG == true) {
            console.log("InputEngine initialized")
        }

	},

	// A dictionary mapping ASCII key codes to string values
	// describing the action we want to take when that key is
	// pressed.
	bindings: {},

	// A dictionary mapping actions that might be taken in our
	// game to a boolean value indicating whether that action
	// is currently being performed.
	actions: {},

    presses: {},
    locks: {},
    delayedKeyup: {},

    isUsingMouse: false,
    isUsingKeyboard: false,

	mouse: {
		x: 0,
		y: 0
	},

	//-----------------------------
    // Set up all the input used in the game
	setup: function () {

        WriteLog("InputEngine Setup Started");

		// Example usage of bind, where we're setting up
		// the W, A, S, and D keys in that order.
		gInputEngine.bind(87, 'move-up');
		gInputEngine.bind(65, 'move-left');
		gInputEngine.bind(83, 'move-down');
		gInputEngine.bind(68, 'move-right');

		// <--- Add all the neccessary DOM element listeners here ---->

        // <--- MOUSE ---->
		document.getElementById('game').addEventListener('mousemove', gInputEngine.onMouseMove);
        document.getElementById("game").addEventListener("mousedown", gInputEngine.onMouseDown);


        // <--- KEYBOARD -->
        window.addEventListener("keydown", gInputEngine.onKeyDown);
        window.addEventListener("keyup", gInputEngine.onKeyUp);


        WriteLog("InputEngine Setup Done!");

	},

	//-----------------------------
	onMouseMove: function (event) {
		gInputEngine.mouse.x = event.clientX;
		gInputEngine.mouse.y = event.clientY;
	},

    onMouseDown: function(evt) {

        // Get the mouseX and mouseY in the game field
        mouseX = (evt.clientX - gRenderEngine.context.canvas.offsetLeft);
        mouseY = (evt.clientY - gRenderEngine.context.canvas.offsetTop);


        console.log("Clicked at", mouseX, mouseY);
        //gInputEngine.getBodyAtMouse();
        //player.FireProjectile();

    }, // End of onMouseDown(event)

    getBodyAtMouse: function() {

        // Create the vector
        mousePVec = new b2Vec2(mouseX, mouseY);

        var aabb = new b2AABB();
        aabb.minVertex.Set (mouseX - TILE_WIDTH, mouseY - TILE_HEIGHT);
        aabb.maxVertex.Set(mouseX + TILE_WIDTH, mouseY + TILE_HEIGHT);
        selectedBody = null;

        mouseAabb = aabb;

    }, // End of getBodyAtMouse()

	//-----------------------------
	onKeyDown: function (event) {
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the 'actions' object
		// to true.
		//
		// You'll need to use the bindings object you set in 'bind'
		// in order to do this.
        keys[event.keyCode] = true;

        //console.log("keycode:", event.keyCode, " keyID:", event.keyIdentifier);

		var action = gInputEngine.bindings[event.keyIdentifier];

        player.ChangeState(player.states.WALKING);

		if (action) {
			gInputEngine.actions[action] = true;
            console.log("ACTIONACTION ACTIONACTION")
		}
	},

	//-----------------------------
	onKeyUp: function (event) {
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the 'actions' object
		// to false.
		//
		// You'll need to use the bindings object you set in 'bind'
		// in order to do this.
		var action = gInputEngine.bindings[event.keyIdentifier];

        keys[event.keyCode] = false;

        player.ChangeState(player.states.IDLE);

		if (action) {
			gInputEngine.actions[action] = false;
		}
	},

	// The bind function takes an ASCII keycode
	// and a string representing the action to
	// take when that key is pressed.
	//
	// Fill in the bind function so that it
	// sets the element at the 'key'th value
	// of the 'bindings' object to be the
	// provided 'action'.
	bind: function (key, action) {
		gInputEngine.bindings[key] = action;
	}

});

gInputEngine = new InputEngine();
