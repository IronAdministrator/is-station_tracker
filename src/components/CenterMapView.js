import { useMap } from "react-leaflet";

function CenterMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

export default CenterMapView;
