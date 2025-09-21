"use client";
import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FixedSizeList } from "react-window";


const maps = [
    { name: "Nha Trang", icon: "📚" },
    { name: "Da Nang", icon: "🚀" },
];

export type Place = {
    id: string;
    name: string;
    description?: string;
    rating: number;
    location: { lat: number; lng: number };
};

// Demo data
const demoPlacesByCity: Record<string, Place[]> = {
    "Nha Trang": [
        { id: "nt-01", name: "Khu vực chính", rating: 4, description: "Di tích Chăm nổi tiếng", location: { lat: 12.2658, lng: 109.197 } },
        { id: "nt-02", name: "Chợ Đầm", rating: 3, description: "Khu chợ trung tâm", location: { lat: 12.2529, lng: 109.1914 } },
        { id: "nt-03", name: "Biển Trần Phú", rating: 3, description: "Bãi biển chính", location: { lat: 12.2383, lng: 109.1967 } },
    ],
    "Da Nang": [
        { id: "dn-01", name: "Khu vực chính", rating: 5, description: "Biểu tượng Đà Nẵng", location: { lat: 16.0614, lng: 108.231 } },
        { id: "dn-02", name: "Chợ Hàn", rating: 3, description: "Chợ truyền thống", location: { lat: 16.0678, lng: 108.2208 } },
        { id: "dn-03", name: "Bán đảo Sơn Trà", rating: 3, description: "Thiên nhiên đẹp", location: { lat: 16.1167, lng: 108.3 } },
    ],
};

const LeafletSection = dynamic(() => import("./LeafletSection"), { ssr: false });

type RowProps = {
    index: number
    style: React.CSSProperties
    data: {
        items: Place[];
        selectedId: string | null;
        onSelect: (id: string) => void
    }
}

const Row = ({ index, style, data }: RowProps) => {
    const item = data.items[index];
    const selected = item.id === data.selectedId;
    return (
        <div
            style={style}
            onClick={() => data.onSelect(item.id)}
            className={`p-3 border-b cursor-pointer ${selected ? "bg-blue-50" : "hover:bg-gray-50"}`}
        >
            <div className="font-semibold">
                {item.name} <span className="text-sm text-yellow-600">({item.rating}★)</span>
            </div>
            <div className="text-sm text-gray-600 truncate">{item.description}</div>
        </div>
    );
};


function LocationPage() {
    const [selectedMap, setSelectedMap] = useState(maps[0]);
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [places, setPlaces] = useState<Place[]>(demoPlacesByCity[maps[0].name]);

    useEffect(() => {
        const next = demoPlacesByCity[selectedMap.name] ?? [];
        setPlaces(next);
        setSelectedId(next[0]?.id ?? null);
    }, [selectedMap]);

    const items = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = q
            ? places.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    (p.description?.toLowerCase().includes(q) ?? false)
            )
            : places;
        const sorted = [...filtered].sort((a, b) =>
            sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
        );
        return sorted;
    }, [places, query, sortOrder]);

    const selectedCoord: [number, number] | null = useMemo(() => {
        if (!selectedId) return null;
        const hit = items.find((p) => p.id === selectedId);
        return hit ? [hit.location.lat, hit.location.lng] : null;
    }, [items, selectedId]);

    const boundsPoints = useMemo<[number, number][]>(() => {
        return items.map((p) => [p.location.lat, p.location.lng] as [number, number]);
    }, [items]);

    const listRef = useRef<FixedSizeList | null>(null);

    useEffect(() => {
        if (!selectedId) return;
        const idx = items.findIndex((p) => p.id === selectedId);
        if (idx >= 0) listRef.current?.scrollToItem?.(idx, "center");
    }, [selectedId, items]);

    const handleSelect = useCallback((id: string) => setSelectedId(id), []);

    const [listHeight, setListHeight] = useState<number>(
        Math.round((typeof window !== "undefined" ? window.innerHeight : 800) * 0.5)
    );
    useEffect(() => {
        const onResize = () => setListHeight(Math.round(window.innerHeight * 0.5));
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div className="flex flex-col w-full items-center justify-center py-6 px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight flex flex-col gap-2 items-center">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Location</span>
                <span className="italic text-lg md:text-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">Find Us Here</span>
            </h2>

            <div className="flex gap-3 items-center mb-4">
                {maps.map((m) => (
                    <button
                        key={m.name}
                        onClick={() => setSelectedMap(m)}
                        className={`group cursor-pointer flex items-center gap-2 rounded-3xl px-4 py-2 md:px-6 md:py-3 transition-transform border ${selectedMap.name === m.name ? "bg-indigo-600 text-white" : "bg-white hover:bg-indigo-50"
                            }`}
                    >
                        <span className="text-xl">{m.icon}</span>
                        <span className="font-medium">{m.name}</span>
                    </button>
                ))}
            </div>

            <div className="p-0 overflow-hidden w-full max-w-6xl z-0">
                <LeafletSection
                    items={items}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    selectedCoord={selectedCoord}
                    boundsPoints={boundsPoints}
                />
            </div>
        </div>
    );
}

export default LocationPage;
