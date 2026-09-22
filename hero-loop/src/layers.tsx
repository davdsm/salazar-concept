import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";

export const COLORS = {
  black: "#050505",
  white: "#f4f1ea",
  beige: "#f2efea",
  yellow: "#f5c400",
  orange: "#ff3b0f",
  red: "#c4122f",
};

const fill: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const Solid: React.FC<{ color: string }> = ({ color }) => (
  <AbsoluteFill style={{ backgroundColor: color }} />
);

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const x = (frame * 37) % 180;
  const y = (frame * 53) % 180;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: 0.11,
        mixBlendMode: "overlay",
        backgroundImage: `url(${staticFile("noise.png")})`,
        backgroundRepeat: "repeat",
        backgroundPosition: `${x}px ${y}px`,
      }}
    />
  );
};

export const Still: React.FC<{
  src: string;
  from?: number;
  to?: number;
}> = ({ src, from = 1, to = 1.12 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 40], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "extend",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ ...fill, scale }} />
    </AbsoluteFill>
  );
};

export const SlamStill: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 10], [1.42, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ ...fill, scale }} />
    </AbsoluteFill>
  );
};

export const WipeStill: React.FC<{ src: string; direction?: "left" | "up" }> = ({
  src,
  direction = "left",
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 8], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0, 1),
  });
  const clip =
    direction === "up"
      ? `inset(${p}% 0 0 0)`
      : `inset(0 0 0 ${p}%)`;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <AbsoluteFill style={{ clipPath: clip }}>
        <Img src={staticFile(src)} style={fill} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Plate: React.FC<{ src: string; trim: number; rate?: number }> = ({
  src,
  trim,
  rate = 1.28,
}) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Video
        src={staticFile(src)}
        trimBefore={Math.round(trim * fps)}
        playbackRate={rate}
        muted
        style={fill}
      />
    </AbsoluteFill>
  );
};

export const Stutter: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const on = frame % 4 < 2;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, overflow: "hidden" }}>
      {on ? <Img src={staticFile(src)} style={fill} /> : null}
    </AbsoluteFill>
  );
};

export const Flicker: React.FC<{ a: string; b: string }> = ({ a, b }) => {
  const frame = useCurrentFrame();
  const src = frame % 4 < 2 ? a : b;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, overflow: "hidden" }}>
      <Img src={staticFile(src)} style={fill} />
    </AbsoluteFill>
  );
};

export const Leak: React.FC<{ color?: string }> = ({ color = "#ffb56a" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 4, 12], [0, 0.72, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, 12], [18, 72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity,
        mixBlendMode: "screen",
        background: `radial-gradient(circle at ${x}% 40%, ${color} 0%, transparent 55%)`,
      }}
    />
  );
};

export const ChameleonMark: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 12], [1.55, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const rot = interpolate(frame, [0, 18], [-8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Img
        src={staticFile("chameleon.svg")}
        style={{
          width: "38%",
          height: "auto",
          scale,
          rotate: `${rot}deg`,
        }}
      />
    </AbsoluteFill>
  );
};

export const Wordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 11], [1.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.beige,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Img
        src={staticFile("wordmark.png")}
        style={{ width: "58%", height: "auto", scale }}
      />
    </AbsoluteFill>
  );
};
