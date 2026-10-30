import { internalMutation } from "./_generated/server";

const s = "starts" as const;
const c = "contains" as const;

// Base rosco. Run with `npx convex run seed:pagalafanta` (add `--prod` for production).
const PAGALAFANTA = [
  { letter: "A", mode: s, answer: "AMIGO", question: "Persona con la que se mantiene una relación afectiva, de confianza y reciprocidad, no basada en vínculos familiares ni sexuales" },
  { letter: "B", mode: s, answer: "BIBLIA", question: "Coloquial, sinónimo de sermón, amonestación o reprensión insistente y larga" },
  { letter: "C", mode: s, answer: "COMENTARIOS", question: "Plural, juicio, parecer, mención o consideración que se hace, oralmente o por escrito, acerca de alguien o algo" },
  { letter: "D", mode: s, answer: "DISCULPAS", question: "Plural, razón que se da o causa que se alega para excusar o purgar un hecho" },
  { letter: "E", mode: s, answer: "ENVIDIA", question: "Tristeza, pesar o disgusto por el bien ajeno" },
  { letter: "F", mode: c, answer: "CONFIANZA", question: "Esperanza firme que se tiene de alguien o algo" },
  { letter: "G", mode: s, answer: "GRUPO", question: "Pluralidad de seres o cosas que forman un conjunto, material o mentalmente considerado" },
  { letter: "H", mode: s, answer: "HIPÓCRITA", question: "Persona que demuestra incoherencia con sus sentimientos, ideas o valores al actuar" },
  { letter: "I", mode: s, answer: "IMBÉCIL", question: "Sinónimo de idiota, tonto o falto de inteligencia" },
  { letter: "J", mode: c, answer: "NOCHEVIEJA", question: "Festividad epicentro del declive del grupo de amigos en el que se basan estos minijuegos, última noche del año" },
  { letter: "K", mode: s, answer: "KARAOKE", question: "Diversión consistente en interpretar una canción sobre un fondo musical grabado, mientras se sigue la letra que aparece en una pantalla" },
  { letter: "L", mode: c, answer: "TRANQUILAMENTE", question: "Adverbio, referido al tono mantenido por una de las partes: sin agitación, prisa o nervios, con normalidad y sin exageración" },
  { letter: "M", mode: s, answer: "MENSAJE", question: "Conjunto de señales, signos o símbolos que son objeto de una comunicación" },
  { letter: "N", mode: s, answer: "NPCs", question: "Término empleado en la cultura pop para definir a personas carentes de opinión propia, pensamiento crítico e iniciativa individual, que actúan por inercia y siguen tendencias sin cuestionarlas" },
  { letter: "Ñ", mode: c, answer: "AÑOS", question: "Plural, intervalo indeterminado y subjetivamente extenso de tiempo" },
  { letter: "O", mode: c, answer: "DERECHO", question: "Poder, facultad o potestad otorgado a un sujeto para actuar de una manera determinada o exigir de otra persona el cumplimiento de un deber o una prestación" },
  { letter: "P", mode: s, answer: "PAGAFANTAS", question: "Persona que, estando en una relación de amistad cercana o de cortejo respecto a otra, resulta incapaz de materializar un encuentro sentimental con ella" },
  { letter: "Q", mode: c, answer: "ALCORNOQUE", question: "Persona ignorante y zafia. Árbol siempre verde, de la familia de las fagáceas, de ocho a diez metros de altura, copa muy extensa, madera durísima, corteza formada por una gruesa capa de corcho, hojas aovadas, enteras o dentadas, flores poco visibles y bellotas por frutos" },
  { letter: "R", mode: s, answer: "RÍO", question: "Corriente de agua continua y más o menos caudalosa que va a desembocar a otra, en un lago o en el mar" },
  { letter: "S", mode: s, answer: "SOBERBIA", question: "Altivez y apetito desordenado de ser preferido a otros" },
  { letter: "T", mode: c, answer: "INICIATIVA", question: "Ímpetu o primer paso hacia una acción" },
  { letter: "U", mode: c, answer: "ULTIMÁTUM", question: "Resolución terminante y definitiva, comunicada por escrito" },
  { letter: "V", mode: s, answer: "VASALLO", question: "Sinónimo de siervo, persona que reconoce a otra por superior o tiene dependencia de ella" },
  { letter: "W", mode: c, answer: "DARWINISMO", question: "Teoría según la cual la evolución de las especies se produce por selección natural de los individuos y se perpetúa por la herencia" },
  { letter: "X", mode: c, answer: "MANIC PIXIE DREAM GIRL", question: "Palabra compuesta, según el crítico de cine estadounidense Nathan Rabin: \"criatura cinematográfica burbujeante y superficial que sólo existe en la febril imaginación de escritores/directores sensibles para enseñar a las jóvenes almas depresivas a abrazar la vida\"" },
  { letter: "Y", mode: c, answer: "PAPYRUS", question: "Fuente tipográfica de estilo romano caligráfico y de fantasía diseñada en 1982 por Chris Costello" },
  { letter: "Z", mode: s, answer: "ZORRA", question: "Canción que presentó España en Eurovisión 2024 cantada por el grupo Nebulossa" },
];

export const pagalafanta = internalMutation({
  args: {},
  handler: async (ctx) => {
    const name = "Pagalafanta";
    const existing = (await ctx.db.query("roscos").collect()).find((r) => r.name === name);
    if (existing) return existing._id;
    return ctx.db.insert("roscos", { name, questions: PAGALAFANTA });
  },
});
