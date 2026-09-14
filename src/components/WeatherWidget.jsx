import { useEffect, useState } from 'react';

export default function WeatherWidget() {
  const [temp, setTemp] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const url =
          'https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.21&current=temperature_2m';
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('Weather request failed');
        const data = await res.json();
        setTemp(Math.round(data.current.temperature_2m));
        setStatus('ok');
      } catch (err) {
        if (err.name === 'AbortError') return;
        setStatus('error');
      }
    }

    loadWeather();
    return () => controller.abort();
  }, []);

  return (
    <div className="weather-widget">
      {status === 'loading' && <span>Weather…</span>}
      {status === 'error' && <span>Weather unavailable</span>}
      {status === 'ok' && <span>Delhi {temp}°C</span>}
    </div>
  );
}
