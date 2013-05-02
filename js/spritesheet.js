/**
 * Created with JetBrains WebStorm.
 * User: Japskua
 * Date: 28.4.2013
 * Time: 22:47
 * To change this template use File | Settings | File Templates.
 */

/*Copyright 2011 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 #limitations under the License.*/

ImageCache = {};

loadAtlasImage = function(imagename)
{
	if(ImageCache[imagename] != null)
		return ImageCache[imagename];
	var img = new Image();
	img.src = imagename;
	ImageCache[imagename] = img;
	return img;
};

SpriteSheetClass = Class.create({
	img: null,
	url:"",
	sprites: [],
	//-----------------------------------------
	init: function () {

        // Null the values so other instances don't use this
        this.img = null;
        this.url = "";
        this.sprites = [];

    },
	//-----------------------------------------
	load: function (imgName) {
        // Load the image
		this.img = loadAtlasImage(imgName); //new Image(imgName);
        // And store the image location
		this.url = imgName;
	},
	//-----------------------------------------
	defSprite: function (name, x, y, w, h, cx, cy) {

        // Create a sprite
        // name, x,y coordinates
        // width and height in the atlas
        // center coordinates for the sprite
        var spt = {
			"id": name,
			"x": x,
			"y": y,
			"w": w,
			"h": h,
			"cx": cx==null? 0 : cx,
			"cy": cy==null? 0 : cy
		};
        // Add to the list
		this.sprites.push(spt);
	},
	//-----------------------------------------
	getStats: function (name) {
        // Loop through all the sprites
		for (var i = 0; i < this.sprites.length; i++) {
            // And if the id of the sprite matches the name, return the sprite
			if (this.sprites[i].id == name) return this.sprites[i];
		}
		return null;
	}


});
//-----------------------------------------
SpriteSheetAnimClass = Class.create({
	_spriteSheet:null,
	_spriteNames:[],
	_currAnimIdx: 0,
	_fps:15,
	_animIncPerFrame:0.5,
	_paused:false,

    initialize: function() {
        this._spriteSheet = null;
        this._spriteNames = [];
        this._currAnimIdx = 0;
        this._fps = 15;
        this._animIncPerFrame = 0.5;
        this._paused = false;
    },

	//-----------------------------------------
	loadSheet: function(sheetName, spriteSheetURI)
	{
		this._spriteSheet = gSpriteSheets[sheetName];
		if(this._spriteSheet != null)
			return;

		var sheet = new SpriteSheetClass();
		sheet.load(spriteSheetURI);

		this._spriteSheet = sheet
		gSpriteSheets['grits_effects'] =sheet;

		this._spriteNames.length = 0;
		this._currAnimIdx = 0;
	},
	//-----------------------------------------
	pushFrame: function(spriteName)
	{
		this._spriteNames.push(spriteName);
	},
	//-----------------------------------------
	pause: function(onOff)
	{
		this._paused = onOff;
	},
	//-----------------------------------------
	getNumFrames: function()
	{
		return this._spriteNames.length;
	},
	//-----------------------------------------
	draw: function(posX, posY, settings)
	{
		if(this._spriteSheet == null) return;

		if(!this._paused)
			this._currAnimIdx +=  this._animIncPerFrame;

		var cIDX = Math.floor(this._currAnimIdx) % this._spriteNames.length;

		var spt = this._spriteSheet.getStats(this._spriteNames[cIDX]);
		if(spt == null)
			return;

		__drawSpriteInternal(spt,this._spriteSheet,posX,posY,settings);
	},
	//-----------------------------------------
	getCurrentFrameStats:function()
	{
		var cIDX = Math.floor(this._currAnimIdx) % this._spriteNames.length;
		return this._spriteSheet.getStats(this._spriteNames[cIDX]);
	}
});
//-----------------------------------------
function getSpriteNamesSimilarTo(nameValue)
{
	var d = new Array();
	for( sheetName in gSpriteSheets)
	{
		var sheet = gSpriteSheets[sheetName];
		for(var i =0; i < sheet.sprites.length; i++)
		{
			if(sheet.sprites[i].id.indexOf(nameValue) ==-1)
				continue;

			d.push(sheet.sprites[i].id);
		}
	}
	return d;
}

//-----------------------------------------
function drawSprite(spritename, posX, posY, settings)
{

    // Loop through all the sheets in the spritesheet list
	for(var sheetName in gSpriteSheets)
	{
        // Get the sheet
		var sheet = gSpriteSheets[sheetName];
        // Try to find if a sprite with "spritename" exists in the list
		var spt = sheet.getStats(spritename);
        // If there is no matching spritesheet
		if(spt == null)
        // Just continue searching
			continue;

        // If match found, draw the sprite
		__drawSpriteInternal(spt,sheet,posX,posY,settings);


		return;

	}

};

//-------
function __drawSpriteInternal(spt,sheet,posX,posY,settings)
{
    // Draw sprites
    // If the sprite or sheet are null, get out of here!
	if(spt == null || sheet == null)
		return;


    // Get the global map
	//var gMap = gGameEngine.gMap;
    // Holder for x & y values
	var hlf = {x: spt.cx , y: spt.cy};
	//var hlf = {x: spt.w * 0.5, y: spt.h * 0.5};


    // TODO: FIX THESE TO WORK EVENTUALLY
    /*
	var mapTrans = {x: gMap.viewRect.x, y: gMap.viewRect.y};
	var ctx = gRenderEngine.context;

    // Again, if settings exist
	if(settings)
	{
		if(settings.noMapTrans)
		{
			mapTrans.x = 0;
			mapTrans.y = 0;
		}
		if(settings.ctx)
		{
			ctx = settings.ctx;
		}

	}
    */
    var ctx = context;

    // If there are settings passed, handle things accordingly
	if(settings && settings.rotRadians != null)
	{
		ctx.save();
		var rotRadians = Math.PI + settings.rotRadians;

		ctx.translate(posX - mapTrans.x, posY - mapTrans.y);
		ctx.rotate(rotRadians); //rotate in origin


		ctx.drawImage(sheet.img,
			spt.x, spt.y,
			spt.w, spt.h,
			+hlf.x,
			+hlf.y,
			spt.w,
			spt.h);
		ctx.restore();


	}
    // Otherwsise, just draw
	else
	{
		ctx.drawImage(sheet.img,
			spt.x, spt.y,
			spt.w, spt.h,
            posX + hlf.x,
            posY + hlf.y,
			//(posX - mapTrans.x) + (hlf.x),
			//(posY - mapTrans.y) + (hlf.y),
			spt.w,
			spt.h);
	}

};
var gSpriteSheets = {};