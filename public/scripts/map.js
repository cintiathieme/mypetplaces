let map, center;
function startMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center,
        });
        new google.maps.Marker({
          position: center,
          map: map,
          title: "I'm here",
        });
      },
      function () {
        // If something goes wrong
        console.log("Error in the geolocation service.");
      }
    );
  } else {
    // Browser says: Nah! I do not support this.
    console.log("Browser does not support geolocation.");
  }  
}
startMap();