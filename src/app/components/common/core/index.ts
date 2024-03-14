import { useRouter, usePathname } from "next/navigation";

export const useOpenLinkAnimation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const openLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    if (pathname !== link.split("?")[0]) {
      /*
       * prevent Link to go
       */
      e.preventDefault();

      /*
       * get the cortin up
       */
      const cortin: HTMLElement = document.getElementById("cortin")!;
      cortin.className = "up";

      /*
       * get the cortin down
       */
      setTimeout(() => {
        cortin.className = "down";
      }, 1000);

      /*
       * normalize
       */
      setTimeout(() => {
        cortin.className = "";
        /*
         * go to the link
         */
        router.push(link);
      }, 2000);
    }
  };

  return { openLink };
};
