var myMap;
var lyrOSM;
var mrkCurrentLocation;
var popMinarEPakistan;
var ctlPan;
var ctlZoomslider;
var ctlMousePosition;
var ctlMeasure;


$(document).ready(function () {
    // create map object
    myMap = L.map('map_div',  {center:[31.59261, 74.31008], zoom:13
        , zoomControl:false });

    //popup Minar e Pakistan
    popMinarEPakistan = L.popup();
    popMinarEPakistan.setLatLng([31.59248,74.30966]);
    popMinarEPakistan.setContent("<h2>Minar e Pakistan</h2>" +
        "<img src='img/minar-e-pakistan.jpg'  width='300px'/>");

    //myMap.openPopup(popMinarEPakistan);
    //popMinarEPakistan.openOn(myMap);

    // plugins
    ctlPan = L.control.pan().addTo(myMap);
    ctlZoomslider = L.control.zoomslider({position:'topright'}).addTo(myMap);

    ctlMousePosition = L.control.mousePosition().addTo(myMap);
    ctlMeasure =L.control.polylineMeasure().addTo(myMap);


    //add basemap layer
    lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    myMap.addLayer(lyrOSM);

    // event handler and anonymous functions
    // myMap.on('click',function (e) {
    //
    //     alert(e.latlng.toString());
    //     alert(myMap.getZoom());
    //
    // });

    // right click
    myMap.on('contextmenu',function (e) {

        L.marker(e.latlng).addTo(myMap).bindPopup(e.latlng.toString());

    });



    //call method location
    myMap.on('keypress',function (e) {
        if(e.originalEvent.key = 'l'){
            myMap.locate();
        }

    });

    //create circle if location found
    myMap.on('locationfound',function (e) {
        if(mrkCurrentLocation){
            mrkCurrentLocation.remove();
        }
        mrkCurrentLocation = L.circleMarker(e.latlng).addTo(myMap);
        //mrkCurrentLocation = L.circle(e.latlng, {radius:e.accuracy/4}).addTo(myMap);
        myMap.setView(e.latlng, 18);
    });

    //call method location
    myMap.on('locationerror', function(e) {
        console.log(e);
        alert("Location was not found");
    });

    //get user location on button click
    $('#get_location_id').click(function () {
        myMap.locate();
    });

    // go to specific location
    $('#go_to_location').click(function () {
        myMap.setView([31.59248,74.30966], 18);
        myMap.openPopup(popMinarEPakistan);
    });

    // get map zoom level
    myMap.on('zoomend', function () {
        $('#zoom_level_id').html(myMap.getZoom());
    });

    // get map zoom level
    myMap.on('moveend', function (e) {
        $('#map_center_id').html(latLngToString(myMap.getCenter()));
    });

    // get mouse location
    myMap.on('mousemove',function (e) {

        $('#mouse_location_id').html(latLngToString(e.latlng));

    });

    //custom functions
    function latLngToString(ll) {
        return "["+ll.lat.toFixed(5)+","+ll.lng.toFixed(5)+"]";
    }
});
