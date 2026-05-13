import { GL } from "./gl";
import { Pill } from "./Pill";
import { Button } from "./ui/button";
import { useState } from "react";
import { Header } from "./Header";

export function Hero() {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col h-svh justify-between relative z-10">
      <GL hovering={hovering} />
      <Header />

      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-6">ЮРИДИЧЕСКАЯ ЭКОСИСТЕМА</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Защита от мошенников —<br />
          <i className="font-light">рядом с вами</i>
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[480px] mx-auto">
          Объединяем пострадавших с профильными юристами и адвокатами. Быстро, прозрачно, результативно.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap mt-14">
          <a className="contents max-sm:hidden" href="#victims">
            <Button
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Я пострадал от мошенников]
            </Button>
          </a>
          <a className="contents max-sm:hidden" href="#lawyers">
            <Button
              variant="outline"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Я юрист / адвокат]
            </Button>
          </a>
          <a className="contents sm:hidden" href="#victims">
            <Button
              size="sm"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Я пострадал]
            </Button>
          </a>
          <a className="contents sm:hidden" href="#lawyers">
            <Button
              size="sm"
              variant="outline"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Я юрист]
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}