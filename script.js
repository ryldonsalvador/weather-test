
function mySearch() {
  var cityID = document.getElementById("cityID").value;
  console.log(cityID);

  weatherBalloon(cityID);
}

function weatherBalloon( cityID ) {
  var key = 'aa47ed22f59d85790bac334cd475e6e5';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    drawWeather(data); // Call drawWeather
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

function drawWeather( d ) {
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);
  var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  var description = d.weather[0].description;

  console.log(description)
  
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
  weatherBalloon( 5128581 );
}




// 5128581 - New York 
// 6167865 - Toronto
// 5368361 - Los Angeles