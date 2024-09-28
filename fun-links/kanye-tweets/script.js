document.getElementById("button").addEventListener("click", function(event) {
  event.preventDefault();
  
  const url = "https://api.kanye.rest";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {	
      console.log(json)
      
    let results = "";

    results += '<div class="container">'
    results += '<img src="kanye-tweet-small2.jpg" alt="Kanye tweet" class="center1">'
	  results += '<div class="centered"><p>'+ json.quote + '</p></div>';
      
      results += "</div>" 

      document.getElementById("newHtml").innerHTML = results;
    });
});

function change() {
    document.getElementById("button").value="Click for another!";
}
