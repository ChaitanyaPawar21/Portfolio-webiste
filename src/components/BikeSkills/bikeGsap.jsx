import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './BikeSkills/bikeGsap.css';
gsap.registerPlugin(ScrollTrigger);

const BikeGsap = () => {
  useGSAP(() => {
    const bikeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#bike",
        start: "top+=300 top",
        end: "bottom+=800 top",
        scrub: true,
        markers: true,
        pin: true
      }
    });

    bikeTimeline
      .from("#bike", {
        x: "-150%",
        duration: 1
      });
      gsap.to("#bike", {
        x:"500%"
      })
  }, []);

  return (
    <div className="min-h-[200vh] bg-gray-900">
      <div id="our" className="min-h-screen flex items-center justify-center">
        <div
          id="box"
          className="bg-blue-200 h-screen w-full flex items-center justify-center overflow-hidden"
        >
          <img 
            id="bike" 
            src="https://images.unsplash.com/photo-1558981852-426c6c22a060?w=600&h=400&fit=crop" 
            alt="Bike"
            className="w-96 h-auto"
          />
        </div>
      </div>
      <div className="h-screen bg-gray-800"></div>
    </div>
  );
};

export default BikeGsap;