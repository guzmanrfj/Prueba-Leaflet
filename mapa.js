let map = L.map('Mapa').setView([20.677522170309935, -103.34692535828518],12)

L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  document.getElementById('select-location').addEventListener('change',function(e){
    let coords = e.target.value.split(",");
    map.flyTo(coords,17);
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
  radius: 10,
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
  iconUrl: 'Iconos/redflag.png',  // Ruta del icono
  iconSize: [24, 24],                // Tamaño del icono
  iconAnchor: [12, 41],              // Punto de anclaje (el "puntero" del icono)
  popupAnchor: [0, -41]              // Punto de anclaje para el popup
});

 //Agregar capa en formato GeoJson septiembre
 var reposept = L.geoJson(reposept, {
  pointToLayer: function(feature, latLng){
    return L.marker(latLng,{icon:customIcon});
  },
  onEachFeature: popup
  }).addTo(map);


// cargando capa puntos octubre
// Asegurémonos de que heatData está definido y tiene características
if (repooct && repooct.features && Array.isArray(repooct.features)) {
  // Extraemos los puntos de calor
  var heatPoints = repooct.features.map(feature => {
      // Aseguramos que el objeto `geometry` y `coordinates` existen y son válidos
      if (feature.geometry && feature.geometry.coordinates && feature.geometry.coordinates.length === 2) {
          var coordinates = feature.geometry.coordinates;
          var intensity = feature.properties && feature.properties.intensity ? feature.properties.intensity : 1.0;
          return [coordinates[1], coordinates[0], intensity];  // Latitud, Longitud, Intensidad
      }
  }).filter(Boolean);  // Filtramos cualquier punto que haya fallado

  // Crea la capa de calor
  var heatLayer = L.heatLayer(heatPoints, {
      radius: 30,  // Ajusta el radio del calor
      blur: 45,    // Ajusta el nivel de desenfoque
      maxZoom: 17,  // Máximo nivel de zoom donde aparecerá el efecto
      gradient:{0.00:'#fff5f0', 0.11:'#fee0d2', 0.22:'#fcbba1', 0.33:'#fc9272', 0.44:'#fb6a4a', 0.55:'#ef3b2c', 0.66:'#cb181d', 0.77:'#a50f15',1:'#67000d'}
  }).addTo(map);
} else {
  console.error("El formato de heatData es incorrecto o no contiene 'features'");
}
// Cargar Puntos Octubre
//icono personalizado 
var circleIcon = L.divIcon({
  className:'custom-circle-icon',
  iconSize: [3,3],
  iconAnchor:[5,5]
});

var repooctd = L.geoJson(repooct, {
  pointToLayer: function(feature, latLng){
    return L.marker(latLng,{
      icon:circleIcon});
  },
  onEachFeature: popup
  }).addTo(map);
  console.log(repooct);





//   var puntosCalor = repooct.heatLayer.features.map(feature => {
//   var coordinates = feature.geometry.coordinates;
//   var intensity = feature.properties.intensity || 1.0; // Usa intensidad, o 1 si no está especificado
//   return [coordinates[1], coordinates[0], intensity];  // Latitud, Longitud, Intensidad
// });

// // Crea el mapa de calor
// var heatLayer = L.heatLayer(puntosCalor, {
//   radius: 25,  // Ajusta el radio del calor
//   blur: 15,    // Ajusta el nivel de desenfoque
//   maxZoom: 17  // Máximo nivel de zoom donde aparecerá el efecto
// }).addTo(map);

// fetch('Layers/repooct.js')  // Reemplaza con la ruta de tu archivo GeoJSON
//     .then(response => response.json())
//     .then(data => {
//         // Extrae los puntos de datos del GeoJSON para el mapa de calor
//         var heatData = data.features.map(feature => {
//             var coordinates = feature.geometry.coordinates;
//             var intensity = feature.properties.intensity || 1.0; // Intensity opcional
//             return [coordinates[1], coordinates[0], intensity];  // Latitud, Longitud, Intensidad
//         });

//         // Crear el mapa de calor
//         var heatLayer = L.heatLayer(heatData, {
//             radius: 25,  // Ajusta el radio del calor
//             blur: 15,    // Ajusta el nivel de desenfoque
//             maxZoom: 17  // Máximo nivel de zoom donde aparecerá el efecto
//         }).addTo(map);
//       })
//       .catch(error => console.error('Error al cargar el archivo GeoJSON:', error));


//Agregar Limite Municipal

// if (limitemu.features && limitemu.features.length > 0) {
//   const feature = limitemu.features[0]; // Usamos solo el primer feature para la prueba

//   if (feature.geometry.type === "MultiPolygon") {
//     feature.geometry.coordinates.forEach((polygon, polyIndex) => {
//       if (polygon[0]) {
//         // Convertimos las coordenadas para Leaflet [lat, lon]
//         const coordinates = polygon[0].map(coord => [coord[1], coord[0]]);
        
//         console.log(`Coordenadas del polígono ${polyIndex}:`, coordinates); // Verifica las coordenadas

//         // Agrega el polígono al mapa
//         L.polygon(coordinates, {
//           color: 'blue',
//           weight: 2,
//           fillOpacity: 0.3,
//         }).addTo(map);
//       }
//     });
//   } else {
//     console.warn("El primer feature no es un MultiPolygon.");
//   }
// } else {
//   console.warn("limitemu está vacío o no tiene features.");
// }
const limites = limitemu.features[0];
limites.geometry.coordinates.forEach((polygon, polyIndex) => {
        (polygon[0]);
        // Convertimos las coordenadas para Leaflet [lat, lon]
        const coordinates = polygon[0].map(coord => [coord[1], coord[0]]);
        
        // Agrega el polígono al mapa
        L.polygon(coordinates, {
          color: 'blue',
          weight: 2,
          fillOpacity: 0,
        }).addTo(map);
      
    });
   



  
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
      fill: true,
      fillcolor: 'green',
      fillOpacity:.5,
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
    url: "Iconos/redflag.png",
    // radius: 6,
    // fillcolor: '#ffcc00', // Color para luminarias
    // color: 'black',
    // weight: 1,
    layers: reposept, // Aquí usamos reposeptJS para Reportes
    inactive: false,
   },{
    label: 'Reportes Octubre',
    type: "circle",
    radius: 6,

    stroke: true,
    fill: true,
    fillColor: 'yellow',
    color: '#000000',
    weight: 2,
    layers: repooctd, // Aquí usamos reposeptJS para Reportes
    inactive: false,
   }]
}).addTo(map);


 

