import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/Mapb.css'


mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FidWZwIiwiYSI6ImNsZ3dwcXN1djAwbmozZnBwZ2ttOHlva2IifQ.dfSkuFimQrAzUDDlNWSj5Q';



const Mapb = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-7);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FidWZwIiwiYSI6ImNsZ3dwcXN1djAwbmozZnBwZ2ttOHlva2IifQ.dfSkuFimQrAzUDDlNWSj5Q';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('style.load', () => {
      map.current.setFog({
        color: 'rgb(186, 210, 235)', // Lower atmosphere
        'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
        'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        'space-color': 'rgb(0, 0, 0)', // Background color
        'star-intensity': 0, // Background star brightness (default 0.35 at low zooms)
      });
    });

    return () => {
      map.current.remove();
    };
  }, []);

  return <div ref={mapContainer} className="map-container" />;
};

export default Mapb;
/*
export default function Mapb() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-7);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(1);

*/
/*
  const MapComponent = () => {
    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FidWZwIiwiYSI6ImNsZ3dwcXN1djAwbmozZnBwZ2ttOHlva2IifQ.dfSkuFimQrAzUDDlNWSj5Q';

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 10,
      });
  
      map.on('style.load', () => {
        map.setFog({
          color: 'rgb(186, 210, 235)', // Lower atmosphere
          'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
          'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
          'space-color': 'rgb(11, 11, 25)', // Background color
          'star-intensity': 0.6, // Background star brightness (default 0.35 at low zooms)
        });
      });
    }, []);


    return (
        <div ref={mapContainer} className="map-container" />
      );
}
*/

//<div ref={mapContainer} className="map-container" />



