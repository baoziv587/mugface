import React, { useMemo } from "react";

function hashString(str: string, seed: number = 0): number {
  let hash = seed;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

const EYES = [
  (color: string) => (
    <g fill={color}>
      <circle cx="35" cy="45" r="5" />
      <circle cx="65" cy="45" r="5" />
    </g>
  ),
  (color: string) => (
    <g stroke={color} strokeWidth="4" strokeLinecap="round" fill="none">
      <path d="M 30 50 Q 35 40 40 50" />
      <path d="M 60 50 Q 65 40 70 50" />
    </g>
  ),
  (color: string) => (
    <g stroke={color} strokeWidth="4" strokeLinecap="round" fill="none">
      <path d="M 30 40 L 40 50 L 30 60" />
      <path d="M 70 40 L 60 50 L 70 60" />
    </g>
  ),
  (color: string) => (
    <g stroke={color} strokeWidth="4" fill="none">
      <circle cx="35" cy="45" r="6" />
      <circle cx="65" cy="45" r="6" />
    </g>
  ),
  (color: string) => (
    <g stroke={color} strokeWidth="4" strokeLinecap="round" fill="none">
      <path d="M 30 50 Q 35 40 40 50" />
      <line x1="60" y1="50" x2="70" y2="50" />
    </g>
  ),
  (color: string) => (
    <g fill={color}>
      <polygon points="35,38 37,43 42,43 38,46 39,51 35,48 31,51 32,46 28,43 33,43" />
      <polygon points="65,38 67,43 72,43 68,46 69,51 65,48 61,51 62,46 58,43 63,43" />
    </g>
  ),
  (color: string) => (
    <g fill={color}>
      <circle cx="35" cy="45" r="4" />
      <rect x="33" y="52" width="4" height="8" rx="2" fill="#60A5FA" />
      <circle cx="65" cy="45" r="4" />
      <rect x="63" y="52" width="4" height="8" rx="2" fill="#60A5FA" />
    </g>
  ),
  (color: string) => (
    <g stroke={color} strokeWidth="4" fill="none">
      <g className="eye-spin-left">
        <circle cx="35" cy="45" r="6" strokeDasharray="18 10" strokeLinecap="round" />
      </g>
      <g className="eye-spin-right">
        <circle cx="65" cy="45" r="6" strokeDasharray="18 10" strokeLinecap="round" />
      </g>
    </g>
  ),
];

const MOUTHS = [
  (color: string) => (
    <line
      x1="45"
      y1="65"
      x2="55"
      y2="65"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  ),
  (color: string) => (
    <path
      d="M 40 60 Q 50 75 60 60"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  ),
  (color: string) => (
    <circle cx="50" cy="65" r="6" stroke={color} strokeWidth="4" fill="none" />
  ),
  (color: string) => (
    <path
      d="M 40 60 Q 45 70 50 60 Q 55 70 60 60"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  ),
  (color: string) => (
    <polygon
      points="45,60 55,60 50,70"
      stroke={color}
      strokeWidth="4"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  (color: string) => (
    <path
      d="M 40 70 Q 50 60 60 70"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  ),
  (color: string) => (
    <g>
      <line
        x1="45"
        y1="60"
        x2="55"
        y2="60"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M 47 60 L 47 70 Q 50 75 53 70 L 53 60" fill="#F87171" />
    </g>
  ),
];

const CHEEKS = [
  () => null,
  () => (
    <g fill="#FCA5A5" opacity="0.6">
      <circle cx="20" cy="55" r="6" />
      <circle cx="80" cy="55" r="6" />
    </g>
  ),
  () => (
    <g stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" opacity="0.8">
      <line x1="15" y1="52" x2="25" y2="58" />
      <line x1="18" y1="50" x2="28" y2="56" />
      <line x1="75" y1="58" x2="85" y2="52" />
      <line x1="72" y1="56" x2="82" y2="50" />
    </g>
  ),
];

const SHAPES = [
  (color: string) => <circle cx="50" cy="50" r="50" fill={color} />,
  (color: string) => (
    <rect x="0" y="0" width="100" height="100" rx="30" fill={color} />
  ),
  (color: string) => (
    <rect x="0" y="0" width="100" height="100" rx="10" fill={color} />
  ),
  (color: string) => (
    <path
      d="M 50 0 C 80 0 100 20 100 50 C 100 80 80 100 50 100 C 20 100 0 80 0 50 C 0 20 20 0 50 0 Z"
      fill={color}
    />
  ),
];

const PALETTES = [
  { bg: "#FEF08A", fg: "#854D0E" },
  { bg: "#A7F3D0", fg: "#065F46" },
  { bg: "#BFDBFE", fg: "#1E3A8A" },
  { bg: "#FBCFE8", fg: "#831843" },
  { bg: "#E9D5FF", fg: "#581C87" },
  { bg: "#FED7AA", fg: "#7C2D12" },
  { bg: "#E5E7EB", fg: "#1F2937" },
  { bg: "#1F2937", fg: "#F3F4F6" },
  { bg: "#FF4500", fg: "#FFFFFF" },
  { bg: "#0047FF", fg: "#FFFFFF" },
];

export type Emotion = 'neutral' | 'happy' | 'sad' | 'anxious';

const EMOTION_EYES: Record<Emotion, number[]> = {
  neutral: [0, 3, 4],
  happy: [1, 5],
  sad: [2, 6],
  anxious: [7], // Loading eyes
};

const EMOTION_MOUTHS: Record<Emotion, number[]> = {
  neutral: [0, 2],
  happy: [1, 6],
  sad: [4, 5],
  anxious: [3, 0],
};

export interface MugFaceProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  seed?: number;
  animate?: boolean;
  emotion?: Emotion;
  borderRadius?: number;
}

export const MugFace: React.FC<MugFaceProps> = ({
  name,
  seed = 0,
  animate = true,
  emotion,
  borderRadius,
  ...props
}) => {
  const hash = useMemo(() => hashString(name, seed), [name, seed]);

  const availableEyes = emotion ? EMOTION_EYES[emotion] : EYES.map((_, i) => i);
  const availableMouths = emotion ? EMOTION_MOUTHS[emotion] : MOUTHS.map((_, i) => i);

  const shapeIndex = (hash >>> 0) % SHAPES.length;
  const eyeIndex = availableEyes[(hash >>> 1) % availableEyes.length];
  const mouthIndex = availableMouths[(hash >>> 2) % availableMouths.length];
  const cheekIndex = (hash >>> 3) % CHEEKS.length;
  const paletteIndex = (hash >>> 4) % PALETTES.length;

  const palette = PALETTES[paletteIndex];

  const Shape = borderRadius !== undefined 
    ? (color: string) => <rect x="0" y="0" width="100" height="100" rx={borderRadius} fill={color} />
    : SHAPES[shapeIndex];
    
  const Eye = EYES[eyeIndex];
  const Mouth = MOUTHS[mouthIndex];
  const Cheek = CHEEKS[cheekIndex];

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      {animate && (
        <style>
          {`
            @keyframes blink {
              0%, 96%, 98% { transform: scaleY(1); }
              97% { transform: scaleY(0.1); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes spin {
              100% { transform: rotate(360deg); }
            }
            .face-eyes {
              transform-origin: 50% 45px;
              animation: blink 4s infinite;
            }
            .face-group {
              animation: float 3s ease-in-out infinite;
            }
            .eye-spin-left {
              transform-origin: 35px 45px;
              animation: spin 1s linear infinite;
            }
            .eye-spin-right {
              transform-origin: 65px 45px;
              animation: spin 1s linear infinite;
            }
          `}
        </style>
      )}
      <g className={animate ? "face-group" : ""}>
        {Shape(palette.bg)}
        {Cheek()}
        <g className={animate ? "face-eyes" : ""}>{Eye(palette.fg)}</g>
        {Mouth(palette.fg)}
      </g>
    </svg>
  );
};
