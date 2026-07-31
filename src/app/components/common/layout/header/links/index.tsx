import { AppContext } from "@/app/layout";
import Link from "next/link";
import { useContext } from "react";

export default function Links({ handleClick }: { handleClick: () => void }) {
  const { pageTransition } = useContext(AppContext);

  return (
    <>
      <Link
        href="/?section=concept"
        className="text-base leading-6 underline"
        onClick={(e) => {
          handleClick();
          pageTransition(e, "/?section=concept");
        }}
        scroll={false}
      >
        Find more about our <b>Concept</b>
      </Link>
      <Link
        href="/?section=work"
        className="text-base leading-6"
        onClick={(e) => {
          handleClick();
          pageTransition(e, "/?section=work");
        }}
        scroll={false}
      >
        Discover our work
      </Link>
      <Link
        href="/?section=clients"
        className="text-base leading-6"
        onClick={(e) => {
          handleClick();
          pageTransition(e, "/?section=clients");
        }}
        scroll={false}
      >
        Clients
      </Link>
      <Link
        href="/?section=services"
        className="text-base leading-6"
        onClick={(e) => {
          handleClick();
          pageTransition(e, "/?section=services");
        }}
        scroll={false}
      >
        Services
      </Link>
      {/* <Link
        href="/?section=culture"
        className="text-base leading-6"
        onClick={(e) => {
          handleClick();
          pageTransition(e, "/?section=culture");
        }}
        scroll={false}
      >
        Culture
      </Link> */}
      <Link
        href="/?section=talk"
        className="text-base leading-6 underline"
        onClick={(e) => {
          handleClick();
          pageTransition(e, "/?section=talk");
        }}
        scroll={false}
      >
        Let&apos;s <b>Talk</b>
      </Link>
    </>
  );
}
