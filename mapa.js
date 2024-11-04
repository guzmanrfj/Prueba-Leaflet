let map = L.map('Mapa').setView([20.677522170309935, -103.34692535828518],12)

L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  document.getElementById('select-location').addEventListener('change',function(e){
    let coords = e.target.value.split(",");
    map.flyTo(coords,18);
  })

//Agregar mapa base del MiniMap

var carto_light = L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
// Agregar plugin MiniMap
  var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(map);

// Agregar escala
 new L.control.scale({imperial: false}).addTo(map);

 

// var reposeptJS = L.geoJson(reposept,{
//     onEachFeature: popup
// }).addTo(map);

 // Agregar coordenadas para dibujar una linea

 var coord_camino =[
  [20.6715363, -103.3443838],
  [20.6720759, -103.3455962],
  [20.6723795, -103.3463606],
  [20.6732328, -103.3464035],
  [20.6736242, -103.3464303],
  [20.6736142, -103.3474066],
  [20.673564, -103.3491608 ],
  [20.6734737, -103.3546647],
  [20.6748991, -103.3546647]
];

var camino = L.polyline(coord_camino,{
  color: 'blue'  
}).addTo(map);

// Agregar un marcador

var marker_oficina = L.circleMarker(L.latLng(20.671651572197057, -103.34414647353464),{
  radius: 20,
  fillcolor: '#ff0000',
  color: 'green',
  weight: 2,
  opacity:1,
  fillOpacity: .5,
}).addTo(map);

// Configurar Popup
function popup(feature,layer){
  if(feature.properties && feature.properties.Folio){
    layer.bindPopup("<strong>Número de Folio: </strong>" + feature.properties.Folio + "<br/>" + "<strong>Estatus Reporte: </strong>" + feature.properties.Estatus + "<br/>" + "<strong>Colonia: </strong>" + feature.properties.nombre + "<br/>" + "<strong>Cantidad de Reportes en la Colonia: </strong>" + feature.properties.Conteoxcol);
  }
}

// Define un nuevo icono personalizado
const customIcon = L.icon({
  iconUrl: 'Iconos\Lum.png',  // Ruta del icono
  iconSize: [12, 12],                // Tamaño del icono
  iconAnchor: [12, 41],              // Punto de anclaje (el "puntero" del icono)
  popupAnchor: [0, -41]              // Punto de anclaje para el popup
});

 //Agregar capa en formato GeoJson
 var reposept = L.geoJson(reposept, {
  pointToLayer: function(feature, latLng){
    return L.marker(latLng,{icon:customIcon});
  },
  onEachFeature: popup
  }).addTo(map);
//L.geoJson(reposept).addTo(map);

// Agregar leyenda

const legend = L.control.Legend({
  position:'bottomright',
  collapsed: false,
  symbolWidth:24,
  opacity:1,
  column:1,
  legends:[
    {
      label:'Coordinación',
      type: 'circle',
      radius: 6,
      fillcolor: '#ff0000',
      color: 'green',
      weight: 2,
      layers: marker_oficina,
      inactive: false,
  },{
      label:'Coordinación Camino',
      type: 'polyline',
      fillcolor: 'blue',
      color: 'blue',
      weight: 2,
      layers: camino,
      inactive: false,
   },{
    label: 'Reportes',
    type: "image",
    url: "Iconos\Lum.png",
    // radius: 6,
    // fillcolor: '#ffcc00', // Color para luminarias
    // color: 'black',
    // weight: 1,
    layers: reposept, // Aquí usamos reposeptJS para luminarias
    inactive: false,
   }]
}).addTo(map);


 

