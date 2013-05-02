/**
 * Created with JetBrains WebStorm.
 * User: parkkila
 * Date: 2.5.2013
 * Time: 10:03
 * To change this template use File | Settings | File Templates.
 */

RenderEngine = Class.create({

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

    setup: function(){
        // Configure all neccessary stuff here




        // Get the canvas
        this.canvas = $("game");

        console.log(this.canvas);

        // Get the context
        this.context = $('game').getContext('2d');
        // Get the game canvas element
        var canvasElement = $('game');

        console.log(canvasElement);

        // TODO: FIX THE ELEMENTS TO BE LOADED CORRECTLY!!!!!
        // Set the size for the canvas according to level settings
        //canvasElement.width = level1["width"] * level1["tilewidth"];
        //canvasElement.height = level1["height"] * level1["tileheight"];

        canvasElement.width = 20 * 32;
        canvasElement.height = 20 * 32;

        console.log(canvasElement);

        // Get the values of canvas size
        this.canvas.width = parseInt(canvasElement.width);
        this.canvas.height = parseInt(canvasElement.height);
        this.canvas.top = parseInt(canvasElement.style.top);
        this.canvas.left = parseInt(canvasElement.style.left);


        console.log("canvasWidth:",this.canvas.width, " canvasHeight:", this.canvas.height);


        // Add the event listeners
        // Add the event listeners for buttons
        window.addEventListener('keydown',handleKeyDown,true);
        window.addEventListener('keyup',handleKeyUp,true);
        window.addEventListener("mousedown", handleMouseDown, true);
    },

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

//gRenderEngine = new RenderEngine();