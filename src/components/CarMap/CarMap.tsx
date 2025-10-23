import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Car } from "../../types";

interface CarMapProps {
  cars: Car[];
}

export const CarMap: React.FC<CarMapProps> = ({ cars }) => {
  useEffect(() => {
    const map = L.map("map").setView([59.934, 30.335], 10); // центр карты можно любой

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const defaultIcon = L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string };
    delete defaultIcon._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });

    cars.forEach(car => {
      L.marker([car.latitude, car.longitude])
        .addTo(map)
        .bindPopup(`<b>${car.name}</b><br>Price: $${car.price}`);
    });

    return () => {
      map.remove();
    };
  }, [cars]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};
