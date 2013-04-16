/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 16.4.2013
 * Time: 19:25
 * To change this template use File | Settings | File Templates.
 */

function xhrGet(reqUri,callback) {
	var xhr = new XMLHttpRequest();

	xhr.open("GET", reqUri, true);
	xhr.onload = callback;

	xhr.send();
}

