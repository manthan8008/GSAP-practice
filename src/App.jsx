import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import Lenis from "lenis";

// Register the React plugin hook
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export default function App() {
  const containerRef = useRef();
  const tempref = useRef();
  const textref = useRef();

  const lenis = new Lenis({
    autoRaf: true,
  });

  // Listen for the scroll event and log the event dat

  useGSAP(
    () => {
      let split = SplitText.create(textref.current, { type: "chars" });
      gsap.from(split.chars, {
        y: 200,
        stagger: 0.05,
        opacity: 0,
        ease: "back.inOut",
      });
      gsap.to(tempref.current, { opacity: 1, x: 20 });
      const boxes = gsap.utils.toArray(containerRef.current.children);
      boxes.map((box) => {
        gsap.to(box, {
          xPercent: 400,
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
    },
    { scope: containerRef },
  );

  return (
    <div>
      <div ref={textref} className="flex justify-center">
        <p>Hello how are you</p>
      </div>
      <div className="w-20 h-20 bg-black opacity-0" ref={tempref}></div>
      <div ref={containerRef} className="my-[150%] flex flex-col gap-10">
        <div className="w-20 h-20 bg-yellow-500"></div>
        <div className="w-20 h-20 bg-red-600"></div>
        <div className="w-20 h-20 bg-blue-600"></div>
      </div>
    </div>
  );
}
