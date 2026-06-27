import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
// Fix for default marker icons in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapPage() {
  const center = [19.1136, 72.8297]; // Andheri West coordinates

  return (
    <div className="h-screen w-full flex flex-col bg-background relative">
      <div className="bg-white px-4 py-4 shadow-sm z-10 flex items-center gap-3">
        <Link to="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-dark">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-heading font-bold text-dark">Local Issues Map</h1>
      </div>
      
      <div className="flex-1 w-full relative z-0">
        <MapContainer center={center} zoom={14} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[19.1150, 72.8300]}>
            <Popup>
              <div className="font-semibold">Fallen Tree</div>
              <p className="text-xs text-gray-500">Reported 2 hours ago</p>
            </Popup>
          </Marker>
          <Marker position={[19.1100, 72.8250]}>
            <Popup>
              <div className="font-semibold text-accent">Injured Stray Dog</div>
              <p className="text-xs text-gray-500">Reported 5 hours ago</p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
