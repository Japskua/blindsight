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

	}, // End of initialize()

	entities: [],

	setup: function() {

		// Setup Input Engine here
		// TODO: Missing input engine

		gInputEngine.setup();

	}, // End of setup

	update: function(){

		// Update player position
		gGameEngine.updatePlayer();

		// Update all the entities
		for (var i=0; i<gGameEngine.entities.length; i++) {
			var entity = gGameEngine.entities[i];
			entity.update();
		}


	}, // End of update()

	spawnEntity: function(typename) {

		 // Create the new entity
		//var entity = new (gGameEngine.factory[typename])();

		var entityClass = gFactory.nameClassMap[typename];
		var entity = new (entityClass)();

		gGameEngine.entities.push(entity);

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