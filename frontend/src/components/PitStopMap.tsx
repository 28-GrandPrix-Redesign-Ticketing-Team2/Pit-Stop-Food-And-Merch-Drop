// Run as client component
"use client";

import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { ALBERT_PARK_CORDINATES, DEMO_LOCATION, PIT_STOPS_CORDINATES } from "@/data/mapConstantData";
import { Icon } from "@iconify/react";
import { useDemoMode } from "./DemoProvider";
import Typography from "./ui/Typography";


type PitStopMapProps = {
    selectedPitStopId: string | null;
    onSelectPitStop: (id: string) => void;
};

export default function PitStopMap({
    selectedPitStopId,
    onSelectPitStop,
}: PitStopMapProps) {
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
                pitch: ALBERT_PARK_CORDINATES.pitch,
                bearing: ALBERT_PARK_CORDINATES.bearing
            }}
            mapStyle="mapbox://styles/mapbox/standard"
            style={{
                width: "100%",
                height: "200px",
            }}
        >

            {/* Pit Stops locations */}
            {PIT_STOPS_CORDINATES.map((pitStop) => {
                const isSelected =
                    selectedPitStopId === pitStop.id;

                return (
                    <Marker
                        key={pitStop.id}
                        longitude={pitStop.longitude}
                        latitude={pitStop.latitude}
                    >
                        <button
                            type="button"
                            aria-label={`Select Pit Stop ${pitStop.id}`}
                            aria-pressed={isSelected}
                            onClick={() =>
                                onSelectPitStop(pitStop.id)
                            }
                            className={`
                                flex
                                items-center
                                justify-center
                                rounded-full
                                border
                                transition-all
                                ${isSelected
                                    ? `
                                        h-[30px]
                                        w-[30px]
                                        border-[var(--color-brand-primary)]
                                        bg-[var(--color-brand-primary)]
                                    `
                                    : `
                                        h-6
                                        w-6
                                        border-[var(--color-border)]
                                        bg-[var(--color-page-background)]
                                    `
                                }
                            `}
                        >
                            <Typography
                                variant="sectionHeader"
                                className={`
                                    leading-none
                                    ${isSelected
                                        ? "!text-[13px] !text-[var(--color-text-on-primary)]"
                                        : "text-[8px]"
                                    }
                                `}
                            >
                                {pitStop.id}
                            </Typography>
                        </button>
                    </Marker>
                );
            })}

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