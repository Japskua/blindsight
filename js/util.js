/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 22:29
 * To change this template use File | Settings | File Templates.
 */

Array.prototype.erase = function(item) {
	for (var i = this.length; i--; i) {
		if (this[i] === item) this.splice(i, 1);
	}
	return this;
};


// ------------------------------------------------------ //
// This function is used to write log if Debugging is turned on
function WriteLog() {
    if(CONSTANTS.DEBUG) {


        // Show arguments according to the number of arguments given
        switch (arguments.length) {

            case 1:
                console.log(arguments[0]);
                break;
            case 2:
                console.log(arguments[0], arguments[1]);
                break;
            case 3:
                console.log(arguments[0], arguments[1], arguments[2]);
                break;
            case 4:
                console.log(arguments[0], arguments[1], arguments[2], arguments[3]);
                break;
            case 5:
                console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                break;
            case 6:
                console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                break;
            case 7:
                console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                break;
            case 8:
                console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                break;
            default:
                console.log("MORE THAN 8 ARGUMENTS NOT SUPPORTED CURRENTLY!!!")
                break;


        }

    }
}