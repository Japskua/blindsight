/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 20:10
 * To change this template use File | Settings | File Templates.
 */

//
var GameEngine = Class.create({

	initialize: function() {

		this.entities = [];
		this._deferredKill = [];
        this.clock = new TimerClass();


	}, // End of initialize()

	entities: [],
	_deferredKill: [],
    fps: 0,
    currentTick: 0,
    lastFpsSec: 0,
    timeSinceGameUpdate: 0,
    timeSincePhysicsUpdate: 0,
    clock: null,


	setup: function() {

		// Setup Input Engine here
		// TODO: Missing input engine

        gPhysicsEngine.CreateWorld();

		gInputEngine.setup();

		// TODO: Load the map here
		// gMap = new Map();

        // Load spritesheets
        player.loadSprite("assets/soldier.png");

	}, // End of setup

    getTime: function() {
        return this.currentTick * 0.05;
    },

	update: function(){

        // Add to the tick
        this.currentTick++;

		// Update player position
		gGameEngine.updatePlayer();
        // TODO: Check player controls here!
        // Example showed applyInputs()


		// Update all the entities
		// by looping through the list of entities
		for (var i=0; i<gGameEngine.entities.length; i++) {
			var entity = gGameEngine.entities[i];

			// If entity is still alive
			if(entity.killed == false) {
				// Update
				entity.update();
			}
			// If not, put it to kill list
			else {
				this._deferredKill.push(entity);
			}

		}

		// Remove all the killed entities
		for (var i=0; i<this._deferredKill.length; i++) {
			// Remove from the list
			this.entities.erase(this._deferredKill[i]);
		}

		// And finally empty the list
		this._deferredKill = [];

	}, // End of update()

    updatePhysics: function() {

        gPhysicsEngine.update();

        // TODO: Update player position here


    }, // End of updatePhysics()

    run: function() {

        // Add the frames by one
        this.fps++;
        GlobalTimer.step();

        // Get the elapsed time
        var timeElapsed = this.clock.tick();
        // And update update time since last tick
        this.timeSinceGameUpdate += timeElapsed;
        this.timeSincePhysicsUpdate += timeElapsed;


        while (this.timeSinceGameUpdate >= CONSTANTS.GAME_LOOP_HZ &&
                    this.timeSincePhysicsUpdate >= CONSTANTS.PHYSICS_LOOP_HZ) {

            // Update the engine status
            this.update();
            // Update physics as well
            this.updatePhysics();

            // And update the time backwards
            this.timeSinceGameUpdate -= CONSTANTS.GAME_LOOP_HZ;
            this.timeSincePhysicsUpdate -= CONSTANTS.PHYSICS_LOOP_HZ;

        } // End of while

        // Check if another physics loop is still waiting for update
        while(this.timeSincePhysicsUpdate >= CONSTANTS.PHYSICS_LOOP_HZ) {
            // Do some extra physics calculations
            this.updatePhysics();
            this.timeSincePhysicsUpdate -= CONSTANTS.PHYSICS_LOOP_HZ;
        }

        // If the updates are full
        if(this.lastFpsSec < this.currentTick/CONSTANTS.GAME_UPDATES_PER_SEC && this.currentTick % CONSTANTS.GAME_UPDATES_PER_SEC == 0) {
            // Set the last FPS correctly
            this.lastFpsSec = this.currentTick / CONSTANTS.GAME_UPDATES_PER_SEC;
            // And zero the current FPS
            this.fps = 0;
        }



    }, // End of run()

    step: function(){

        // If player drops to the bottom
        if (player.object.GetCenterPosition().y > gRenderEngine.canvas.height){
            player.object.SetCenterPosition(new b2Vec2(20,0),0)
        }
        // If player reaches the right end of the level
        else if (player.object.GetCenterPosition().x > gRenderEngine.canvas.width-50){
            showWin();
            return;
        }


        // Handle the interactions
        gPhysicsEngine.HandleInteractions();

        // Update the engine situation
        this.update();

        var timeStep = 1.0/60;
        var iteration = 1;

        // Make the physics step
        gPhysicsEngine.world.Step(timeStep, iteration);

        // Draw the new situation
        gRenderEngine.draw();

	    /*
        var settings = {
            rotRadians: 90 * (Math.PI / 180.0),
	        noMapTrans: true

        };

        drawSprite("idle_1.png", 220, 220, settings);
        */

        //player.draw(gRenderEngine.context);

        // Order to wait for a few moments before running the step again
        setTimeout('gGameEngine.step()', 10);

    }, // End of step()

    preloadComplete: false,

    preloadAssets: function() {

        // First, load the images
        var assets = [];

        // Push the player image to the list
        assets.push("https://dl.dropboxusercontent.com/u/4692161/blindsight/soldier.png");




        // <------------ MAPS ------------------------>




        // <----------- SOUNDS ----------------------->



        // <------------- LOAD THE ASSETS ------------>

        loadAssets(assets, function() {

            // After loading these, proceed to JSON loading
            // <--------------- LOAD JSONS ------------------------->

                gMap.LoadMap("https://dl.dropboxusercontent.com/u/4692161/blindsight/map1.json")



                // Get the atlas JSON
                jQuery.getJSON("https://dl.dropboxusercontent.com/u/4692161/blindsight/soldier.json", function(data) {

                    console.log("------------------------------------------JSON!---------------------");
                    console.log(data);



                    var spriteSheetClass = new SpriteSheetClass();
                    spriteSheetClass.load("https://dl.dropboxusercontent.com/u/4692161/blindsight/soldier.png");

                    spriteSheetClass.ParseAtlasDefinition(data);

                    // Create the animclass
                    var spriteSheetAnimClass = new SpriteSheetAnimClass();
                    spriteSheetAnimClass.loadSheet("blindsight", spriteSheetClass.url);


                    gGameEngine.preloadComplete = true;


                }); // End of getJSON()

        }); // End of loadAssets()


    }, // End of preloadAssets()



	spawnEntity: function(typename) {

		 // Create the new entity
		//var entity = new (gGameEngine.factory[typename])();

        // Get the entity type we want to create from the factory
		var entityClass = gFactory.nameClassMap[typename];
        // And then create the entity
		var entity = new (entityClass)();

        // Add the entity to the list of entities in the game engine
		gGameEngine.entities.push(entity);

        // And return the created entity
		return entity;


	}, // End of spawnEntity()

	removeEntity: function(entity) {

        // If the entity does not exist
        // Just return
        if(!entity) return;


        // TODO: Remove function
        // Remove the entity from the named entities
        if(entity.name) {

        }



	}, // End of removeEntity()

	updatePlayer: function() {

		// TODO: Player update!


	} // End of updatePlayer()

}); // ENd of GameEngine.create()

gGameEngine = new GameEngine();