function drawWorld(world, context) {
    // Draw all joints in the joint list
    for (var jointList = world.m_jointList; jointList; jointList = jointList.m_next) {
        drawJoint(jointList, context);
    }

    // Draw all bodies (shapes)
    for (var body = world.m_bodyList; body; body = body.m_next) {
        // Get all the shapes of the bodies
        for (var shape = body.GetShapeList(); shape != null; shape = shape.GetNext()) {
            if (DEBUG) {
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
                    drawShape(shape, context);
                    // And then just return
                    continue;
                }

                // Draw the shape to the marked location
                gMap.drawTile(context, shape.GetUserData()._x, shape.GetUserData()._y);


	            //gMap.draw(context);

            }


        }
    }
}

function drawStuff(shape, context){


    // Get the TileType of the tile in question
    if(shape.GetUserData().getTileType() == 154) {

        var myImage = new Image();
        myImage.src = "images/square.jpeg";

        //var posX = shape.m_position.x;
        //var posY = shape.m_position.y;

        var posX = shape.GetUserData()._x;
        var posY = shape.GetUserData()._y;

        //console.log("Drawing the tile at (", posX, ",", posY, ")");

        // Draw the image to the x,y location
        context.drawImage(myImage, posX, posY);

    }
    else if(shape.GetUserData().getTileType() == "player")
    {
        drawShape(shape, context);
    }



} // end of drawStuff()

function drawJoint(joint, context) {
    var b1 = joint.m_body1;
    var b2 = joint.m_body2;
    var x1 = b1.m_position;
    var x2 = b2.m_position;
    var p1 = joint.GetAnchor1();
    var p2 = joint.GetAnchor2();
    context.strokeStyle = '#00eeee';
    context.beginPath();
    switch (joint.m_type) {
        case b2Joint.e_distanceJoint:
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            break;

        case b2Joint.e_pulleyJoint:
            // TODO
            break;

        default:
            if (b1 == world.m_groundBody) {
                context.moveTo(p1.x, p1.y);
                context.lineTo(x2.x, x2.y);
            }
            else if (b2 == world.m_groundBody) {
                context.moveTo(p1.x, p1.y);
                context.lineTo(x1.x, x1.y);
            }
            else {
                context.moveTo(x1.x, x1.y);
                context.lineTo(p1.x, p1.y);
                context.lineTo(x2.x, x2.y);
                context.lineTo(p2.x, p2.y);
            }
            break;
    }
    context.stroke();
}
function drawShape(shape, context) {
    context.strokeStyle = '#000000';
    context.beginPath();
    switch (shape.m_type) {
        case b2Shape.e_circleShape:
        {
            var circle = shape;
            var pos = circle.m_position;
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;
            // draw circle
            context.moveTo(pos.x + r, pos.y);
            for (var i = 0; i < segments; i++) {
                var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
                var v = b2Math.AddVV(pos, d);
                context.lineTo(v.x, v.y);
                theta += dtheta;
            }
            context.lineTo(pos.x + r, pos.y);

            // draw radius
            context.moveTo(pos.x, pos.y);
            var ax = circle.m_R.col1;
            var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
            context.lineTo(pos2.x, pos2.y);
        }
            break;
        case b2Shape.e_polyShape:
        {
            var poly = shape;
            var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            context.moveTo(tV.x, tV.y);
            for (var i = 0; i < poly.m_vertexCount; i++) {
                var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                context.lineTo(v.x, v.y);
            }

            context.lineTo(tV.x, tV.y);
        }
            break;
    }

    drawDebugBox(100, 100, 0);

    // Draw debug box around mouse click
    drawDebugBox(mouseX, mouseY, 20);

    context.stroke();
}


function drawDebugBox(x, y, size) {
    context.moveTo(x-size,y-size);

    context.lineTo(x-size, y+TILE_HEIGHT+size);
    context.lineTo(x+TILE_WIDTH+size, y+TILE_HEIGHT+size);
    context.lineTo(x+TILE_WIDTH+size, y-size);

    context.lineTo(x-size,y-size);
}

/*
function createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);
    var gravity = new b2Vec2(0, 300);
    var doSleep = true;
    var world = new b2World(worldAABB, gravity, doSleep);
    return world;
}
*/

function createGround(world) {
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(1000, 50);
    groundSd.restitution = 0.2;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(-500, 340);
    return world.CreateBody(groundBd)
}

function createBall(world, x, y) {
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = 20;
    ballSd.restitution = 1.0;
    ballSd.friction = 0;
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.position.Set(x,y);
    return world.CreateBody(ballBd);
}

/*
function createBox(world, x, y, width, height, fixed, userData) {
    if (typeof(fixed) == 'undefined') fixed = true;
    var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 1.0;

    boxSd.userData = userData;

    boxSd.extents.Set(width, height);
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    return world.CreateBody(boxBd)
} */