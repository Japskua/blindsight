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

	}, // End of initialize()

	entities: [],
	_deferredKill: [],

	setup: function() {

		// Setup Input Engine here
		// TODO: Missing input engine

		gInputEngine.setup();

		// TODO: Load the map here
		// gMap = new Map();

	}, // End of setup

	update: function(){

		// Update player position
		gGameEngine.updatePlayer();

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

		// TODO: Remove function

	}, // End of removeEntity()

	updatePlayer: function() {

		// TODO: Player update!

	} // End of updatePlayer()

}); // ENd of GameEngine.create()

gGameEngine = new GameEngine();