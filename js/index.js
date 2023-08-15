//! -------------------- Global Varibels ----------------


const searchInput = document.getElementById('searchInput');
const rowData =document.getElementById('rowData');
const navigateToContactSection =document.getElementById('navigateToContactSection');
const subscribeBtn = document.getElementById('subscribeBtn')

let data ;
let userCity;

//! -------------------- Events -------------------------

searchInput.addEventListener('input', function(){

 country = searchInput.value ;
  getApiData(country)
    
})


navigateToContactSection.addEventListener('click',function(){

  window.location = "./contact.html"
})

subscribeBtn.addEventListener('click', function(){
  
  window.location = "./contact.html"
})


//!  -------------------- Functions  ----------------------

 async function getApiData(country){
    let https = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2c66500dd8c4433081d214719231008&q=${country}&days=3`);
    let response = await https.json();
    data = response ;
    console.log(data.forecast.forecastday[1].day.condition.text)

  
     displayData();
     await getWeekDay()
     await getCurrentDayMonth()
     
     
}


getApiData('cairo')

function displayData(){

 let cols = `
 
 
 <div class=" forcastContainer col-md-4">
    
 <div class="forcast card ">
   <div class="weatherDate card-header  d-flex justify-content-between">
     <h5 id='weekday'></h5>
     <span  id='dayMonth'>11 August</span>
   </div>
   <div id="today" class="weatherDetails card-body">
     <h5 class="countery">${data.location.name}</h5>
     <p class="degree text-center display-1 fw-bolder"> ${data.current.temp_c}<sup>o</sup> C <span><img src='${data.current.condition.icon}'></span></p>
     <p class="text-info">${data.current.condition.text}</p>
     <div class="mt-5">
       <span class="me-3"><i class="fa-solid fa-umbrella me-2"></i>20%</span>
       <span class="me-3"><i class="fa-solid fa-wind me-2"></i>18km/h</span>
       <span><i class="fa-solid fa-compass me-2"></i>East</span>
     </div>
   
   </div>
 </div>
</div>

<div class=" forcastContainer col-md-4 text-center">

 <div class="forcast card ">
   <div class="weatherDate card-header">
     <h5 id='secondDay' ></h5>
   </div>
   <div id="nextDay" class="weatherDetails card-body">
    <span><img src='${data.forecast.forecastday[1].day.condition.icon}'></span>
     <p class="degree text-center display-5"> ${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup> C <span><i class="fa-regular fa-moon display-6 ms-5"></i></span>  </p>
     <p>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
     <p class="text-info"> ${data.forecast.forecastday[1].day.condition.text}</p>
   
   
   </div>
 </div>
</div>

<div class=" forcastContainer col-md-4 text-center">

 <div class="forcast card ">
   <div class="weatherDate card-header">
     <h5 id='thirdDay'></h5>
   </div>
   <div id="lastDay" class="weatherDetails card-body">
    <span><img src='${data.forecast.forecastday[2].day.condition.icon}'></span>
     <p class="degree text-center display-5"> ${data.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup> C <span><i class="fa-regular fa-moon display-6 ms-5"></i></span>  </p>
     <p>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
     <p class="text-info">${data.forecast.forecastday[2].day.condition.text}</p>
   
   
   </div>
 </div>
</div>
  
 
 `

 rowData.innerHTML = cols

}


 async function getWeekDay(){
  
  let date = new Date(`${data.current.last_updated}`);
  let day = date.getDay();
  
 
  let weekDay = new Array ( 'Sunday' ,'Monday' , 'Tuesday', 'Wednesday', 'Thursday' , 'Friday' ,'Saturday' )
  document.getElementById('weekday').innerHTML = weekDay[day];
  document.getElementById('secondDay').innerHTML =  weekDay[day+1] ;
  document.getElementById('thirdDay').innerHTML = weekDay[day+2]

}

async function getCurrentDayMonth(){


  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth()

  const months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December');
  
  document.getElementById('dayMonth').innerHTML =`${day} ${months[month]}`


}


  async function getLocation() {
        
        var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client"

        navigator.geolocation.getCurrentPosition(
            (position) => {
                bdcApi = bdcApi
                    + "?latitude=" + position.coords.latitude
                    + "&longitude=" + position.coords.longitude
                    + "&localityLanguage=en";
                getApi(bdcApi);

            },
            (err) => { getApi(bdcApi); },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });

            async function getApi(bdcApi) {
              let https = await fetch(`${bdcApi}`);
              let response = await https.json();
              let dataobjects =response;
              city = dataobjects.city  
              console.log(city)      // return Giza         
            
    }
  }
getLocation()


  

 
  
    

    
  
