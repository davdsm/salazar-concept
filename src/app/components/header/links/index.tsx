export default function Links({ handleClick }: { handleClick: () => void }) {
  return (
    <>
      <a
        href="#concept"
        className="text-base leading-6 underline"
        onClick={handleClick}
      >
        Find more about our <b>Concept</b>
      </a>
      <a href="#work" className="text-base leading-6" onClick={handleClick}>
        Discover our work
      </a>
      <a href="#clients" className="text-base leading-6" onClick={handleClick}>
        Clients
      </a>
      <a href="#services" className="text-base leading-6" onClick={handleClick}>
        Services
      </a>
      <a href="#culture" className="text-base leading-6" onClick={handleClick}>
        Culture
      </a>
      <a
        href="#talk"
        className="text-base leading-6 underline"
        onClick={handleClick}
      >
        Let&apos;s <b>Talk</b>
      </a>
    </>
  );
}
