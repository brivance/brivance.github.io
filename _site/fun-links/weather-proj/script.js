document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  
  
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial&APPID=2939435b063cee8a7379a1b21a385dc3";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {	
      
      
    let results = "";
    results += "<div class = 'today'>"
    
        results += '<div class = "weather-in-city">';
                results += '<h3>Weather in </h3>';
                results += '<div class = "city"><h1>' + json.name + '</h1></div>';
        results += '</div>'; //weather-in-city class and city class
    
        results += "<div class = 'today-title'><h3>Today</h3>";
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p> feels like: " + json.main.feels_like + ' &deg;F</p>';
        results += '</div>'; //today-title class
      
        results += "<div class = 'today-high'><p> high: " + json.main.temp_max + " &deg;F</p>";
            results += "<p> low: " + json.main.temp_min + " &deg;F</p>";
          
            results += "<p>"
              for (let i=0; i < json.weather.length; i++) {
        	      results += json.weather[i].description
        	      if (i !== json.weather.length - 1)
        	        results += ", "
              }
            results += "</p>";
          
            results += "<p> current wind speed: " + json.wind.speed + '</p>';
        results += '</div>'; //today-high class
    
    
        results += "<div class = 'today-icon'>"
            for (let i=0; i < json.weather.length; i++) {
        	   results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" width="150">';
            }
        results += "</div>"
        
    results += "</div>" //today class
    
      document.getElementById("weatherResults").innerHTML = results;
    });
    
    
  const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial&APPID=2939435b063cee8a7379a1b21a385dc3";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      // first, going to store the times for the rest of the day
      //then, going to start at the next spot and do the loop
      
      // let now = new Date();
      // let currentDate = now.getFullYear() + '-' + 
      //             ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
      //             ('0' + now.getDate()).slice(-2);
      
      let forecast = "";
      forecast += "<div class = 'weather-week'>"
      for (let i=0; i < json.list.length; i++) {
        if(i % 8 == 0) {
          if(i == 0) {
            forecast += "<div class = 'weather-day-" + i/8 + "'>"
          }
          else if(i == json.list.length - 1) {
            forecast += "</div>" //weather-day class
          }
          else {
            forecast += "</div>" //weather-day class
            forecast += "<div class = 'weather-day-" + i/8 + "'>"
          }
        }

        if(i % 8 == 0 && i != json.list.length - 1) {
    	    forecast += "<div class = 'date'><h3>" + moment(json.list[i].dt_txt).format('MMM Do') + "</h3></div>"; //date class
        }
        
        forecast += "<div class='weather-hour'>"; 
        forecast += "<div class='daily-time-temp'>";
        forecast += "<div class = 'daily-hour'><h3>" + moment(json.list[i].dt_txt).format('h a') + "</h3></div>";

  	    forecast += "<div class = 'daily-expected'><p> " + json.list[i].main.temp + " &deg;F</p></div></div>"; //daily-time-temp
  	    forecast += "<div class = 'icon-description'>"
  	    forecast += "<div class = 'daily-description'><p>" + json.list[i].weather[0].description + "</p></div>";
  	    forecast += '<div class = "daily-icon"><img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></div>'
  	    forecast += "</div></div>" //daily-time class, icon-description
      }
      
      forecast += "</div>" //weather-hour class
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});