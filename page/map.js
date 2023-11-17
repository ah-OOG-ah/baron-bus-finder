// The map itself
var map = L.map('map').setView([40.375999747719256, -80.6215371314997], 17);

// Use OpenStreetMap's tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Set hall/bus stop markers
L.marker([40.37492021848427, -80.61539890312362]).addTo(map).bindPopup("Bl. Solanus Casey Hall");
L.marker([40.37413361572932, -80.61914875347286]).addTo(map).bindPopup("Sts. Vianney/Bonaventure Hall");
L.marker([40.376523084308474, -80.61992517430251]).addTo(map).bindPopup("Rosary Circle");
L.marker([40.3754026019317, -80.62578463268844]).addTo(map).bindPopup("St. Junipero Serra Hall");
L.marker([40.37586277667017, -80.62731848116141]).addTo(map).bindPopup("St. Agnes Hall");

// THE BÜS
var busIcon = L.icon({
    iconUrl:     './baron_bus1.png', // icon image
    iconSize:    [70.5, 42.5],       // size of the icon
    iconAnchor:  [22, 94],           // point of the icon which will correspond to marker's location
    popupAnchor: [15, -95]           // point from which the popup should open relative to the iconAnchor
});
var busMarker = L.marker([40.374162, -80.619249], {icon: busIcon}).addTo(map).bindPopup("I am the Baron Bus.");

// Make a callback to update the bus every 5 seconds
setInterval(updateBus, 5000);

async function updateBus() {
    let response = await fetch("./api");
    let latlng = await response.json();
    console.log(latlng);
    busMarker.setLatLng([latlng.lat, latlng.long]);
}