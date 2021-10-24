import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import ChangeMapView from "./ChangeMapView";
import { useState, useEffect, useCallback } from "react";
import IntStation from "../international-space-station.png";

const Map = () => {
  // const [location, setLocation] = useState(0);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.wheretheiss.at/v1/satellites/25544"
      );
      if (!response.ok) {
        throw new Error("Something went wrong! Try again later.");
      }
      const data = await response.json();
      const { latitude, longitude } = data;

      setLat(parseFloat(latitude));
      setLong(parseFloat(longitude));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // const fetchData = useCallback(async () => {
  //   await Axios.get("https://api.wheretheiss.at/v1/satellites/25544").then(
  //     (response) => setLocation(response.data)
  //   );

  //   setLong(parseFloat(location.longitude));
  //   setLat(parseFloat(location.latitude));
  // }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const position = [lat, long];
  console.log(position);

  return (
    <div>
      <MapContainer
        className="map-container"
        center={position}
        zoom={3}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: IntStation,
              iconSize: [50, 50],
              // iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeMapView coords={position} />
      </MapContainer>
    </div>
  );
};

export default Map;
