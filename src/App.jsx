
import './App.css'
import { useEffect, useState } from "react";
import { useGeolocation } from "./hooks/useGeolocation";

const API_KEY = import.meta.env.VITE_API_KEY; // importa la clave de una variable de entorno

export default function App() {
  const location = useGeolocation();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&lang=es&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
    };

    fetchWeather();
  }, [location]);
 

  return (
    <>
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      {weather ? (
        <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold">{weather.name}</h1>
          <p className="text-xl">{Math.round(weather.main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="mx-auto"
          />
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      ) : (
        <p className="text-xl">Getting weather...</p>
      )}
    </div>
    
    </>
    
  )



}
