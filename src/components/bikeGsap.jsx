import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BikeGsap = () => {
  useGSAP(() => {
    // Box animation
    gsap.to("#box", {
      opacity: 1,
      borderRadius: "15%",
      duration: 1.2,
      scale: 0.8,
      scrollTrigger: {
        trigger: "#our",
        pin: true,
        start: "top top",
        end: "bottom+=500 top",
        scrub: true,
        markers: true
      }
    });
    
    // Bike animation - starts after box animation ends
    gsap.from("#bike", {
      x: "-150%",
      scrollTrigger: {
        trigger: "#bike",
        scrub: true,
        start: "top+=500 top", // Adjusted to start after box section
        markers: true
      }
    });
  }, []);

  return (
    <div id="our"className="min-h-screen flex items-center justify-center">
      <div
        id="box"
        className="bg-blue-200 h-screen w-full  flex items-center justify-center"
      >
        <img id ="bike" src="../../assets/skills/ducati.png"></img>
      </div>
    </div>
  );
};

export default BikeGsap;
