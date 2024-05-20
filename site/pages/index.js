import { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Head from "next/head";
import Cursor from "../components/Cursor";
import PersistentElement from "../components/PersistentElement";
import StorySection from "../components/StorySection";
import data from "../data/portfolio.json";
import { stagger } from "../animations";
import { MapComponent } from "../components/RegionMap";
import CustomAreaChart from "../components/BarplotEntrypoint";
import Header from "../components/Header";

export default function Home() {
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const [year, setYear] = useState(1980);


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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stagger(
              [textOne.current, textTwo.current],
              { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
              { y: 0, x: 0, transform: "scale(1)" }
            );
            observer.unobserve(entry.target); // Stop observing once animation is triggered
          }
        });
      },
      { threshold: 0.5 } // Adjust as needed
    );

    if (textOne.current && textTwo.current) {
      observer.observe(textOne.current);
      observer.observe(textTwo.current);
    }

    return () => {
      if (textOne.current && textTwo.current) {
        observer.unobserve(textOne.current);
        observer.unobserve(textTwo.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="background-section relative w-fulld flex flex-col justify-center">
        <div className="w-full h-screen flexd p-2 z-10">
          <CustomAreaChart />
        </div>
        <div className="text-container mx-10">
          <h1
            ref={textOne}
            className="text-10xl tablet:text-12xl laptop:text-14xl laptopl:text-18xl font-bold w-full text-white"
          >
            {data.headerTaglineOne}
          </h1>
          <h1
            ref={textTwo}
            className="text-xxl tablet:text-4xl laptop:text-6xl laptopl:text-6xl font-bold w-full text-white"
          >
            {data.headerTaglineTwo}
          </h1>
        </div>
      </div>

      <div className="flex flex-col w-fulld mx-10 mb-10 justify-center items-center">
        <div className="laptop:mt-20 mt-10">
          <div className="container mx-auto max-w-4xl relative">
            <PersistentElement startId="start-sticky-map" endId="end-sticky">
              <div className="mx-auto text-white p-10 z-10">
                <MapComponent
                  mapTriggerId="start-sticky-map"
                  markerTriggerId="start-sticky-markers"
                  vegMarkerTriggerId="start-sticky-veg-markers"
                  year={year}
                  heatmapTriggerId="start-sticky-heatmap"
                />
              </div>
            </PersistentElement>
          </div>
          <div className="space-y-32 justify-center items-center relative z-30">
            <div id="before-start"></div>
            <div id="start-sticky-map">
              <StorySection
                title="Introduction"
                description="This is an introduction to our data story."
              />
            </div>
            <div id="start-sticky-markers">
              <StorySection
                title="Section 1"
                description="This is the first section, highlighting important data insights."
              />
            </div>
            <div id="start-sticky-veg-markers">
              <StorySection
                title="Section 2"
                description="The second section provides more detailed analysis."
              >
              </StorySection>
            </div>
            <div id="start-sticky-heatmap"></div>
            <StorySection
                title="Section 3"
                description="This is the third section, highlighting important data insights."
              >
            <div id="year-slider">
              <label htmlFor="yearSlider">Select Year: {year}</label><br></br>
              <input
                type="range"
                id="yearSlider"
                name="yearSlider"
                min="1980"
                max="2018"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                />
            </div>
            </StorySection>
            <div id="end-sticky">
              <StorySection
                title="Conclusion"
                description="Here, we conclude the data story and provide final insights."
              />
            </div>
          </div>
        </div>
      </div>
          <div className="container mx-auto mb-10">
            <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
              <Footer />
            </div>
          </div>
    </div>
  );
}
