video= "";
status= "";
textt="";
objects= [];

function setup(){
    canvas= createCanvas(480, 380)
    canvas.center()
    video= createCapture(VIDEO)
    video.hide()
}

function draw(){
    image(video, 0, 0, 480, 380)
    if(status != ""){
        objectDetector.detect(video, gotResult);

for(i=0 ; i< objects.length; i++){
    document.getElementById("status").innerHTML= "Status: Objects Detected"
    document.getElementById("number_of_objects").innerHTML= "Number of objects detected = " + objects.length;

    fill("violet")
    percent= floor(objects[i].confidence * 100)
    text(objects[i].label + "" + percent + "%", objects[i].x + 15 , objects[i].y + 15)
    noFill()
    stroke("violet")
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

    if(objects[i].label == textt){
        video.stop()
        objectsDetector.detect(gotResult)
        document.getElementById("status").innerHTML= textt + " found";
        synth= window.speechSynthesis;
        utterThis= new SpeechSynthesisUtterance(textt + " found")
        synth.speak(utterThis)
    }
    else{
document.getElementById("status").innerHTML= textt + " not found"
    }
    
}

    }
}

function gotResult(error, result){
if(error){
    console.log(error)
}
console.log(result)
objects= result;
}


function start(){
    objectDetector= ml5.objectDetector('cocossd', modeLoaded)
    document.getElementById("status").innerHTML= "Status: Detecting Objects"
    textt= document.getElementById("input_box").value;
}

function modeLoaded(){
    console.log("Model Loaded!")
    status= true;
}