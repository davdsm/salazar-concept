import Intro from "@/app/components/intro/Intro";
import LangSwitch from "@/app/components/intro/LangSwitch";
import SmoothScroll from "@/app/components/common/smooth-scroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Intro />
      <LangSwitch />
    </>
  );
}
