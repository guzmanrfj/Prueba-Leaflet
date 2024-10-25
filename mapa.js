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
