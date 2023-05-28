import React, { useState, useEffect, useRef } from "react";
import { getHistory } from "../services/api";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/Mapb.css";
import SOS from "../components/SOS";

/*
 export  function LocationComponent() {

  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getHistory(token); 
        console.log(response);
        setLocations(response.data.locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    // Fetch locations initially
    fetchLocations();

    // Fetch locations every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchLocations, 5000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to only run the effect once


  return (
    <div>
      <h1>Locations</h1>
      <ul>
        {locations.map(location => (
          <li key={location.ID}>
            Latitude: {location.Latitude}, Longitude: {location.Longitude}
          </li>
        ))}
      </ul>
    </div>
  );
};
*/

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2FidWZwIiwiYSI6ImNsZ3dwcXN1djAwbmozZnBwZ2ttOHlva2IifQ.dfSkuFimQrAzUDDlNWSj5Q";

const MapP = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-7);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("style.load", () => {
      map.current.setFog({
        color: "rgb(186, 210, 235)", // Lower atmosphere
        "high-color": "rgb(36, 92, 223)", // Upper atmosphere
        "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        "space-color": "rgb(0, 0, 0)", // Background color
        "star-intensity": 0, // Background star brightness (default 0.35 at low zooms)
      });
    });

    return () => {
      map.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-77.032, 38.913],
          },
          properties: {
            title: "Mapbox",
            description: "Washington, D.C.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-122.414, 37.776],
          },
          properties: {
            title: "Mapbox",
            description: "San Francisco, California",
          },
        },
      ],
    };

    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map.current);
    }
  });

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
};

export default MapP;
