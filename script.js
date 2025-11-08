mapboxgl.accessToken = 'pk.eyJ1Ijoia2JhZXRzbGUiLCJhIjoiY21oOXJsbmd3MWNlNDJtcHVmOTQyeGUwdyJ9.Oh7V4iWSURp2rPA-clH0Hw';
const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/kbaetsle/cmh9rq5hn00qp01smh7i69zfi',
        center: [-122.27, 37.8], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
      
    });


    

map.on('load', function() {
        // Add contour layer
       map.addSource('contours', {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-terrain-v2'
        });
        map.addLayer({
            'id': 'Contours',
            'type': 'line',
            'source': 'contours',
            'source-layer': 'contour',
            'layout': {
                // Make the layer visible by default.
                'visibility': 'visible',
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#877b59',
                'line-width': 2
            }
        });

    map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/cwilmott/c183-webmap/refs/heads/main/data/183-data.geojson'
    });

    map.addLayer({
        id: 'Landmarks',
        type: 'circle',
        source: 'points-data',
        paint: {
            'circle-color': '#d571cb',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });
    

    // Add click event for popups
    map.on('click', 'Landmarks', (e) => {
        // Copy coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // Create popup content using the actual data properties
        const popupContent = `
            <div>
                <h3>${properties.Landmark}</h3>
                <p><strong>Address:</strong> ${properties.Address}</p>
                <p><strong>Architect & Date:</strong> ${properties.Architect_Date}</p>
                <p><strong>Designated:</strong> ${properties.Designated}</p>
                ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
                ${properties.Notes ? `<p><strong>Notes:</strong> ${properties.Notes}</p>` : ''}
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    // Change cursor to pointer when hovering over points
    map.on('mouseenter', 'Landmarks', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'Landmarks', () => {
        map.getCanvas().style.cursor = '';
    });


        // VISIBILITY LAYERS ----------------------------------------------------------------

// Enumerate ids of the layers.
const toggleableLayerIds = ['Contours', 'Landmarks'];

// Set up the corresponding toggle button for each layer.
for (const id of toggleableLayerIds) {
    // Skip layers that already have a button set up.
    if (document.getElementById(id)) {
        continue;
    }

    // Create a link.
    const link = document.createElement('a');
    link.id = id;
    link.href = '#';
    link.textContent = id;
    link.className = 'active';

    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
        const clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        const visibility = map.getLayoutProperty(
            clickedLayer,
            'visibility'
        );

        // Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(
                clickedLayer,
                'visibility',
                'visible'
            );
        }
    };

    // Append the link to the menu 
    const menu = document.getElementById('menu');
    menu.appendChild(link);
} 

}); // This closes the map.on('load') function
