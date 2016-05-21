$(document).ready(function(){
    var map = L.map('mapDiv', { zoomControl: true, scrollWheelZoom: false, attributionControl: false}).setView([40, 100], 4);

    // var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    //     subdomains: 'abcd',
    //     maxZoom: 19
    // }).addTo(map);

    // var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    //     subdomains: 'abcd',
    //     maxZoom: 19
    // }).addTo(map);   
    
    var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {}).addTo(map);    
});