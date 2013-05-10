﻿///////////////////////////////////////////////////////////////////////////////////////
//                           Variables
//////////////////////////////////////////////////////////////////////////////////////


var c = document.getElementById("RTS_BG");
var ctx = c.getContext("2d");

//Canvas size
var Canvas = {
    Height: c.height,
    Width: c.width
};

//Game Variables
var intervalID;
var FPS = 30;
var isGameActive = false;
var isPaused = false;
var groundHeight = 50;

var leftTeamMoney = 50;
var rightTeamMoney = 50;
var leftTeamExp = 0;
var rightTeamExp = 0;


//////////////////////////////////////////////////////////////////////////////////
//                           Pre-Init
/////////////////////////////////////////////////////////////////////////////////

//CREATE SPRITES AND INVOKE PREINIT AS FIRST METHOD
var rightType = {
    speed:  5,
    direction: -1,
    health: 10,
    damage: 5,
	cost: 10,
    team: 'right'

};
var leftType = {
    speed:  5,
    direction: 1,
    health: 10,
    damage: 5,
	cost: 10,
    team: 'left'

};

var robotSprite = new Image();
robotSprite.src = 'robot.png';
var robotSprite2 = new Image();
robotSprite2.src = 'robot2.png';
var leftBase = new Image();
leftBase.src = 'base-left.png'
var rightBase = new Image();
rightBase.src = 'base-right.png'

var bro = new Image();
bro.src = 'bro.png';
var unitCount = 0;

var leftTeamUnits = [];
var rightTeamUnits = [];

preinit();

function preinit() {



    //Draw bottom pit
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, Canvas.Width, Canvas.Height);

    ctx.fillStyle = "#00FF00";
    ctx.fillRect(0, Canvas.Height - groundHeight, Canvas.Width, Canvas.Height);
	
	ctx.drawImage(bro, 0, 200);
}


///////////////////////////////////////////////////////////////////////////////////
//                    Start Up Game
///////////////////////////////////////////////////////////////////////////////////
function startGame() {
    isGameActive = true;
        intervalID = setInterval(gameLoop, 1000 / FPS);
}

function gameLoop() {
    draw2();
    
}

function draw2() {

    //Clear Screen
    ctx.clearRect(0, 0, Canvas.Width, Canvas.Height);

    //Draw bottom pit
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, Canvas.Width, Canvas.Height);

    ctx.fillStyle = "#00FF00";
    ctx.fillRect(0, Canvas.Height - groundHeight, Canvas.Width, Canvas.Height);
	
	//Place left base on screen
	ctx.drawImage(leftBase, -100, 260);
	//Place right base on screen
	ctx.drawImage(rightBase, 730, 260);
	

    for(i = 0;  i < leftTeamUnits.length; i++)
    {
        leftTeamUnits[i].draw(ctx);
    }
    
    for (i = 0; i < rightTeamUnits.length; i++) {
        rightTeamUnits[i].draw(ctx);
    }

    var max = _.max(leftTeamUnits, function (ltu) { return ltu.x; });
    var min = _.min(rightTeamUnits, function (rtu) { return rtu.x; });
    //Draw Score and lives
    ctx.font = "20pt Arial";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(max.x + "," + min.x, 0, 0);
	
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Money: " + leftTeamMoney, 0, 30);
	
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Money: " + rightTeamMoney, 660, 30);
	
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Experience: " + leftTeamExp, 0, 60);
	
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Experience: " + rightTeamExp, 620, 60);
	
	
    if (isPaused) {
        ctx.fillText("Game Paused. Press 'p' to resume.", 50, 200);
        clearInterval(intervalID);
    }
}

