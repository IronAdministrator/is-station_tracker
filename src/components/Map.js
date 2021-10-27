import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import CenterMapView from "./CenterMapView";
import IntStation from "../international-space-station.png";

const Map = (props) => {
  const position = [props.stationLat, props.stationLong];
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
            Current speed:{" "}
            {props.velocity.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}{" "}
            km/h
            <br />
            Current altitude: {props.altitude.toFixed(0)} km above the Earth
          </Popup>
        </Marker>
        <CenterMapView coords={position} />
      </MapContainer>
    </div>
  );
};

export default Map;
