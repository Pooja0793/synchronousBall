var ball,database;
var position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();  //function of firebase to connect to database
    console.log(database);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //This is how we read the database
    var ballPosition = database.ref('ball/position');
    console.log(ballPosition);

   // ballPosition.on("value",readPosition,showError);
    ballPosition.on("value",function(data){
        position = data.val();
        console.log(position);
        ball.x = position.x;
        ball.y = position.y;},
        function(error){
            console.log("Error:"+error.code);}
    );


}

function draw(){
    background("white");
   if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x + x,
        'y' : position.y + y
    });
}
