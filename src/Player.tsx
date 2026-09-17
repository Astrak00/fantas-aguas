import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Rosco from "./Rosco";

export default function Player() {
  const game = useQuery(api.game.get);
  if (game === undefined) return null;
  if (!game) return <div className="screen idle">Esperando partida…</div>;

  const q = game.rosco.questions[game.current];
  const correct = game.results.filter((r) => r === "correct").length;
  const wrong = game.results.filter((r) => r === "wrong").length;

  return (
    <div className="screen">
      <div className="stage">
        <Rosco game={game} size={Math.min(window.innerWidth, window.innerHeight * 0.72)} />
        <div className="center">
          <div className="player">{game.player}</div>
          <div className="score"><span className="ok">{correct}</span> · <span className="ko">{wrong}</span></div>
        </div>
      </div>
      <div className="question">
        {q ? (
          <>
            <div className="hint">{q.mode === "starts" ? "Empieza por" : "Contiene la"} <b>{q.letter}</b></div>
            <div className="text">{q.question}</div>
          </>
        ) : (
          <div className="text">¡Fin del rosco!</div>
        )}
      </div>
    </div>
  );
}
