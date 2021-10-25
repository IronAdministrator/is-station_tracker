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
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <CenterMapView coords={position} />
      </MapContainer>
    </div>
  );
};

export default Map;
