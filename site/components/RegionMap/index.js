import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./RegionMap"), {
    ssr: false,
});

export { MapComponent };
