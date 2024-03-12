import Link from "next/link";

export default function Links({ handleClick }: { handleClick: () => void }) {
  return (
    <>
      <Link
        href="/?section=concept"
        className="text-base leading-6 underline"
        onClick={handleClick}
        scroll={false}
      >
        Find more about our <b>Concept</b>
      </Link>
      <Link
        href="/?section=work"
        className="text-base leading-6"
        onClick={handleClick}
        scroll={false}
      >
        Discover our work
      </Link>
      <Link
        href="/?section=clients"
        className="text-base leading-6"
        onClick={handleClick}
        scroll={false}
      >
        Clients
      </Link>
      <Link
        href="/?section=services"
        className="text-base leading-6"
        onClick={handleClick}
        scroll={false}
      >
        Services
      </Link>
      {/* <Link
        href="/?section=culture"
        className="text-base leading-6"
        onClick={handleClick}
        scroll={false}
      >
        Culture
      </Link> */}
      <Link
        href="/?section=talk"
        className="text-base leading-6 underline"
        onClick={handleClick}
        scroll={false}
      >
        Let&apos;s <b>Talk</b>
      </Link>
    </>
  );
}
