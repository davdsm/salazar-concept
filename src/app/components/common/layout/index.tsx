import { ReactNode, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ParallaxProvider } from "react-scroll-parallax";
import Header from "@/app/components/common/layout/header";
import Footer from "@/app/components/common/layout/footer";
import Loading from "@/app/components/common/layout/loader";

export default function Layout({
  entryComponent,
  children,
  hideLogo,
}: {
  entryComponent: ReactNode;
  children: ReactNode;
  hideLogo?: boolean;
}) {
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
      <main className={!section ? "main-animation" : ""}>
        <div className="bg-black">
          <Loading hideLogo={hideLogo} />

          <Header />

          {entryComponent}
        </div>

        {children}

        <Footer />
      </main>
    </ParallaxProvider>
  );
}
