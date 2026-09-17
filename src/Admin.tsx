import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import type { Doc, Id } from "../convex/_generated/dataModel";
import Rosco from "./Rosco";

const LETTERS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

export default function Admin() {
  const [editing, setEditing] = useState<Id<"roscos"> | null>(null);
  const light = useQuery(api.settings.get)?.light;
  const toggleLight = useMutation(api.settings.toggleLight);
  return (
    <div className="admin">
      <h1>Pasapalabra · Admin <button className="theme" onClick={() => toggleLight()}>{light ? "🌙 Modo oscuro" : "☀️ Modo claro"}</button></h1>
      {editing ? <Editor id={editing} onClose={() => setEditing(null)} /> : <>
        <GameControl />
        <RoscoList onEdit={setEditing} />
      </>}
    </div>
  );
}

function GameControl() {
  const game = useQuery(api.game.get);
  const roscos = useQuery(api.roscos.list) ?? [];
  const start = useMutation(api.game.start);
  const answer = useMutation(api.game.answer);
  const end = useMutation(api.game.end);
  const [roscoId, setRoscoId] = useState("");
  const [player, setPlayer] = useState("");

  if (!game) {
    return (
      <section>
        <h2>Nueva partida</h2>
        <form onSubmit={(e) => { e.preventDefault(); start({ roscoId: roscoId as Id<"roscos">, player }); }}>
          <select required value={roscoId} onChange={(e) => setRoscoId(e.target.value)}>
            <option value="">— rosco —</option>
            {roscos.map((r) => <option key={r._id} value={r._id}>{r.name}</option>)}
          </select>
          <input required placeholder="Nombre del jugador" value={player} onChange={(e) => setPlayer(e.target.value)} />
          <button>Empezar</button>
        </form>
      </section>
    );
  }

  const q = game.rosco.questions[game.current];
  return (
    <section className="control">
      <div>
        <h2>{game.player} · {game.rosco.name}</h2>
        {q ? (
          <>
            <p className="hint">{q.mode === "starts" ? "Empieza por" : "Contiene la"} <b>{q.letter}</b></p>
            <p className="big">{q.question}</p>
            <p>Respuesta: <b>{q.answer}</b></p>
            <div className="buttons">
              <button className="ok" onClick={() => answer({ action: "correct" })}>✓ Correcto</button>
              <button className="ko" onClick={() => answer({ action: "wrong" })}>✗ Incorrecto</button>
              <button onClick={() => answer({ action: "skip" })}>Pasapalabra</button>
            </div>
          </>
        ) : <p className="big">Fin del rosco</p>}
        <button className="danger" onClick={() => confirm("¿Terminar partida?") && end()}>Terminar partida</button>
      </div>
      <Rosco game={game} size={320} />
    </section>
  );
}

function RoscoList({ onEdit }: { onEdit: (id: Id<"roscos">) => void }) {
  const roscos = useQuery(api.roscos.list) ?? [];
  const create = useMutation(api.roscos.create);
  const remove = useMutation(api.roscos.remove);
  const [name, setName] = useState("");
  return (
    <section>
      <h2>Roscos</h2>
      <ul>
        {roscos.map((r) => (
          <li key={r._id}>
            {r.name} <small>({r.questions.filter((q) => q.question).length}/{r.questions.length})</small>
            <button onClick={() => onEdit(r._id)}>Editar</button>
            <button className="danger" onClick={() => confirm(`¿Borrar "${r.name}"?`) && remove({ id: r._id })}>Borrar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={async (e) => { e.preventDefault(); onEdit(await create({ name })); setName(""); }}>
        <input required placeholder="Nombre del nuevo rosco" value={name} onChange={(e) => setName(e.target.value)} />
        <button>Crear</button>
      </form>
    </section>
  );
}

function Editor({ id, onClose }: { id: Id<"roscos">; onClose: () => void }) {
  const rosco = useQuery(api.roscos.get, { id });
  if (!rosco) return null;
  return <EditorForm rosco={rosco} onClose={onClose} />;
}

function EditorForm({ rosco, onClose }: { rosco: Doc<"roscos">; onClose: () => void }) {
  const update = useMutation(api.roscos.update);
  const [name, setName] = useState(rosco.name);
  const [questions, setQuestions] = useState(rosco.questions);
  const set = (i: number, patch: Partial<Doc<"roscos">["questions"][number]>) =>
    setQuestions((qs) => qs.map((q, j) => (j === i ? { ...q, ...patch } : q)));
  const used = new Set(questions.map((q) => q.letter));
  const free = LETTERS.filter((l) => !used.has(l));
  const add = (letters: string[]) =>
    setQuestions((qs) =>
      [...qs, ...letters.map((letter) => ({ letter, mode: "starts" as const, question: "", answer: "" }))]
        .sort((a, b) => LETTERS.indexOf(a.letter) - LETTERS.indexOf(b.letter)),
    );

  return (
    <section>
      <input className="title" value={name} onChange={(e) => setName(e.target.value)} />
      <table>
        <thead><tr><th></th><th>Tipo</th><th>Pregunta</th><th>Respuesta</th><th></th></tr></thead>
        <tbody>
          {questions.map((q, i) => (
            <tr key={q.letter}>
              <td><b>{q.letter}</b></td>
              <td>
                <select value={q.mode} onChange={(e) => set(i, { mode: e.target.value as "starts" | "contains" })}>
                  <option value="starts">Empieza</option>
                  <option value="contains">Contiene</option>
                </select>
              </td>
              <td><input value={q.question} onChange={(e) => set(i, { question: e.target.value })} /></td>
              <td><input value={q.answer} onChange={(e) => set(i, { answer: e.target.value })} /></td>
              <td><button className="danger" onClick={() => setQuestions((qs) => qs.filter((_, j) => j !== i))}>✕</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {free.length > 0 && (
        <div className="buttons">
          <select value="" onChange={(e) => e.target.value && add([e.target.value])}>
            <option value="">+ Añadir letra</option>
            {free.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <button onClick={() => add(free)}>Añadir todas</button>
        </div>
      )}
      <div className="buttons">
        <button className="ok" onClick={async () => { await update({ id: rosco._id, name, questions }); onClose(); }}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </section>
  );
}
