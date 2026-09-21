// Run as client component
"use client";

import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { PIT_STOPS, ALBERT_PARK_CORDINATES, DEMO_LOCATION } from "@/data/mapConstantData";
import { Icon } from "@iconify/react";
import { useDemoMode } from "./DemoProvider";

export default function PitStopMap() {
    // Read global Demo Mode state
    const { demoMode } = useDemoMode();
    return (
        // Centered Albert Park
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
                longitude: ALBERT_PARK_CORDINATES.longitude,
                latitude: ALBERT_PARK_CORDINATES.latitude,
                zoom: ALBERT_PARK_CORDINATES.zoom,
                pitch: ALBERT_PARK_CORDINATES.pitch
            }}
            mapStyle="mapbox://styles/mapbox/standard"
            style={{
                width: "100%",
                height: "500px",
            }}
        >

            {/* Pit Stops locations */}
            {PIT_STOPS.map((pitStop) => (
                <Marker
                    key={pitStop.id}
                    longitude={pitStop.longitude}
                    latitude={pitStop.latitude}
                >
                    <Icon
                        icon="emojione-v1:flag-for-chequered-flag"
                        width="16"
                    />
                </Marker>
            ))}

            {/* Live Location */}
            <GeolocateControl
                position="top-right"
                trackUserLocation
                showUserLocation
            />

            {/* Demo User Location */}
            {demoMode && (
                <Marker
                    longitude={DEMO_LOCATION.longitude}
                    latitude={DEMO_LOCATION.latitude}
                >
                    <Icon
                        icon="mdi:map-marker-circle"
                        width="30"
                        color="#5EA0EE"
                    />
                </Marker>
            )}

            <NavigationControl position="top-right" />
        </Map>
    );

}