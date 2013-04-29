/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 24.4.2013
 * Time: 15:16
 * To change this template use File | Settings | File Templates.
 */


function CreateLayer(layer) {

    // Get the tile data of the layer
    var layerData = layer["data"];


    // Set the starting location for the loop in question
    var xLocation = 0;
    var yLocation = 0;

    // Loop through all the tiles in this layer
    for(var tileNumber=0; tileNumber<gMap.numXTiles*gMap.numYTiles; tileNumber++) {


        if(layerData[tileNumber] == 154) {

            if(DEBUG) {
                console.log("Tile:", layerData[tileNumber] , "placed at (", yLocation,",",xLocation,")");
            }


            var tileData = {
                tileName: tileNumber,
                tileType: layerData[tileNumber]
            };

            // Draw the tile
            CreatePlatform(xLocation, yLocation, tileData);

        }

        // Make the current xLocation to be bigger
        xLocation++;

        // Check if xLocation is 20 (full row)
        if(xLocation==20) {
            // In this case, start the next row from the start
            xLocation = 0;
            // The next row starts with having 1 bigger y than before
            yLocation++;
        }


    }

} // End of CreateLayer()


function CreateLevel() {
    if(DEBUG) {
        console.log("Creating the level");
        console.log("Xtiles:", gMap.numXTiles, " YTiles:", gMap.numYTiles );
    }

    // Get the layer in question
    var groundLayer = gMap.currentMap.layers[0];

    // Create the layer
    CreateLayer(groundLayer);


}