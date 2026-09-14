export default function MaskedLine({
  text,
  wrapWords = false,
}: {
  text: string;
  wrapWords?: boolean;
}) {
  const chars = (value: string, keyPrefix: string) =>
    value.split("").map((char, index) => (
      <span className="text-clip" key={`${keyPrefix}-${char}-${index}`}>
        <span className={char === " " ? "text-char is-space" : "text-char"}>
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));

  if (!wrapWords) return <>{chars(text, "c")}</>;

  return (
    <span className="text-line">
      {text.split(" ").map((word, wordIndex, words) => (
        <span className="text-word" key={`${word}-${wordIndex}`}>
          {chars(word, `${wordIndex}`)}
          {wordIndex < words.length - 1 ? chars(" ", `s${wordIndex}`) : null}
        </span>
      ))}
    </span>
  );
}
