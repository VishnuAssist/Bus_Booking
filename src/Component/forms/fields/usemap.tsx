import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), {
      animate: true,
    });
  }, [lat, lng, map]);
  return null;
};

export default RecenterMap