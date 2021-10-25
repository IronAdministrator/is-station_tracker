import "./App.css";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useCallback } from "react";

function App() {
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
    setInterval(() => {
      fetchData();
    }, 1000);
  }, [fetchData]);

  const position = [lat, long];
  console.log(position);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Where is the Station?</h1>
      </header>
      <Map stationPosition={position} />
    </div>
  );
}

export default App;
