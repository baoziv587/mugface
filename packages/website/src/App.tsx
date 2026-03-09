import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MugFace, type Emotion } from "mugface";
import { GITHUB_URL, GITHUB_API_URL } from "./constants";
import { GitHubIcon } from "./components/GitHubIcon";
import { PropShowcase } from "./components/PropShowcase";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const container = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("MugFace");
  const [seedValue, setSeedValue] = useState(0);
  const [emotion, setEmotion] = useState<Emotion | "">("");
  const [borderRadius, setBorderRadius] = useState<number | "">("");
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(GITHUB_API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error("Failed to fetch GitHub stars", err));
  }, []);

  useGSAP(
    () => {
      // Simple fade up for hero elements
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Scroll animations for prop sections
      gsap.utils.toArray<HTMLElement>(".prop-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".prop-card"), {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="bg-bg-primary text-text-dark font-sans selection:bg-accent-1 selection:text-text-light min-h-screen"
    >
      {/* Top Bar */}
      <header className=" sticky top-0 left-0 right-0 p-6 flex justify-end z-10 max-w-7xl mx-auto w-full">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fade-up flex flex-row items-center gap-2 bg-bg-primary border-2 border-text-dark text-text-dark px-4 py-2 font-display font-bold hover:bg-accent-1 hover:text-text-dark transition-all shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
        >
          <GitHubIcon size={20} />
          Star on GitHub
          {stars !== null && (
            <span className="ml-1 px-2 py-0.5 bg-text-dark text-text-light text-xs rounded-full">
              {stars}
            </span>
          )}
        </a>
      </header>

      {/* Hero Section - Focused on Playground */}
      <section className="pt-20 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 min-h-[90vh]">
        <div className="flex-1 w-full text-left">
          <h1 className="fade-up font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-6">
            Mug<span className="text-accent-1">Face</span>
          </h1>
          <p className="fade-up text-xl md:text-2xl font-medium mb-10 max-w-xl">
            Deterministic SVG avatars generated from any string. Bold,
            expressive, and infinitely scalable.
          </p>
          <div className="fade-up bg-text-dark text-text-light p-6 border-l-4 border-accent-1 shadow-xl">
            <pre className="font-mono text-sm md:text-base overflow-x-auto">
              <code>
                <span className="text-gray-400">// 1. Install</span>
                {"\n"}
                npm install mugface{"\n\n"}
                <span className="text-gray-400">// 2. Import & Use</span>
                {"\n"}
                import {"{ MugFace }"} from 'mugface';{"\n\n"}
                {'<MugFace name="Alice" />'}
              </code>
            </pre>
          </div>
        </div>

        <div className="fade-up flex-1 w-full max-w-lg bg-white border-4 border-text-dark p-8 shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] flex flex-col items-center gap-8">
          <div className="w-48 h-48">
            <MugFace
              name={inputValue}
              seed={seedValue}
              emotion={emotion || undefined}
              borderRadius={borderRadius === "" ? undefined : borderRadius}
              className="w-full h-full drop-shadow-2xl"
            />
          </div>

          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-display font-bold text-sm uppercase tracking-widest text-text-dark/70">
                Name (Required)
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-bg-primary border-2 border-text-dark px-4 py-3 text-xl font-display font-bold outline-none focus:border-accent-1 transition-colors rounded-none"
                placeholder="Type a name..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-display font-bold text-xs uppercase tracking-widest text-text-dark/70">
                  Seed
                </label>
                <input
                  type="number"
                  value={seedValue}
                  onChange={(e) => setSeedValue(Number(e.target.value))}
                  className="w-full bg-bg-primary border-2 border-text-dark px-2 py-2 text-lg font-display font-bold outline-none focus:border-accent-1 transition-colors rounded-none text-center"
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-display font-bold text-xs uppercase tracking-widest text-text-dark/70">
                  Emotion
                </label>
                <select
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value as Emotion | "")}
                  className="w-full bg-bg-primary border-2 border-text-dark px-2 py-2 text-lg font-display font-bold outline-none focus:border-accent-1 transition-colors rounded-none text-center appearance-none cursor-pointer"
                >
                  <option value="">Auto</option>
                  <option value="neutral">Neutral</option>
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="anxious">Anxious</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-display font-bold text-xs uppercase tracking-widest text-text-dark/70">
                  Radius
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={borderRadius}
                  onChange={(e) =>
                    setBorderRadius(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-full bg-bg-primary border-2 border-text-dark px-2 py-2 text-lg font-display font-bold outline-none focus:border-accent-1 transition-colors rounded-none text-center"
                  placeholder="Auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Props Documentation Section */}
      <section className="bg-bg-secondary text-text-light py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">
              Interactive Props
            </h2>
            <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
              See how each parameter deterministically alters the generated
              avatar.
            </p>
          </div>

          <PropShowcase
            title="name"
            type="type: string (required)"
            description="The core input string. Every unique string generates a completely unique combination of colors, shapes, and facial features."
            values={["Alice", "Bob", "Charlie", "Dave"]}
            renderCode={(name) => `name="${name}"`}
            renderAvatar={(name) => <MugFace name={name} className="w-32 h-32 drop-shadow-lg" />}
            accentColor="text-accent-1"
          />

          <PropShowcase
            title="seed"
            type="type: number (default: 0)"
            description="Provides variations for the exact same name. Useful if you want to keep the username but cycle through different avatar looks."
            values={[0, 1, 42, 99]}
            renderCode={(seed) => `seed={${seed}}`}
            renderAvatar={(seed) => <MugFace name="MugFace" seed={seed} className="w-32 h-32 drop-shadow-lg" />}
            accentColor="text-accent-2"
          />

          <PropShowcase
            title="emotion"
            type="type: 'neutral' | 'happy' | 'sad' | 'anxious'"
            description="Overrides the randomly hashed expression to force a specific emotional state while maintaining the user's unique colors and shapes."
            values={["neutral", "happy", "sad", "anxious"] as Emotion[]}
            renderCode={(em) => `emotion="${em}"`}
            renderAvatar={(em) => <MugFace name="MugFace" emotion={em} className="w-32 h-32 drop-shadow-lg" />}
            accentColor="text-accent-1"
          />

            <PropShowcase
              title="borderRadius"
              type="type: number (0 - 50)"
              description="Overrides the randomly hashed background shape. 0 creates a perfect square, 50 creates a perfect circle."
              values={[0, 15, 30, 50]}
              renderCode={(radius) => `borderRadius={${radius}}`}
              renderAvatar={(radius) => <MugFace name="MugFace" borderRadius={radius} className="w-32 h-32 drop-shadow-lg" />}
              accentColor="text-accent-2"
            />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-primary text-text-dark py-12 px-6 border-t-4 border-text-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display font-bold text-2xl uppercase tracking-tighter">
            Mug<span className="text-accent-1">Face</span>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-text-dark text-text-light border-2 border-text-dark px-6 py-3 font-display font-bold hover:bg-accent-1 hover:text-text-dark transition-all shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] text-lg"
          >
            <GitHubIcon size={24} />
            Star on GitHub
            {stars !== null && (
              <span className="ml-2 px-2 py-0.5 bg-bg-primary text-text-dark text-sm rounded-full">
                {stars}
              </span>
            )}
          </a>
        </div>
      </footer>
    </div>
  );
}
