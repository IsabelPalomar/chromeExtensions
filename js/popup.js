var current_tab;
var longUrl;

/**
 * Gets the current url using the chrome tabs properties
 * Call the function that make the request to the urlShortener API
 */
function init(){
    chrome.tabs.getSelected(null, function(tab)
    {
        current_tab = tab;
        longUrl = current_tab.url;    
        if(typeof (gapi.client) == "undefined"){
            init();
        }
        else{
            gapi.client.setApiKey('AIzaSyBMRhaMZeKPsccmsx0RZtkp1T8fUOjm52c');
            gapi.client.load('urlshortener', 'v1', makeRequest);
        }
    });
}

/**
 * Get the shortUrl 
 */             
function makeRequest() {
    var request = gapi.client.urlshortener.url.insert({ 
        'resource': {'longUrl': longUrl} 
    }); 
    request.execute(function(response) {
        if(typeof response.id == "undefined"){
            document.getElementById("shortUrl").innerHTML = 'http://goo.gl/aFY6P';
        }
        else{
            document.getElementById("shortUrl").innerHTML = response.id;            
        }                 
    });
}

/**
 * Call the init function when the page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();  
});
