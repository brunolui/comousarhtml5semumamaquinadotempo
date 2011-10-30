function success(position) {
  var s = document.querySelector('#status');

  if (s.className == 'success') {
    // not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
    return;
  }

  s.innerHTML = "te achei!";
  s.className = 'success';

  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcanvas';
  mapcanvas.style.width = '900px';
  mapcanvas.style.height = '700px';

  document.getElementById('geo').appendChild(mapcanvas);

  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

  var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"Você está aqui!"
  });
}

function error(msg) {
  var s = document.querySelector('#status');
  s.innerHTML = typeof msg == 'string' ? msg : "falhou =/";
  s.className = 'fail';

  // console.log(arguments);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error('Não há suporte.');
}
