import { ReactNode, useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ParallaxProvider } from "react-scroll-parallax";
import Header from "@/app/components/common/layout/header";
import Footer from "@/app/components/common/layout/footer";
import Loading from "@/app/components/common/layout/loader";

import { AppContext } from "@/app/layout";

export default function Layout({
  entryComponent,
  children,
  keepLogo,
}: {
  entryComponent: ReactNode;
  children: ReactNode;
  keepLogo?: boolean;
}) {
  const { firstLoad } = useContext(AppContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (section)
      setTimeout(() => {
        window.history.replaceState(null, "", "/");
        document.getElementById(section)?.scrollIntoView();
      }, 250);
  }, [router, section]);

  return (
    <ParallaxProvider>
      <main className={!firstLoad ? "main-animation" : ""}>
        <div>
          {(!firstLoad || keepLogo) && <Loading hideLogo={!keepLogo} />}

          <Header />

          {entryComponent}
        </div>

        {children}

        <Footer />
      </main>
    </ParallaxProvider>
  );
}
