/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 19:57
 * To change this template use File | Settings | File Templates.
 */


var Player = Class.create(Entity, {

    initialize: function($super) {

        this.canJump = false;
        this.object = null;

    },

    object: null,
    canJump: false


}); // End of Player.create()

gFactory.nameClassMap["Player"] = Player;