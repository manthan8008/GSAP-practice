import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

// Register the React plugin hook
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const boxes = gsap.utils.toArray(containerRef.current.children);
    boxes.map((box) => {
      gsap.to(box, {
        x: 400,
        borderRadius: "50%",
        rotation: 360,
        ease: "power1.inOut",
        scrollTrigger: {
          start: "bottom bottom",
          end: "top 20%",
          trigger: box,
          scrub: 0.5,
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="my-[150%] flex flex-col gap-10">
      <div className="w-20 h-20 bg-yellow-500"></div>
      <div className="w-20 h-20 bg-red-600"></div>
      <div className="w-20 h-20 bg-blue-600"></div>
      <div></div>
    </div>
  );
}
