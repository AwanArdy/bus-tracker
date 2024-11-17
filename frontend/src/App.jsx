import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [routes, setRoutes] = useState([]);
  const [busPosition, setBusPosition] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/routes').then(res => setRoutes(res.data)).catch(err => console.error(err));

    const interval = setInterval(() => {
      axios.get('http://localhost:3001/bus').then(res => setBusPosition(res.data.position)).catch(err => console.error(err));
    }, 2000);

    return () => clearInterval(interval)
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tracking Bus Trans</h1>
      <div className="relative border border-gray-300 rounded-md w-full h-96">
        {/* Rute */}
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {routes.map((route, index) => (
            <circle
              key={route.id}
              cx={100 + route.lat * 80}
              cy={100 + route.lng * 80}
              r="10"
              fill="blue"
            />
          ))}
          {/* Posisi Bus */}
          {busPosition && (
            <circle
              cx={100 + busPosition.lat * 80}
              cy={100 + busPosition.lng * 80}
              r="12"
              fill="Red"
            />
          )}
        </svg>
      </div>
    </div>
  )
};

export default App;
