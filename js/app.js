function initMap() {
  let map;
  let myPosition = { lat: 0, lng: 0 };
  let $input = document.getElementById('input');
  let $output = document.getElementById('output');

  //  Autocompletado
  new google.maps.places.Autocomplete($input);
  new google.maps.places.Autocomplete($output);

  //  Direccciones
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;


  document.getElementById('find').addEventListener('click', findMe);

  //  Mapa de inicio
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPosition,
    zoom: 2
  });

  function findMe() {
    let success = ({ coords }) => {
      myPosition = { lat: coords.latitude, lng: coords.longitude };
      let image = 'assets/images/placeholder.png';
      let marker = new google.maps.Marker({
        position: myPosition,
        map,
        icon: image
      });
      map.setZoom(18);
      map.setCenter(myPosition);
      $input.value = `${coords.latitude}, ${coords.longitude}`;

    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  }
  //  Imprimir ruta
  let trackRoute = () => {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    map = new google.maps.Map(document.getElementById('map')); 0
    directionsDisplay.setMap(map);
  };

  document.getElementById('track').addEventListener('click', trackRoute);

  let calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
    directionsService.route({
      origin: $input.value,
      destination: $output.value,
      travelMode: 'DRIVING'
      
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        new google.maps.DirectionsRenderer({
          map: map,
          directions: response,
          suppressMarkers: true
        });
        new google.maps.DirectionsRenderer({
          map: map,
          directions: response,
          suppressMarkers: true
      });
      function makeMarker(position, icon, title, map) {
        new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
    }

    var icons = {
        start: new google.maps.MarkerImage(
        // URL
        'http://maps.google.com/mapfiles/ms/micons/blue.png',
        // (width,height)
        new google.maps.Size(44, 32),
        // The origin point (x,y)
        new google.maps.Point(0, 0),
        // The anchor point (x,y)
        new google.maps.Point(22, 32)),
        end: new google.maps.MarkerImage(
        // URL
        'http://maps.google.com/mapfiles/ms/micons/green.png',
        // (width,height)
        new google.maps.Size(44, 32),
        // The origin point (x,y)
        new google.maps.Point(0, 0),
        // The anchor point (x,y)
        new google.maps.Point(22, 32))
    };

      var leg = response.routes[0].legs[0];
      makeMarker(leg.start_location, icons.start, "title", map);
      makeMarker(leg.end_location, icons.end, 'title', map);

        console.log(response.routes[0].legs);
        console.log(response.routes[0].legs[0].distance.value);
        console.log(response.routes[0].legs[0].duration.value);
      } else {
        window.alert(status);
      }
    });
  }
  
}


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
// var parametros = {
//   "Authorization": "Token AMoq7Q9IQWiqRqFSCHKG11sBwBXsBiYbih-738Ei",
//   "Accept-Language": "en_US",
//   "Content-Type": "application/json",
// };
// $.ajax({
//   data: parametros, //datos que se envian a traves de ajax
//   url: 'https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075', //archivo que recibe la peticion
//   type: 'post', //método de envio
//   success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
//     console.log(response);
//   }
// });

// $.ajax({
//   url: "https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075",
//   beforeSend: function (xhrObj) {
//     xhrObj.setRequestHeader("Authorization", "Token AMoq7Q9IQWiqRqFSCHKG11sBwBXsBiYbih-738Ei");
//     xhrObj.setRequestHeader("Content-Type", "application/json");
//     xhrObj.setRequestHeader("Accept-Language", "en_US");
//   },
//   type: "GET",
//   crossDomain: true,
//   dataType: 'jsonp',
//   success: function (data) {
//     console.log(data)
//   }
// });

// var url = "https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075";
// var token = "AMoq7Q9IQWiqRqFSCHKG11sBwBXsBiYbih-738Ei";

// var parameters = {
//   "server_token": token,
// };

// // send Ajax request
// var res = XHR2.send("GET", url, {
//   parameters
// });

// // response
// response.success(res, "application/json");