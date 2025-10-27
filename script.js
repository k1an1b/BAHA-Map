mapboxgl.accessToken = 'pk.eyJ1Ijoia2JhZXRzbGUiLCJhIjoiY21oOXJsbmd3MWNlNDJtcHVmOTQyeGUwdyJ9.Oh7V4iWSURp2rPA-clH0Hw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/kbaetsle/cmh9rq5hn00qp01smh7i69zfi', // your Style URL goes here
  center: [-122.27, 37.87], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
    });