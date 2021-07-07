var socket = io("http://localhost:3000");



var check = 1;
var langv = "en";
var txt =new SpeechSynthesisUtterance();
let send_greating = async ()=>{
  let time = new Date().getHours();
  // console.log('time : ' ,time);
  let great ;
  if (time >= 12 && time <= 18) {
    great = "good morning";
  }else if (time >= 18) {
    great = "good evening";
  }
  else if (time < 12) {
    great = "good morning";
  }
  
    txt.text = `${great} ! boss ,I am jk.may i help you.please tell ..`;
   window.speechSynthesis.speak(txt)
}

var getquatsinhindi =async ()=>{

    let data = await fetch("./hindiquats.json");
    let raldat =await data.json();
    console.log(raldat[0].a);
    
    let spk =new SpeechSynthesisUtterance();
    spk.text = raldat[0].a + "  ,,,,, " + "ताली तो बजाओ इतना अच्छा बोली ";
    spk.lang = "hi";
    speechSynthesis.speak(spk);
  
}
var getweather = async () => {

  let deta = await fetch('http://api.weatherapi.com/v1/forecast.json?key=df709197525c49c78ac154801211806&q=kharora&days=3&aqi=yes&alerts=yes&lang=hi');
  let weatherinfo = await deta.json();

  console.log(weatherinfo.forecast.forecastday[0]);
  let speakw  = new SpeechSynthesisUtterance();
let txt ="आज   !" + weatherinfo.forecast.forecastday[0].day.condition.text + " की संभावना है";
txt = txt + "!!!!    आज अधिकतम तापमान "+weatherinfo.forecast.forecastday[0].day.maxtemp_c + " डिग्री सेल्सियस और न्यूनतम तापमान " +weatherinfo.forecast.forecastday[0].day.mintemp_c + " होगा ";
// for (const key in object) {
//   if (Object.hasOwnProperty.call(object, key)) {
//     const element = object[key];
    
//   }
// }
speakw.text = txt;
speakw.lang = "hi";
speechSynthesis.speak(speakw);

}

var realdata;
const getstatus = async () => {
  let deta = await fetch('./ashu.json');
   realdata = await deta.json();
//  console.log(realdata);
};
getstatus();
console.log('realdat :' + realdata);



function playnews(real){
let full = "" ;
  console.log(real);
  for (let index = 0; index < real.length; index++) {
    let element = real[index];
    console.log(element.title);
 full = full + element.title + " .||| \n \t,,,,,!";
    // document.querySelector("img").
    
    
  }
  console.log(full);
  
};






// https://newsapi.org/v2/everything?q=india&language=hi&from=2021-07-06&apiKey=13c5061cd9fd46458ae6410a24c9aef0
//  start code here
function check_str(data){
  if ((data.indexOf("make a search") >-1)) {
    data = data.replace("make a search" , "").trim();
    console.log(data);
    location.href = "https://www.google.com/search?q="+data;
    
  }
  if ((data.indexOf("news") >-1)) {
    let ashu = async ()=>{
      try {
        
        let data =await fetch(" https://newsapi.org/v2/everything?q=india&language=hi&from=2021-07-06&apiKey=13c5061cd9fd46458ae6410a24c9aef0        ")
        let reald = await data.json();
        // console.log(reald.articles);
        playnews(reald.articles);
      } catch (error) {
        console.log(error);
        
      }
    }
    ashu();
  }
  if((data.indexOf("search") >-1)){
    socket.emit('wiki_search' , data.replace('search' , ""))
    console.log('en searching...');
    
  }
  {realdata.forEach( (element)=> {
    
    if (data.indexOf(element.q) >= 0) {
      console.log(element);
       let node = new SpeechSynthesisUtterance(element.a);
       node.lang = langv;
       speechSynthesis.speak(node);
    }
    
    

    
  });}



console.log(data);
if( langv == "hi"){

{
  var text;
  if (data.indexOf("गूगल खोलो") >-1) {
    
    txt.text = "Opening google";
    speechSynthesis.speak(txt)
    location.href = "https://www.google.com/";
  }
  else if ((data.indexOf("मौसम") >-1||data.indexOf("माहौल") >-1)  &&data.indexOf("आज") >-1   ) {
    
   getweather();
  }

  else if(((data.indexOf("अच्छी बातें") >-1 || data.indexOf("काम आने") >-1 ) &&data.indexOf("बताओ") >-1 ) || data.indexOf("सुविचार") >-1 || data.indexOf("अनमोल वचन") >-1) {
 getquatsinhindi();
  }

  else if((data.indexOf("के बारे में बताओ") >-1)){
    socket.emit('wiki_search' , data.replace('के बारे में बताओ' , ""))
  }
  else if((data.indexOf("जोक") >-1) || (data.indexOf("चुटकुला") >-1) || (data.indexOf("मजेदार") >-1) || (data.indexOf("मजेदार") >-1)  ){
    async function  ashu() {
     let realdat = await fetch("./jokes.json");
     let dat = await realdat.json();
    
     let jock =new SpeechSynthesisUtterance();
     jock.text = dat[1];
     jock.lang = "hi";
     speechSynthesis.speak(jock);
     
   }
   ashu();
  }
  else if ((data.indexOf("इसे बंद करो") >-1)) {
    check = 0;
    recognition.stop();
  }
}
}






else if(langv == "en"){
  console.log('ok');
  console.log(data);
  // send_greating();
  // if((data.indexOf("search") >-1)){
  //   socket.emit('wiki_search' , data.replace('search' , ""))
  //   console.log('en searching...');
    
  // }
  if (data.indexOf("add this question") > -1) {
    console.log('ok');
    
  }
}





}





if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = 0;
    // recognition.interimResults = true;
    recognition.lang = langv;
    recognition.onstart = function() { console.log("start");}
    recognition.onresult = function(event) { check_str(event.results[0][0].transcript)}
    recognition.onerror = function(event) {console.log(event); check = 0;}
    recognition.onend = function(){ console.log("onend"); 
    if (check) {
      recognition.start();
    }
 }
}

function startapp(){
  check =1;
  recognition.start();
}
function stopapp(){
  check = 0;
  recognition.stop();

}

console.log('end');

document.querySelector("h1").addEventListener("click" , function (params) {
  console.log('ji ha');
  
});



socket.on('serch_result' , intro=>{
  console.log(intro);
  let txt = new SpeechSynthesisUtterance();
  txt.text = intro;
  txt.pitch = 1;
  txt.rate =1;
  check = 0;
  txt.lang = "en";


  speechSynthesis.speak(txt);
  
});