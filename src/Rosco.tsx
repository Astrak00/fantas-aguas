import type { Doc } from "../convex/_generated/dataModel";

type Props = { game: Doc<"games"> & { rosco: Doc<"roscos"> }; size: number };

// Ring of letters. Colors: pending gray, correct green, wrong red, current highlighted.
export default function Rosco({ game, size }: Props) {
  const n = game.rosco.questions.length;
  const r = size / 2 - size * 0.07;
  return (
    <div className="rosco" style={{ width: size, height: size }}>
      {game.rosco.questions.map((q, i) => {
        const a = (i / n) * 2 * Math.PI - Math.PI / 2;
        return (
          <div
            key={q.letter}
            className={`letter ${game.results[i]} ${i === game.current ? "current" : ""}`}
            style={{ left: size / 2 + r * Math.cos(a), top: size / 2 + r * Math.sin(a), fontSize: size * 0.045 }}
          >
            {q.letter}
          </div>
        );
      })}
    </div>
  );
}
