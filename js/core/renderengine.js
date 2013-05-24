/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 2.5.2013
 * Time: 10:03
 * To change this template use File | Settings | File Templates.
 */

var RenderEngine = Class.create({

    canvas: null,
    context: null,
    lastMouse: {
        x:0,
        y:0
    },
    lastMouseCanvas: {
        x:0,
        y:0
    },



    initialize: function() {
          if(CONSTANTS.DEBUG) {
              console.log("Render engine initialized!");
          }


    },

    // -------------------------------------------------------------- //
    // Sets up the rendering engine
    setup: function(){
        // Configure all neccessary stuff here

        WriteLog("RenderEngine: Setup Started")

        // Get the canvas
        this.canvas = $("game");

        WriteLog("RenderEngine: Canvas Loaded:", this.canvas);

        // Get the context
        this.context = this.canvas.getContext('2d');


        this.canvas.width = 20 * 32;
        this.canvas.height = 20 * 32;

        // Get the values of canvas size
        this.canvas.top = parseInt(this.canvas.style.top);
        this.canvas.left = parseInt(this.canvas.style.left);


        WriteLog("RenderEngine: Canvas has been set up with the following values");
        WriteLog("RenderEngine: canvasWidth:", this.canvas.width, " canvasHeight:", this.canvas.height);


        WriteLog("RenderEngine: Setup Done!");

    },

    draw: function() {

        // Empty the context
        this.context.clearRect(0,0, gRenderEngine.canvas.width, gRenderEngine.canvas.height);

        // Draw the world
        this.DrawWorld();



    }, // End of draw()

    DrawWorld: function() {

       // get the world
        var world = gPhysicsEngine.world;
        var context = this.context;

        // Draw all joints in the joint list
        for (var jointList = world.m_jointList; jointList; jointList = jointList.m_next) {
            drawJoint(jointList, context);
        }

        // Draw all bodies (shapes)
        for (var body = world.m_bodyList; body; body = body.m_next) {
            // Get all the shapes of the bodies
            for (var shape = body.GetShapeList(); shape != null; shape = shape.GetNext()) {

                if (CONSTANTS.DEBUG) {
                    var variable = shape.GetUserData().getHidden();
                    // console.log("Drawing shape that is: " + variable);
                }

                // If the shape is not marked as hidden
                if (shape.GetUserData().getHidden() != true) {
                    // And Draw the shape
                    //drawShape(shape, context);
                    //drawStuff(shape,context);

                    //console.log("Shape Location", shape.GetUserData()._x, ",", shape.GetUserData()._y);

                    // If we are drawing the player
                    if(shape.GetUserData().getTileType() == "player") {
                        //drawShape(shape, context);

	                    player.draw(shape);

                        // And then just return
                        continue;
                    }
                    // if we are drawing a projectile
                    if(shape.GetUserData().getTileType() == "projectile") {



                        // TODO:: FIX THE DRAWING HERE!!
                        drawShape(shape, context);




                        // And then return
                        continue;
                    }

                    // Draw the shape to the marked location
                    gMap.drawTile(context, shape.GetUserData()._x, shape.GetUserData()._y);


                    //gMap.draw(context);

                }


            }
        } // End of for(draw bodies)



        // Get the game engine entities list
        // Draw the objects in the list
        for (var i=0; i<gGameEngine.entities.length; i++) {

            var entity = gGameEngine.entities[i];

            //console.log("ENTITY", entity)

           // if (entity.name != "player") {
           //     entity.draw();
           // }

            /*
            if (entity.name == "Projectile") {
                entity.draw();
            }
              */

            //console.log("ENTITY", entity);

        }




    }, // End of DrawWorld();

    getCanvasPosition: function (screenPosition) {

        //transfer position to world-space
        return {
            x: screenPosition.x - this.canvas.offsetLeft,
            y: screenPosition.y - this.canvas.offsetTop
        };
    },

    getScreenPosition: function(worldPosition) {
        return {
            x: -(gGameEngine.gMap.viewRect.x) + worldPosition.x,
            y: -(gGameEngine.gMap.viewRect.y) + worldPosition.y
        }
    },

    getWorldPosition: function (screenPosition) {
        var gMap = gGameEngine.gMap;

        //transfer position to world-space
        return {
            x: screenPosition.x + gMap.viewRect.x,
            y: screenPosition.y + gMap.viewRect.y
        };
    },

    getWorldMousePosition: function () {
        var gMap = gGameEngine.gMap;

        //transfer mouse position to world-space
        return {
            x: this.lastMouseCanvas.x + gMap.viewRect.x,
            y: this.lastMouseCanvas.y + gMap.viewRect.y
        };
    }

});

gRenderEngine = new RenderEngine();