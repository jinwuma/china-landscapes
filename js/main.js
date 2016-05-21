
$(document).ready(function(){
    var map = L.map('mapDiv', { zoomControl: true, scrollWheelZoom: true, attributionControl: false}).setView([40, 100], 4);
    var pointsLayer;
    
    // var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    //     subdomains: 'abcd',
    //     maxZoom: 19
    // }).addTo(map);

    var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);   
    
    // var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {}).addTo(map);       
    
    var pointMarkerOptions = {
        radius: 4,
        fillColor: "#247BA0",
        color: "white",
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.3
    };
    
    var pointMarkersHighlightOptions = {
        radius: 8,
        fillColor: "#247BA0",
        color: "white",
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.9
    };    
    
    var pointMarkerHighlightOptions = {
        radius: 8,
        fillColor: "#F4A261",
        color: "white",
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.9
    };    
    
    $.getJSON( "./data/attractions.json", function( data ) {
        
        var tableData = {};
        var tableHeaders = [];
        var tableRows = [];
        var tableCellHeight =($('#tableWrapper').height() - 8)/8;
        data.features.forEach(function(d){
            if(!tableData[d.properties.Category_English]){
                tableData[d.properties.Category_English] = [];
            } 
            
            tableData[d.properties.Category_English].push(d.properties);
        });

        $.each(tableData, function(key, value){
            // console.log(key, value);
            tableHeaders.push('<th height="'+tableCellHeight+'" width="12.5%" class="'+value[0].Category_English+'">'+value[0].Category+'</th>');
            
            for(var i = 0, len = value.length; i < len; i++){
                if(!tableRows[i]){
                    tableRows[i] = [];
                }
                tableRows[i].push('<td height="'+tableCellHeight+'" width="12.5%" class="'+value[i].Category_English+'" id="'+value[i].UniqueID+'">'+value[i].ChineseName+'</td>');
            }
        });
        
        //populate table head
        $('#attractionsTable > tbody:last-child').append('<tr>' + tableHeaders.join('') + '</tr>');       
        
        //populate table rows
        tableRows.forEach(function(d){
            $('#attractionsTable > tbody:last-child').append('<tr>' + d.join('') + '</tr>');     
        });
        
        $('#attractionsTable td').hover(function(){
            var pointCategory = $(this).attr('class');
            var pointID = this.id;
            highlightPointFeature(pointCategory, pointID);
        });       
        
        $('#attractionsTable td').on('click', function(){
            console.log(this.id);
        });
        
        $('#tableWrapper').on('mouseout', function(){
            highlightPointFeature();
        });        
        
        var highlightPointFeature =  function(category, id){
            pointsLayer.eachLayer(function(layer){
                if (layer.feature.properties.Category_English == category && layer.feature.properties.UniqueID !== id) {
                    layer.setStyle(pointMarkersHighlightOptions);
                } 
                else if (layer.feature.properties.UniqueID == id) {
                    layer.setStyle(pointMarkerHighlightOptions);
                }
                else {
                    layer.setStyle(pointMarkerOptions);
                }
            });
        }          
        
        //add points to map
        pointsLayer = L.geoJson(data,{
            // onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, pointMarkerOptions);
            }
        }).addTo(map);        
    }); 
 
});