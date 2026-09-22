import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  COLORS,
  ChameleonMark,
  Flicker,
  Grain,
  Leak,
  Plate,
  SlamStill,
  Solid,
  Still,
  Stutter,
  WipeStill,
  Wordmark,
} from "./layers";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

type Beat = {
  dur: number;
  node: React.ReactNode;
  leak?: string;
};

const beats: Beat[] = [
  { dur: 8, node: <Solid color={COLORS.black} /> },
  { dur: 28, node: <ChameleonMark /> },
  { dur: 3, node: <Solid color={COLORS.white} /> },
  { dur: 16, node: <Plate src="plates/navio.mp4" trim={0.2} /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 12, node: <SlamStill src="stills/navio-air.jpg" /> },
  { dur: 3, node: <Solid color={COLORS.white} /> },
  { dur: 16, node: <Plate src="plates/navio.mp4" trim={2.4} />, leak: "#ffe0a8" },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 12, node: <Still src="stills/navio-detail.jpg" from={1.08} to={1.18} /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 10, node: <Stutter src="stills/navio-air.jpg" /> },
  { dur: 12, node: <Plate src="plates/navio.mp4" trim={4.6} /> },
  { dur: 4, node: <Solid color={COLORS.yellow} /> },
  { dur: 14, node: <SlamStill src="stills/panda-mark.jpg" /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 10, node: <Still src="stills/panda-food.jpg" from={1.04} to={1.2} /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 10, node: <Still src="stills/panda-food.jpg" from={1.2} to={1.08} /> },
  { dur: 8, node: <Flicker a="stills/panda-food.jpg" b="stills/panda-food-2.jpg" /> },
  { dur: 10, node: <WipeStill src="stills/panda-food-2.jpg" /> },
  { dur: 3, node: <Solid color={COLORS.white} /> },
  { dur: 16, node: <Plate src="plates/vila.mp4" trim={0.15} /> },
  { dur: 3, node: <Solid color={COLORS.orange} /> },
  { dur: 14, node: <Plate src="plates/vila.mp4" trim={2.8} />, leak: "#ff7a3a" },
  { dur: 12, node: <Plate src="plates/vila.mp4" trim={5.1} /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 14, node: <SlamStill src="stills/vila-helmet.jpg" /> },
  { dur: 3, node: <Solid color={COLORS.orange} /> },
  { dur: 12, node: <WipeStill src="stills/falperra.jpg" direction="up" /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 12, node: <SlamStill src="stills/elenco.jpg" /> },
  { dur: 10, node: <Still src="stills/falperra.jpg" from={1.12} to={1.02} /> },
  { dur: 4, node: <Solid color={COLORS.white} /> },
  { dur: 16, node: <SlamStill src="stills/lidia-mark.jpg" /> },
  { dur: 3, node: <Solid color={COLORS.white} /> },
  { dur: 12, node: <Still src="stills/lidia-gold.jpg" /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 10, node: <Stutter src="stills/lidia-gold.jpg" /> },
  { dur: 12, node: <SlamStill src="stills/ngc.jpg" /> },
  { dur: 3, node: <Solid color={COLORS.white} /> },
  { dur: 12, node: <Still src="stills/aquitex.jpg" /> },
  { dur: 16, node: <Plate src="plates/aquitex.mp4" trim={0.4} />, leak: "#ffd0c0" },
  { dur: 12, node: <Plate src="plates/aquitex.mp4" trim={3.2} /> },
  { dur: 3, node: <Solid color={COLORS.black} /> },
  { dur: 12, node: <WipeStill src="stills/elenco.jpg" /> },
  { dur: 8, node: <Flicker a="stills/ngc.jpg" b="stills/elenco.jpg" /> },
  { dur: 16, node: <Plate src="plates/robot.mp4" trim={0.3} /> },
  { dur: 3, node: <Solid color={COLORS.white} /> },
  { dur: 14, node: <Plate src="plates/robot.mp4" trim={3.1} /> },
  { dur: 12, node: <Plate src="plates/robot.mp4" trim={5.4} /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 16, node: <Plate src="plates/fortcars.mp4" trim={0.5} />, leak: "#fff4c8" },
  { dur: 3, node: <Solid color={COLORS.yellow} /> },
  { dur: 14, node: <Plate src="plates/fortcars.mp4" trim={2.2} /> },
  { dur: 12, node: <Plate src="plates/fortcars.mp4" trim={4.8} /> },
  { dur: 4, node: <Solid color={COLORS.yellow} /> },
  { dur: 10, node: <Still src="stills/queima-1.jpg" from={1.1} to={1.22} /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 10, node: <Still src="stills/queima-2.jpg" /> },
  { dur: 2, node: <Solid color={COLORS.white} /> },
  { dur: 10, node: <WipeStill src="stills/queima-3.jpg" direction="up" /> },
  { dur: 8, node: <Stutter src="stills/queima-1.jpg" /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 10, node: <Still src="stills/festival.jpg" /> },
  { dur: 12, node: <SlamStill src="stills/festival.jpg" /> },
  { dur: 2, node: <Solid color={COLORS.black} /> },
  { dur: 10, node: <SlamStill src="stills/jam.jpg" /> },
  { dur: 16, node: <Plate src="plates/navio.mp4" trim={6.2} /> },
  { dur: 10, node: <SlamStill src="stills/vila-helmet.jpg" /> },
  { dur: 3, node: <Solid color={COLORS.beige} /> },
  { dur: 12, node: <ChameleonMark /> },
  { dur: 4, node: <Solid color={COLORS.white} /> },
  { dur: 40, node: <Wordmark /> },
  { dur: 3, node: <Solid color={COLORS.white} /> },
  { dur: 36, node: <ChameleonMark /> },
  { dur: 8, node: <Solid color={COLORS.black} /> },
];

export const DURATION = beats.reduce((sum, beat) => sum + beat.dur, 0);

if (DURATION !== 720) {
  throw new Error(`SalazarHero timeline is ${DURATION} frames, expected 720`);
}

export const SalazarHero: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {beats.map((beat, index) => {
        const start = from;
        from += beat.dur;
        return (
          <Sequence
            key={`${start}-${index}`}
            from={start}
            durationInFrames={beat.dur}
            premountFor={beat.dur > 8 ? 15 : 8}
          >
            {beat.node}
            {beat.leak ? <Leak color={beat.leak} /> : null}
          </Sequence>
        );
      })}
      <Grain />
    </AbsoluteFill>
  );
};
