import { Composition } from "remotion";
import { SalazarHero, FPS, HEIGHT, WIDTH, DURATION } from "./SalazarHero";
import {
  ImobiliariaTour,
  IMOB_DURATION,
  IMOB_FPS,
  IMOB_HEIGHT,
  IMOB_WIDTH,
} from "./ImobiliariaTour";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SalazarHero"
        component={SalazarHero}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ImobiliariaTour"
        component={ImobiliariaTour}
        durationInFrames={IMOB_DURATION}
        fps={IMOB_FPS}
        width={IMOB_WIDTH}
        height={IMOB_HEIGHT}
      />
    </>
  );
};
