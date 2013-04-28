/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 20:17
 * To change this template use File | Settings | File Templates.
 */


// Definition for Entity
var Factory = Class.create({

	nameClassMap: {},

	initialize: function() {

		// Do some initial stuff here
		this.nameClassMap = {};

	},   // End of initialize


	getClass: function (name) {
		return this.nameClassMap[name];
	},

	createInstance: function () {
		var name = arguments[0];
		var ClassToCreate = this.getClass();
		switch (arguments.length) {
			case 1:
				return new ClassToCreate();
			case 2:
				return new ClassToCreate(arugments[1]);
			case 3:
				return new ClassToCreate(arugments[1], arugments[2]);
			case 4:
				return new ClassToCreate(arugments[1], arugments[2], arugments[3]);
			case 5:
				return new ClassToCreate(arugments[1], arugments[2], arugments[3], arugments[4]);
			case 6:
				return new ClassToCreate(arugments[1], arugments[2], arugments[3], arugments[4], arugments[5]);
			case 7:
				return new ClassToCreate(arugments[1], arugments[2], arugments[3], arugments[4], arugments[5], arguments[6]);
			case 8:
				return new ClassToCreate(arugments[1], arugments[2], arugments[3], arugments[4], arugments[5], arguments[6], arguments[7]);
			case 9:
				return new ClassToCreate(arugments[1], arugments[2], arugments[3], arugments[4], arugments[5], arguments[6], arguments[7], arguments[8]);
			case 10:
				return new ClassToCreate(arugments[1], arugments[2], arugments[3], arugments[4], arugments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
			case 11:
				return new ClassToCreate(arugments[1], arugments[2], arugments[3], arugments[4], arugments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
			default:
				Console.log("Creating instances with more than 10 arguments not supported");
		}

	}

});  // End of Factory.create()

var gFactory = new Factory();