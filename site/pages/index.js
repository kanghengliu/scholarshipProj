import { useRef } from "react";

import Footer from "../components/Footer";
import Head from "next/head";

import Cursor from "../components/Cursor";
import PersistentElement from "../components/PersistentElement";
import StorySection from "../components/StorySection";

// Local Data
import data from "../data/portfolio.json";
import { MapComponent } from "../components/RegionMap";
import CustomAreaChart from "../components/BarplotEntrypoint";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
      <div className="w-full h-screen bg-black-500 rounded flex justify-center items-center p-2 z-10000">
        <CustomAreaChart />
      </div>
      <div className="container mx-auto mb-10">
        <div>
          <h1> My Map </h1>
        </div>
        <div className="container mx-auto max-w-4xl">
          <PersistentElement startId="start-sticky-map" endId="end-sticky">
            <div className="mx-auto text-white p-10">
              <MapComponent mapTriggerId="start-sticky-map" markerTriggerId="start-sticky-markers" vegMarkerTriggerId="start-sticky-veg-markers" /> {/* Pass trigger IDs */}
            </div>
          </PersistentElement>
        </div>
        <div className="space-y-32">
          <div id="before-start"></div>
          <div id="start-sticky-map"> {/* Add the trigger ID for the map */}
            <StorySection
              title="Introduction"
              description="This is an introduction to our data story."
            />
          </div>
          <div id="start-sticky-markers"> {/* Add the trigger ID for the markers */}
            <StorySection
              title="Section 1"
              description="This is the first section, highlighting important data insights."
            />
          </div>
          <div id="start-sticky-veg-markers"> {/* Add the trigger ID for the veg markers */}
            <StorySection
              title="Section 2"
              description="The second section provides more detailed analysis."
            />
          </div>
          <div id="end-sticky">
            <StorySection
              title="Conclusion"
              description="Here, we conclude the data story and provide final insights."
            />
          </div>
        </div>
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
