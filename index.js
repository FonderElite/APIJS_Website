
const video = document.getElementById("video");
let predictedAges = [];
date_now = new Date();
day_now = date_now.getDay();
/*
File
Gender model:"C:\Users\Master(G)\Desktop\Projects\Projects(2)\Face-Detection\models\age_gender_model-shard1"
Face expression:"C:\Users\Master(G)\Desktop\Projects\Projects(2)\Face-Detection\models\face_expression_model-shard1"
FaceLandmark:"C:\Users\Master(G)\Desktop\Projects\Projects(2)\Face-Detection\models\face_landmark_68_model-shard1"
Face-Recognition"C:\Users\Master(G)\Desktop\Projects\Projects(2)\Face-Detection\models\face_recognition_model-shard1"

==================================================================================================

Json Manifest
*/
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models")
]).then(startVideo);

function startVideo() {
 let  cam = navigator.getUserMedia(
    { video: {} },
    stream => (video.srcObject = stream),
    err => console.error(err),
  );

}
video.addEventListener("playing", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    const age = resizedDetections[0].age;
    const interpolatedAge = interpolateAgePredictions(age);
    const bottomRight = {
      x: resizedDetections[0].detection.box.bottomRight.x - 50,
      y: resizedDetections[0].detection.box.bottomRight.y
    };

    new faceapi.draw.DrawTextField(
      [`${faceapi.utils.round(interpolatedAge, 0)} years`],
      bottomRight
    ).draw(canvas);
  }, 100);
});

function interpolateAgePredictions(age) {
  predictedAges = [age].concat(predictedAges).slice(0, 30);
  const avgPredictedAge =
    predictedAges.reduce((total, a) => total + a) / predictedAges.length;
  return avgPredictedAge;
}
let daisy = $('#container').daisyjs();
daisy.daisyjs({
  dotColor: '#ffffff',
    lineColor: '#ff0000'
})

$(document).ready(function(){
  $("#h1logo").on("click", function(){
    const ul = $('ul');
    ul.css({
      color: 'white',
      backgroundColor: 'black'
    });
    ul.show(1500);
    })
  
})

//Weather api
//url: https://aerisweather1.p.rapidapi.com/observations/usa/?rapidapi-key={apikey}
const apikey = '';
const api_url =`https://aerisweather1.p.rapidapi.com/observations/usa/?rapidapi-key=${apikey}`;

async function jsonData(){
  const response = await fetch(api_url);
  const data = await response.json();
  const stringed = JSON.stringify(data);
  let parsed = JSON.parse(stringed);
  parsed = [];
  const parsed1 = [... new Set(parsed)];
  for(i = 0; i<parsed.length; i++){
   const sort =  parsed1.sort();
   // let concat = parsed.concat(data);
    return sort;
  }
  console.log(data.response.loc);
  console.log(parsed1);
}
jsonData();
const day = () =>{
  const time = new Date();
  let hr = time.getHours();
  let min = time.getMinutes();
  if(hr > 17 ||  hr < 6){
    $('#day').attr('src','https://64.media.tumblr.com/247dd86498d7178361550256d8cc9d77/tumblr_oszvdsqmIu1ucpx1qo1_640.gifv');
    const bg = $('#day').css({
backgroundColor:'black'
    });
  }
  else{
    $('#day').attr('src','https://thumbs.gfycat.com/IdenticalCorruptFluke-size_restricted.gif');
  }
}
day();

async function weatherApi(){
  const parsing = await fetch(api_url);
  const data_parsed = await parsing.json();
  let lat = data_parsed.response.loc.lat;
  let long = data_parsed.response.relativeTo.long;
  let country = data_parsed.response.place.country;
  let temp = [];
  let c = data_parsed.response.ob.tempC;
  let f = data_parsed.response.ob.tempF;
  let weather = data_parsed.response.ob.weather;
  let wind_speed = data_parsed.response.ob.windSpeedKPH;
  let humidity = data_parsed.response.ob.humidity;
  let wind_dir = data_parsed.response.ob.windDir;
  let icon = data_parsed.response.ob.icon;
  let dewpoint = data_parsed.response.ob.dewpointC;
 

  /*
    <li id="dewpoint"></li>
        <li id="winddir"></li>
        <li id="windspeed"></li>
        <li id="humidity"></li>
        </ul>
        <div id="geo">
          <h3 id="longtitude"></h3>
          <h3 id="latitude"></h3>
        </div>
        */
  $('#dewpoint').html(`Dewpoint: ${dewpoint}`);
  $('#winddir').html(`Wind-Direction: ${wind_dir}`);
  $('#windspeed').html(`Wind-Speed: ${wind_speed}`);
  $('#humidity').html(`Humidity: ${humidity}`);
  $('#longtitude').html(`Longtitude: ${long}`);
  $('#latitude').html(`Latitude: ${lat}`);
  $('#weather').html(`Weather: ${weather}`);
 
  console.log(weather);
  let celsiush1 =  $('#c1').html(`${c}C*`);
  const icon_bg = $('#iconbg');
  icon_bg.css({
    border: '1px solid white'
  });

  if(weather.includes("Cloudy")){
    let temper = $('#temperature').attr('src','https://cdn1.iconfinder.com/data/icons/healthcare-research/512/temperature_low-512.png');
    const cloudycloud = $('#cloud').attr('src','https://nevercenter.com/pixelmash/imgs/clouds.gif');
    cloudycloud.css({
      width: '45%',
      height:'30%',
      posititon:'absolute',
      top:'5%'
    })
    $('#iconbg').css({
background:'url("")'
    });

  }
  else if(weather.includes("Rainy")){
 $('#temperature').attr('src','');
  const rainycloud = $('#cloud').attr('src','https://thumbs.gfycat.com/GlossyImpishFrilledlizard-max-1mb.gif');
  rainycloud.css({
      width: '45%',
      height:'30%',
      posititon:'absolute',
      top:'5%'
    })
   
    $('#iconbg').css({
background:'url("")'
    });
  }
  else if(weather.includes("Sunny")){
   $('#temperature').attr('src','https://icon-library.com/images/thermometer-icon-png/thermometer-icon-png-13.jpg');
   const sunnycloud =  $('#cloud').attr('src','https://thumbs.gfycat.com/RapidDimEider-max-1mb.gif');
 // const sunnycloud =  $('#cloud').attr('src',' https://media1.giphy.com/media/XzvMZODa3rgQN9TDWn/source.gif')
    $('#iconbg').css({
background:'url("")'
    });
    sunnycloud.css({

    })
  }
else if(weather.includes("Snowy")){
  $('#temperature').attr('src','https://cdn2.iconfinder.com/data/icons/coloured-weather-icon-set-svg/100/Coloured_Weather_Icon_Set_by_ViconsDesign-13-512.png');
 const snowycloud = $('#cloud').attr('src','https://thumbs.gfycat.com/WealthyInferiorBlackwidowspider-max-1mb.gif');
  $('#iconbg').css({
background:'url("")'
  });
  snowycloud.css({

  })
}
else if(weather.includes("Windy")){
  $('#temperature').attr('src','https://icon-library.com/images/thermometer-icon-png/thermometer-icon-png-16.jpg');
  const windycloud = $('#cloud').attr('src','https://media1.giphy.com/media/XzvMZODa3rgQN9TDWn/source.gif');
  $('#iconbg').css({
background:'url("")'
});
windycloud.css({

})
}

else{
  $('#temperature').attr('src','https://cdn.iconscout.com/icon/premium/png-256-thumb/cyber-security-5-501240.png');
 const elsecloud =  $('#cloud').attr('src','https://cdn2.iconfinder.com/data/icons/hacker-and-security-vol-1/64/Icons_Hacker_1_Filled_Line_Cloud_computing-Bug-Phishing-Confidential_Data-Hacker-Virus-Malware-512.png');
  $('#iconbg').css({
background:'url("")'
})
elsecloud.css({
  
});

}

}
weatherApi();



async function user_profile(){
  const set1 = new Set();
  gh_url = 'https://api.github.com/users/fonderelite';
  const request = await fetch(gh_url);
  let response = await request.json();
   response0 = [response].sort();
   response1 = new Map();
  responsee =  response1.set(response);
   response2 = [...new Set(responsee)]
  console.log(response0[0]);
}
user_profile();
async function changeToF(){
  const url1 = 'https://aerisweather1.p.rapidapi.com/observations/usa/?rapidapi-key=f8f0476130mshfba1f16141398adp1b595ejsn37ef36cda11a';
  const fetch1 = await fetch(url1)
  let respond1 = await fetch1.json();
  let stringified1 = JSON.stringify(respond1);
  const fahr = respond1.response.ob.tempF;
  respond1 = new Map();
 let ob_arr = [respond1]
 ob_arr = new Map();
  respond3 = [...new Set(ob_arr)].sort();
  $('#c1').html(`${fahr}F`);
  Object.keys(stringified1).map(function(key, index) {
   // myObject[key] *= 2;
  return stringified1[key,index]
  });
  console.log(respond3)


}
let numbers = ["#316476","#2B77B1","#29883A","#A55E18","#8E1A32","8E1A32","#3C146B"];
const random_number = () => (Math.random() * numbers.length);
let colorfuls = Math.round(random_number());
switch(colorfuls){
  case 0:
  $('#location').css({
    backgroundColor:numbers[0]
  })
  break;
  case 1:
  $('#location').css({
    backgroundColor:numbers[1]
  })
  break;
  case 2:
  $('#location').css({
    backgroundColor:numbers[2]
  })
  break;
  case 3:
  $('#location').css({
    backgroundColor:numbers[3]
  })
  break;
   case 4:
   $('#location').css({
    backgroundColor:numbers[4]
  })
   break;
   case 5:
   $('#location').css({
    backgroundColor:numbers[5]
  })
  case 6:
  $('#location').css({
   backgroundColor:numbers[6]
 })
} 
  
  let cyber = "Rest";
let cyberday = $('#cyberday').html(`Day: ${cyber} Day`);
  switch(day_now){
case 0:
 cyberday = $('#cyberday').html(`Day: ${cyber} Day`);
break;
case 5:
 cyberday = $('#cyberday').html(`Day: ${cyber} Day`);
 break;
 case 6:
 cyberday = $('#cyberday').html(`Day: ${cyber} Day`);
 break;
 default:
 cyberday = $('#cyberday').html(`Day: Work Day`);
  }

/*
for (const [key, value] of Object.entries(ob_arr)) {
  console.log(`${key}: ${value}`);
}
*/




//Cloud for mobile
async function callFunction(){
  const parsingweather = await fetch(api_url);
  const parsedweather = await parsingweather.json();
  let mobileWeather = parsedweather.response.ob.weather;
  if(mobileWeather.includes("Cloudy")){
    const cloudycloud = $('#mobilecloud').attr('src','https://nevercenter.com/pixelmash/imgs/clouds.gif');
    cloudycloud.css({
      width: '45%',
      height:'49%',
      position:'absolute',
      top:'10%',
      left: '25%',
      zIndex: '2',

    })

  }
  else if(mobileWeather.includes("Rainy")){
  const rainycloud = $('#mobilecloud').attr('src','https://thumbs.gfycat.com/GlossyImpishFrilledlizard-max-1mb.gif');
  rainycloud.css({
    width: '45%',
    height:'45%',
    position:'absolute',
    top:'10%',
    left: '25%',
    zIndex: '2',
    })
  }
  else if(mobileWeather.includes("Sunny")){
   const sunnycloud =  $('#mobilecloud').attr('src','https://thumbs.gfycat.com/RapidDimEider-max-1mb.gif');
 // const sunnycloud =  $('#cloud').attr('src',' https://media1.giphy.com/media/XzvMZODa3rgQN9TDWn/source.gif')
  
    sunnycloud.css({
      width: '45%',
      height:'45%',
      position:'absolute',
      top:'10%',
      left: '25%',
      zIndex: '2',
    })
  }
else if(mobileWeather.includes("Snowy")){
 const snowycloud = $('#mobilecloud').attr('src','https://thumbs.gfycat.com/WealthyInferiorBlackwidowspider-max-1mb.gif');
  snowycloud.css({
    width: '45%',
    height:'45%',
    position:'absolute',
    top:'10%',
    left: '25%',
    zIndex: '2',
  })
}
else if(mobileWeather.includes("Windy")){
  const windycloud = $('#mobilecloud').attr('src','https://media1.giphy.com/media/XzvMZODa3rgQN9TDWn/source.gif');

windycloud.css({
  width: '45%',
  height:'45%',
  position:'absolute',
  top:'10%',
  left: '25%',
  zIndex: '2',
})
}

else{
 const elsecloud =  $('#mobilecloud').attr('src','https://cdn2.iconfinder.com/data/icons/hacker-and-security-vol-1/64/Icons_Hacker_1_Filled_Line_Cloud_computing-Bug-Phishing-Confidential_Data-Hacker-Virus-Malware-512.png');
elsecloud.css({
  width: '45%',
  height:'45%',
  position:'absolute',
  top:'10%',
  left: '25%',
  zIndex: '2',
});
}
}
callFunction();

local_data = {
    
  "username": "FonderElite",
  "name": "FonderElite",
  "honor": 301,
  "clan": "NetHunters",
  "leaderboardPosition": 112980,
  "skills": [
  "JavaScript",
  "Python",
  "C++"
  ],
  "ranks": {
  "overall": {
  "rank": -5,
  "name": "5 kyu",
  "color": "yellow",
  "score": 270
  },
  "languages": {
  "javascript": {
  "rank": -6,
  "name": "6 kyu",
  "color": "yellow",
  "score": 154
  },
  "python": {
  "rank": -6,
  "name": "6 kyu",
  "color": "yellow",
  "score": 116
  }
  }
  },
  "codeChallenges": {
  "totalAuthored": 0,
  "totalCompleted": 42
  }
}
const code_wars = () =>{
let js = local_data.skills[0];
let py = local_data.skills[1];
let cpp = local_data.skills[2];
jstxt = $('#jsskill').html(js);
pytxt = $('#pyskill').html(py);
cpptxt = $('#cppskill').html(cpp);
console.log(local_data);
let honor = (local_data.honor);
let clan = (local_data.clan);
let completed = (local_data.codeChallenges.totalCompleted);
let leaderboard = (local_data.leaderboardPosition);
let place = $('#leaderboard').html(`LeaderBoard: #${leaderboard}`);
let honors = $('#honor').html(`Honors: ${honor}`);
let completes = $('#completed').html(`Total Challenges: ${completed}`);
let cclan = $('#clan').html(`Clan-Name: ${clan}`);
cclan.css({
  position:'absolute',
  top: '425%',
  backgroundColor: 'rgb(37, 35, 35)',
  border:'1px solid white',
  zIndex:'1',
  fontSize:'3vh'
})
completes.css({
  zIndex:'1',
  fontSize:'3vh',
  position:'absolute',
  top: '385%'
})
honors.css({
  zIndex:'1',
  fontSize:'3vh',
  position:'absolute',
  top: '330%'
})

place.css({
  position:'absolute',
  top:'298%',
  zIndex:'1',
  backgroundColor:'rgb(41, 39, 39)',
  border:'1px solid white'
})

if(jstxt){
 let jspix =  $('#jspix').attr('src','https://skillgrey.com/wp-content/uploads/2020/03/nodejstransparent.png');
 jspix.css({
   position:'absolute',
   top:'230%',
    left: '4%',
    height: '50%',
    width: '20%',
    zIndex:'1'
 })
}
if(pytxt){
 let pypic =  $('#pypic').attr('src','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png');
  pypic.css({
    position:'absolute',
    top:'230%',
    left: '40%',
    height: '50%',
    width: '20%',
    zIndex:'1'
  })
}
if(cpptxt){
  let cpppic = $('#cpppic').attr('src','https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png');
  cpppic.css({
    position:'absolute',
    top:'230%',
    left: '70%',
    height: '50%',
    width: '20%',
    zIndex:'1'
  })
 
}
}
//test 
for(i = 0; i == 0; i++){
setTimeout(code_wars,1000);
}


async function cWarsProfile(){
  /*Local Json*/
  
  
  const fetch_data = await fetch(local_data);
let data_fetched =  fetch_data.json();
console.log(local_data);
  /*
  ==>[Cors Error Api Request]<==

  const urlget = "https://www.codewars.com/api/v1/users/000Zer000";
 let fetching = await fetch(urlget);
 let fetchedjson = await fetching.json();
 console.log(JSON.stringify(fetchedjson));
 const xhr = new XMLHttpRequest();
const url  =  urlget;
xhr.open('GET', url);
xhr.onreadystatechange = someHandler;
let request = xhr.send();
console.log(request);
*/
}
cWarsProfile();
