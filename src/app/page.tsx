export default function Home() {
  return (
    <main className="maintenance">
      <div className="maintenance-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="maintenance-animal"
          src="/logo/logo.gif"
          alt=""
        />
        <h1 className="maintenance-copy">Cooking Something Special</h1>
      </div>

      <div className="maintenance-links">
        <a href="mailto:geral@salazarconcept.com">geral@salazarconcept.com</a>
        <a
          href="https://www.instagram.com/_salazarconcept_/"
          target="_blank"
          rel="noreferrer"
        >
          @_salazarconcept_
        </a>
      </div>
    </main>
  );
}
