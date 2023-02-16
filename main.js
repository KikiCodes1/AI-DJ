song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreL = 0;
scoreR = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on("pose", gotPoses);
}

function ModelLoaded(){
    console.log("PoseNet has been initialized!");
}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#fabb28");
    stroke("#fabb28");

    if(scoreR > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY >0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY >100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Sped = 1x";
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY >300 && rightWristY <=400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY >400 && rightWristY <=500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreL > 0.2){

    circle(leftWristX, leftWristY, 20);
    N = Number(leftWristY);
    N1 = floor(N);
    volume = N1/500;
    document.getElementById("volume").innerHTML = "Volume = " +volume;
    song.setVolume(volume);
}
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("leftWristX = " +leftWristX+"leftWristY = "+leftWristY);
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    scoreL = results[0].pose.keypoints[9].score;
    console.log("score of left wrist = " +scoreL);
    scoreR = results[0].pose.keypoints[10].score;
    console.log("scoreof right wrist = " +scoreR);
    }
}