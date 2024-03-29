status="";
mirror_img = "";
objects = [];
function setup(){
    canvas = createCanvas(640,420);
    canvas.position(315,200);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload(){
    mirror_img = loadImage("mirror.png");
}
function draw(){
    image(mirror_img, 0, 0, 640, 350);
    if(status != "") 
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x-800, objects[i].y - 175); //+ 15,
            noFill();
            stroke("#FF0000");
            rect(objects[i].x - 800, objects[i].y - 175, objects[i].width, objects[i].height);
        }
    }
    /*fill("#FF0000");
    text("Dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);

    fill("#FF0000");
    text("Cat",320,120);
    noFill();
    stroke("#FF0000");
    rect(300,90,270,320);*/
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(mirror_img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
console.log(results);
objects = results;
}