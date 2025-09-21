"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "./page";

function makeMarkerIcon(isSelected: boolean, rating: number) {
    const size = isSelected ? 40 : 28;
    const bg = isSelected ? "#2563eb" : "#0ea5e9";
    const ring = isSelected ? "0 0 0 6px rgba(37,99,235,0.2)" : "0 0 0 3px rgba(14,165,233,0.25)";
    const html = `
    <div style="
      width:${size}px;height:${size}px;line-height:${size}px;
      background:${bg};color:#fff;border-radius:50%;
      text-align:center;font-weight:700;font-family:Inter,system-ui;
      box-shadow:${ring};
    ">${rating.toFixed(1)}</div>`;
    return L.divIcon({ html, iconSize: [size, size], className: "rf-divicon" });
}

function FitToBounds({ points }: { points: [number, number][] }) {
    const map = useMap();
    useEffect(() => {
        if (!points.length) return;
        const bounds = L.latLngBounds(points.map(([lat, lng]) => L.latLng(lat, lng)));
        map.fitBounds(bounds, { padding: [40, 40] });
    }, [map, points]);
    return null;
}

function FlyToSelected({ coord }: { coord: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
        if (!coord) return;
        const [lat, lng] = coord;
        map.flyTo([lat, lng], Math.max(map.getZoom(), 13), { duration: 0.8 });
    }, [map, coord]);
    return null;
}

type Props = {
    items: Place[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    selectedCoord: [number, number] | null;
    boundsPoints: [number, number][];
};

export default function LeafletSection({ items, selectedId, onSelect, selectedCoord, boundsPoints }: Props) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="p-0 h-full rounded-2xl overflow-hidden">
            <MapContainer center={[16.047, 108.206]} zoom={11} style={{ height: "100%", minHeight: "60vh" }}>
                <TileLayer attribution="&copy; Lê Bá Trình" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {!selectedCoord && <FitToBounds points={boundsPoints} />}
                <FlyToSelected coord={selectedCoord} />
                {items.map((p) => {
                    const selected = p.id === selectedId;
                    return (
                        <Marker
                            key={p.id}
                            position={[p.location.lat, p.location.lng]}
                            icon={makeMarkerIcon(selected, p.rating)}
                            eventHandlers={{ click: () => onSelect(p.id) }}
                        >
                            <Popup>
                                <div className="font-semibold text-blue-600 text-lg">{p.name}</div>
                                <em className="text-sm text-gray-600">{p.description}</em>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
