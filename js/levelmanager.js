/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 24.4.2013
 * Time: 15:16
 * To change this template use File | Settings | File Templates.
 */


// ----------------------------------------------------------------------- //
// This function is called from CreateLevel() function
// ----------------------------------------------------------------------- //
// Creates the given layer
function CreateLayer(layer) {

    // Get the tile data of the layer
    var layerData = layer["data"];


    // Set the starting location for the loop in question
    var xLocation = 0;
    var yLocation = 0;

    // Loop through all the tiles in this layer
    for(var tileNumber=0; tileNumber<gMap.numXTiles*gMap.numYTiles; tileNumber++) {


        // If this is the collision layer
        if(layer.name == "Collision") {

            // And tilenumber is the correct collision type
            if(layerData[tileNumber] == CONSTANTS.COLLISION_TILE_NUMBER) {
                // Create body

                // Create the tiledata
                var tileData = {
                    tileName: tileNumber,
                    tileType: layerData[tileNumber]
                };

                // TODO: Only draws tiles with physics bodies - requires fixing!!!!
                // Create the physics platform
                CreatePlatform(xLocation, yLocation, tileData);
            }
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


// ------------------------------------------------------------------ //
// This function is called from ParseMapJSON at the end of loading
// ------------------------------------------------------------------ //
// Creates the level
function CreateLevel() {

    WriteLog("Creating the level");
    WriteLog("Xtiles:", gMap.numXTiles, " YTiles:", gMap.numYTiles);

    // Loop through all the layers
    for(var i=0; i<gMap.currentMap.layers.length; i++) {

        // If the layer name is collision
        if(gMap.currentMap.layers[i].name == "Collision") {
            // Create the collision layer
            var collisionLayer = gMap.currentMap.layers[1];


            // Create collision layer
            CreateLayer(collisionLayer);
        }
    }


    // And finally set the level loaded to true
    gMap.levelLoaded = true;


}