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
import PPTAreaChart from "../components/AreaChartPPT";
import AreaChartvwc from "../components/AreaChartVWC";
import ServiceCard from "../components/ServiceCard";

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
        <div className="text-container mx-10 mb-10">
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
      <div className="w-full flex justify-end text-white text-3xl font-bold dark:text-white"><p>NetID: kl1099</p></div>

      <div className="flex flex-col w-fulld mx-10 mb-10 justify-center items-center">
        <div className="background-section1 mt-10 laptop:mt-10 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-6xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
          Climate change, characterized by rising global temperatures, altered precipitation patterns, and increased frequency of extreme weather events, profoundly impacts vegetation worldwide. These changes affect plant growth, distribution, and health, leading to shifts in ecosystems and biodiversity loss. As vegetation plays a crucial role in carbon sequestration, oxygen production, and providing habitat for wildlife, understanding these impacts is essential. Conducting research on climate change&apos;s effects on vegetation is vital to developing adaptive strategies, mitigating negative consequences, and ensuring the sustainability of ecosystems that support human life and the planet&apos;s overall health. 
          <br/><br/>
          This study will focus on Natural Bridges National Monument&apos;s collected data ranging at early as 1980 to projected data at 2024, and focus on these areas of interest.
          </p>
        </div>
      <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-6xl text-bold">Focus.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        <div className="laptop:mt-20 mt-10 w-screen">
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
                title="Natural Bridges National Monument"
                description="Located in Utah, this region is famous for its mountainous terrain, natural bridges, and unique vegetation. The park's diverse ecosystems support a wide variety of plant and species, making it an ideal location for studying climate change impacts on vegetation."
              />
            </div>
            <div id="start-sticky-markers">
              <StorySection
                title="Monitored Data Points"
                description="These markers represent the locations where assorted data is collected. Most of the data points pivots north western of the park, with a few scattered around the park's perimeter. The data collected includes temperature, precipitation, and vegetation type, among other factors."
              />
            </div>
            <div id="start-sticky-veg-markers">
              <StorySection
                title="Vegetation Distribution"
                description="These markers represent the distribution of vegetation types across the park. The vegetation types include grasslands, shrublands, barelands, among others. The distribution of these vegetation types is influenced by factors such as temperature, precipitation, and soil type. Do note that after through analysis, the dominant vegetation type for one location does not change across the sampled years and projected years, which is why we have defined a static representation for vegetation types."
              />
            </div>
            <div id="start-sticky-heatmap"></div>
            <StorySection
                title="Temperature Distribution Heatmap"
                description="This heatmap represents the temperature distribution across the park. The temperature distribution is influenced by factors such as elevation, latitude, and proximity to water bodies. The temperature distribution affects vegetation growth, distribution, and health, making it a crucial factor in studying climate change impacts on vegetation."
            >

            <div id="year-slider" className="text-2xl">
              <label htmlFor="yearSlider">Select Year: {year}</label><br />
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
            <div> Move the slider to view temperature map for each year. </div>
            <p> If you cannot see the heatmap, allow &quot;Extract Canvas Data&quot; in website settings, which usually resides at URL bar.</p>
            </StorySection>
            <div id="end-sticky">
              <StorySection
                title="Information Gained"
                description="We established that temperature distribution highly correlates to the vegetation distribution across the park, as Higher temperatures are often associated with lower vegetation coverage. And we do pick up a trend where the high temperature zone is spreading towards the south-eastern part of the park, where there used to be a cooler zone. We can now infer that temperature increase in a region can lead to a decrease in vegetation coverage, along with deterioration of vegetation health(From woodland to shrubland, shrubland to grassland, etc)."
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col w-fulld mx-10 mb-10 justify-center items-center">
        <div className="background-section1 mt-10 laptop:mt-10 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-6xl text-bold">Precipitation Trend & Volumetric Water Content.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
          While exploring dataset, precipitation trend and volumetric water content is another pair of interesting factors we found. Below we will be plotting the precipitation trend and volumetric water content across the years, including projected data at 2024. 
          </p>
        </div> 
        
        <div className="mx-auto w-full flex flex-col items-center justify-center space-y-10 mx-0 mb-10">
        <div className="flex w-full bg-white border rounded-lg shadow-lg backdrop-blur-sm p-4 dark:bg-black">
          <div className="w-2/3 border-r p-4 justify-center items-center">
            <div className="h-full w-full bg-gray-200 justify-center items-center flex">
              <PPTAreaChart />
            </div>
          </div>
          <div className="w-1/3 p-4 justify-center items-center">
            <div className="text-3xl font-bold">Precipitation Volume across the years</div>
            <p className="text-2xl mt-4">This area plot shows the changes in precipitation for this region. One trend to notice is that: The winter PPT value is increasing, in contrast, the summer PPT value is decreasing. This abnormality could be one of the by-product of climate change.</p><br/>
            <p className="text-2xl mt-4">Another pattern to notice is that the precipitation is becoming unstable as time goes, with spikes and valleys getting more concentrated.</p>
            
          </div>
        </div>

        <div className="flex w-full bg-white border rounded-lg shadow-lg backdrop-blur-sm p-4 dark:bg-black">
          <div className="w-1/3 p-4">
            <div className="text-3xl font-bold">Volumetric water content across the years</div>
            <p className="text-2xl mt-4">This area plot shows the changes in volumetric water content, which is tightly correlated to precipitation data. We see multiple evidences that support this, most obvious of which is the big dent at 1990s. </p> <br/>
            <p className="text-2xl mt-4">This indicator is also one of the metrics to measure vegetation quality. If vegetation quality is good, the water content is more likely to hold. </p><br/>
            <p className="text-2xl mt-4">It is quite easy to spot an anomaly. The spikes are not in sync any more in recent years. Most notably year 2008. This could give us insight of the volatility for vegetation is decreasing.</p>
          </div>
          <div className="w-2/3 border-l p-4">
            <div className="h-full w-full bg-gray-200 justify-center items-center flex">
              <AreaChartvwc />
            </div>
          </div>
        </div>
        <div className="background-section1 mt-10 laptop:mt-10 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-6xl text-bold">Conclusion.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">

          In conclusion, the data from Natural Bridges National Monument highlights significant trends and correlations between climate change and vegetation dynamics. We observed that rising temperatures are associated with reduced vegetation coverage, while shifts in precipitation patterns have created more volatile and unpredictable conditions for plant life. These findings underscore the critical impact of climate change on natural ecosystems, emphasizing the need for ongoing research and adaptive management strategies to preserve biodiversity and ecosystem health.
          <br/><br/>
          By analyzing long-term data and projecting future conditions, this study provides valuable insights into how climate change may continue to shape vegetation patterns. Understanding these changes enables us to develop more effective conservation efforts and policy decisions, ensuring that natural landscapes like Natural Bridges National Monument can withstand and adapt to the challenges posed by a changing climate.
          </p>
        </div> 
      </div>
      </div>
      <div className="container mx-auto mb-10">
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <Footer />
        </div>
      </div>

    </div>
  </div>
  );
}
