img = "";
statuss = "";
object = [];

function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.position(525,150);
    video = createCapture(VIDEO);
    video.hide();

    objectDetecter = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status:The computer is identifing the objects in image.";
}
function draw(){
    image(video,0,0,400,400);

    if(statuss != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetecter.detect(video,gotresult);
        for(s = 0;s < object.length;s++){
            document.getElementById("status").innerHTML = "Status:The computer has successfully detected the objects in the image."
            document.getElementById("no_of_objects").innerHTML = "The computer has reconized only "+object.length+" objects which are in front of webcam";
            fill(r,g,b);
            confidence_of_objects = floor(object[s].confidence*100);
            x = floor(object[s].x);
            y = floor(object[s].y);
            height = floor(object[s].height);
            width = floor(object[s].width);
            text(object[s].label+" "+confidence_of_objects+"%"+" X ="+x+" Y ="+y+" "+width+"px "+height+"px ",object[s].x,object[s].y);
            noFill();
            stroke(r,g,b);
            rect(object[s].x,object[s].y,object[s].width,object[s].height);
        }
    }
   
}
function modelloaded(){
    console.log("Model is Successfully Loaded");
    statuss = true;
    objectDetecter.detect(video,gotresult);
}
function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log("Got The Results:"+results);
        object = results;
    }
}