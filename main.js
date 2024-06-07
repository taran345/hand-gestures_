prediction_1="";


Webcam.set({
height:300,
width:350,
image_format:"png",
png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version:", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/uWJK_TOv4/model.json" , modelLoaded);
function modelLoaded(){
    console.log("model is loaded");
}
function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img , gotResult)
}
function gotResult(error , results){
if (error){
    console.log(error);
} else {
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML=results[0].label;
    prediction_1=results[0].label;
    speak()
    if (results[0].label=="amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076";
        }
        if(results[0].label=="victory")
        {
         document.getElementById("update_emoji").innerHTML = "&#x270C;";
        }
        if(results[0].label=="best")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
}


}