import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont as loadBarlow } from "@remotion/google-fonts/BarlowCondensed";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily: sansFamily } = loadBarlow("normal", {
  weights: ["600", "800"],
  subsets: ["latin", "latin-ext"],
});

const { fontFamily: scriptFamily } = loadPlayfair("italic", {
  weights: ["700", "900"],
  subsets: ["latin", "latin-ext"],
});

export const IMOB_FPS = 30;
export const IMOB_WIDTH = 1080;
export const IMOB_HEIGHT = 1920;
export const IMOB_DURATION = 1525;

const CYAN = "#2EE6D6";
const WHITE = "#F7F7F5";
const IN = 8;
const OUT = 7;
const STAGGER = 3;
const snap = Easing.bezier(0.16, 1, 0.3, 1);

type Role = "sans" | "script" | "small";
type Size = "sm" | "md" | "lg" | "xl";

type Line = {
  t: string;
  role: Role;
  size: Size;
};

type Block = {
  from: number;
  to: number;
  lines: Line[];
};

const SIZES: Record<Size, number> = {
  sm: 72,
  md: 108,
  lg: 132,
  xl: 168,
};

const BLOCKS: Block[] = [
  {
    from: 0.85,
    to: 2.05,
    lines: [
      { t: "centralizado", role: "sans", size: "md" },
      { t: "de Guimarães", role: "script", size: "md" },
    ],
  },
  {
    from: 2.05,
    to: 3.85,
    lines: [
      { t: "perto", role: "small", size: "sm" },
      { t: "do estádio", role: "sans", size: "md" },
      { t: "do Vitória", role: "script", size: "lg" },
    ],
  },
  {
    from: 3.85,
    to: 5.15,
    lines: [
      { t: "e poucos metros do", role: "small", size: "sm" },
      { t: "Guimarães", role: "script", size: "lg" },
      { t: "Shopping", role: "script", size: "lg" },
    ],
  },
  {
    from: 5.15,
    to: 6.95,
    lines: [
      { t: "e do acesso", role: "small", size: "sm" },
      { t: "autoestrada ao", role: "sans", size: "md" },
      { t: "Porto", role: "script", size: "xl" },
    ],
  },
  {
    from: 6.95,
    to: 8.3,
    lines: [
      { t: "apartamento", role: "sans", size: "md" },
      { t: "T3", role: "script", size: "xl" },
    ],
  },
  {
    from: 8.3,
    to: 9.9,
    lines: [
      { t: "que foi", role: "small", size: "sm" },
      { t: "remodelado", role: "sans", size: "lg" },
    ],
  },
  {
    from: 13.7,
    to: 16.0,
    lines: [
      { t: "Venha conhecer", role: "sans", size: "md" },
      { t: "apartamento T3", role: "script", size: "lg" },
    ],
  },
  {
    from: 16.0,
    to: 18.1,
    lines: [
      { t: "106 metros", role: "sans", size: "lg" },
      { t: "quadrados", role: "script", size: "lg" },
    ],
  },
  {
    from: 18.1,
    to: 20.4,
    lines: [
      { t: "uma cozinha", role: "sans", size: "md" },
      { t: "open space", role: "script", size: "lg" },
    ],
  },
  {
    from: 24.6,
    to: 26.6,
    lines: [
      { t: "Esta casa", role: "small", size: "sm" },
      { t: "de banho", role: "sans", size: "lg" },
      { t: "de apoio", role: "small", size: "sm" },
    ],
  },
  {
    from: 26.6,
    to: 28.0,
    lines: [{ t: "a dois quartos", role: "script", size: "lg" }],
  },
  {
    from: 29.6,
    to: 32.2,
    lines: [
      { t: "Temos um", role: "small", size: "sm" },
      { t: "quarto", role: "script", size: "xl" },
    ],
  },
  {
    from: 33.6,
    to: 35.8,
    lines: [
      { t: "Temos um segundo", role: "small", size: "sm" },
      { t: "quarto", role: "script", size: "xl" },
    ],
  },
  {
    from: 35.8,
    to: 38.2,
    lines: [
      { t: "e por fim", role: "small", size: "sm" },
      { t: "uma suíte", role: "script", size: "xl" },
    ],
  },
  {
    from: 38.7,
    to: 41.5,
    lines: [
      { t: "Apartamento", role: "sans", size: "md" },
      { t: "em todas as", role: "small", size: "sm" },
      { t: "divisões", role: "sans", size: "lg" },
    ],
  },
  { from: 41.5, to: 42.9, lines: [{ t: "em vinil", role: "script", size: "xl" }] },
  {
    from: 42.9,
    to: 45.2,
    lines: [
      { t: "e as casas de", role: "small", size: "sm" },
      { t: "chuveiro", role: "script", size: "xl" },
    ],
  },
];

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const KineticLine: React.FC<{
  line: Line;
  delay: number;
  duration: number;
}> = ({ line, delay, duration }) => {
  const frame = useCurrentFrame();
  const enter = delay;
  const exit = Math.max(enter + IN + 2, duration - OUT);

  const scale = interpolate(frame, [enter, enter + IN], [1.38, 1], {
    ...clamp,
    easing: snap,
  });
  const blur = interpolate(
    frame,
    [enter, enter + IN, exit, duration],
    [14, 0, 0, 10],
    clamp,
  );
  const opacity = interpolate(
    frame,
    [enter, enter + IN * 0.55, exit, duration],
    [0, 1, 1, 0],
    clamp,
  );

  const isScript = line.role === "script";
  const isSmall = line.role === "small";

  return (
    <div
      style={{
        opacity,
        scale,
        filter: `blur(${blur}px)`,
        fontFamily: isScript ? scriptFamily : sansFamily,
        fontWeight: isScript ? 900 : isSmall ? 600 : 800,
        fontStyle: isScript ? "italic" : "normal",
        fontSize: SIZES[line.size],
        lineHeight: isScript ? 0.92 : 0.84,
        letterSpacing: isScript ? "-0.02em" : "-0.045em",
        color: isScript ? CYAN : WHITE,
        textAlign: "center",
        textTransform: isScript ? "none" : "none",
        textShadow: isScript
          ? "0 4px 28px rgba(0,0,0,0.45)"
          : "0 3px 22px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.8)",
        whiteSpace: "normal",
        maxWidth: 936,
      }}
    >
      {line.t}
    </div>
  );
};

const KineticBlock: React.FC<{ block: Block }> = ({ block }) => {
  const { fps } = useVideoConfig();
  const duration = Math.round((block.to - block.from) * fps);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "0 72px",
        translate: "0px -6%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          maxWidth: 936,
        }}
      >
        {block.lines.map((line, i) => (
          <KineticLine
            key={`${line.t}-${i}`}
            line={line}
            delay={i * STAGGER}
            duration={duration}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const TourPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoIn = Math.round(46.6 * fps);
  const crop = interpolate(frame, [logoIn - 18, logoIn], [1, 0], clamp);
  const scale = interpolate(crop, [0, 1], [1, 1.42]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          scale,
          transformOrigin: "50% 0%",
        }}
      >
        <Video
          src={staticFile("plates/tour-prestiti.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const ImobiliariaTour: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <TourPlate />
      {BLOCKS.map((block) => {
        const from = Math.round(block.from * fps);
        const duration = Math.round((block.to - block.from) * fps);
        return (
          <Sequence key={`${block.from}-${block.lines[0].t}`} from={from} durationInFrames={duration}>
            <KineticBlock block={block} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
