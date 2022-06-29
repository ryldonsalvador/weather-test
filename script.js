
function mySearch() {
  var cityID = document.getElementById("cityID").value;
  // console.log(cityID);

  weatherBalloon(cityID);

}

function weatherBalloon( cityID ) {
  var key = 'aa47ed22f59d85790bac334cd475e6e5';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&units=metric&appid=' + key)
  .then(function(resp) { 

    return resp.json() 
  }) // Convert data to json
  .then(function(data) {
    console.log(data)
    drawWeather(data); // Call drawWeather
  })
  .catch(function() {
    // catch any errors
  });
}

function drawWeather( d ) {
  var celcius = Math.round(parseFloat(d.main.temp));
  // var celcius = Math.round(parseFloat(d.main.temp)-273.15);
  // var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  var description = d.weather[0].description;

  // console.log(celcius)
  
  document.getElementById('description').innerHTML = description;
  document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('location').innerHTML = d.name;

  var w = document.getElementById('weather');
  
  if( description.indexOf('rain') > 0 ) {
    w.className = 'rainy';
  } else if( description.indexOf('cloud') > 0 ) {
    w.className = 'cloudy';
  } else if( description.indexOf('sunny') > 0 ) {
    w.className = 'sunny';
  }
}



window.onload = function() {
  // weatherBalloon( 1730737 );
  
  setTimeout(function(){
    callInit();  
  },300);
}


// 5128581 - New York 
// 6167865 - Toronto
// 5368361 - Los Angeles

function callInit(){
  // var getIP = 'http://ip-api.com/json/';
  // $.getJSON(getIP).done(function(location) {
  //     console.log(location)
  // })

  // var getIP = 'http://ip-api.com/json/';
  // var openWeatherMap = 'https://api.openweathermap.org/data/2.5/weather'
  // $.getJSON(getIP).done(function(location) {
  //     $.getJSON(openWeatherMap, {
  //         lat: location.lat,
  //         lon: location.lon,
  //         units: 'metric',
  //         appid: 'aa47ed22f59d85790bac334cd475e6e5'
  //     }).done(function(weather) {
  //         console.log(weather)
  //         weatherOutput(weather);
  //     })
  // })


  // var openWeatherMap = 'https://api.openweathermap.org/data/2.5/weather'
  // if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //         $.getJSON(openWeatherMap, {
  //             lat: position.coords.latitude,
  //             lon: position.coords.longitude,
  //             units: 'metric',
  //             appid: 'aa47ed22f59d85790bac334cd475e6e5'
  //         }).done(function(weather) {
  //             console.log(weather)
  //             weatherOutput(weather);
  //         })
  //     })
  // }
  var lat;
  var lon;

  $.getJSON("https://ip-api.io/json/",
    function(result) {
        console.log(result);
        console.log(result.latitude);
        console.log(result.longitude);
        lat = result.latitude;
        lon = result.longitude;


        var key = 'aa47ed22f59d85790bac334cd475e6e5';
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + key)
        .then(function(resp) { 
          return resp.json() 
        }) // Convert data to json
        .then(function(data) {
          weatherOutput(data); // Call weatherOutput
        })
        .catch(function() {
          // catch any errors
        });
    });
}

function weatherOutput (d){
  document.getElementsByClassName('hide')[0].style.display = 'inline-block';
  document.getElementsByClassName('hide')[1].style.display = 'inline-block';

  var description = d.weather[0].description;
  var celcius = Math.round(parseFloat(d.main.temp));
  // console.log(description)

  document.getElementById('description').innerHTML = description;
  document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('location').innerHTML = d.name;


  var w = document.getElementById('weather');
  
  if( description.indexOf('rain') > 0 ) {
    w.className = 'rainy';
  } else if( description.indexOf('cloud') > 0 ) {
    w.className = 'cloudy';
  } else if( description.indexOf('sunny') > 0 ) {
    w.className = 'sunny';
  }
}
