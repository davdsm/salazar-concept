export const LANGS = ["pt", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_COOKIE = "sc-lang";
export const LANG_HEADER = "x-sc-lang";

export function isLang(value: unknown): value is Lang {
  return value === "pt" || value === "en";
}

type Industry = { lead: string; name: string };
type Field = { label: string; placeholder: string; error: string };

export type Dictionary = {
  meta: { description: string };
  switcher: { label: string; veil: string };
  intro: {
    curtainTop: string;
    curtainBottom: string;
    phrase: string;
    statement: string;
    statementLines: readonly [string, string];
    sense: string;
    senseLines: readonly [string, string];
    aboutTitle: string;
    aboutBody: string;
    industries: readonly [Industry, Industry, Industry, Industry];
    industriesLabel: string;
  };
  legacy: { lead: string; title: string; titleEm: string; body: string };
  fame: {
    title: string;
    cta: string;
    categories: readonly [string, string, string, string, string];
  };
  portfolio: {
    meta: string;
    back: string;
    eyebrow: string;
    title: string;
    titleLines: readonly [string, string];
    lede: string;
    scroll: string;
    indexLabel: string;
    of: string;
    outroTitle: string;
    outroBody: string;
    outroCta: string;
    projects: readonly [
      { blurb: string },
      { blurb: string },
      { blurb: string },
      { blurb: string },
      { blurb: string },
    ];
  };
  footer: {
    contact: string;
    studio: string;
    agency: string;
    follow: string;
    question: string;
  };
  inquiry: {
    start: string;
    back: string;
    send: string;
    next: string;
    required: string;
    failed: string;
    done: string;
    subject: string;
    mail: { name: string; email: string; phone: string; idea: string };
    fields: {
      name: Field;
      idea: Field;
      email: Field;
      phone: Field;
    };
  };
};

const en: Dictionary = {
  meta: {
    description:
      "The Salazar Concept is a universal concept inspired by an icon capable of looking at a market from a 360 angle.",
  },
  switcher: { label: "Language", veil: "English" },
  intro: {
    curtainTop: "EMBRACE",
    curtainBottom: "THE CONCEPT",
    phrase: "ART FROM EVERY ANGLE.",
    statement: "WE DON'T CREATE TO BE SEEN.",
    statementLines: ["WE DON'T CREATE", "TO BE SEEN."],
    sense: "WE CREATE TO BE FELT.",
    senseLines: ["WE CREATE", "TO BE FELT."],
    aboutTitle: "Salazar Concept, Creative Agency,",
    aboutBody:
      "True concepts are those that express a very strong definition and are well consolidated by everyone around the world. The Salazar Concept is a universal concept that was inspired by an icon capable of looking at a market from a 360 angle and capable of camouflaging itself and adapting to different ecosystems or business habitats.",
    industries: [
      { lead: "FROM", name: "CONSTRUCTION," },
      { lead: "TO", name: "FOOD," },
      { lead: "TO", name: "SPORTS," },
      { lead: "TO", name: "FASHION." },
    ],
    industriesLabel: "From construction, to food, to sports, to fashion.",
  },
  legacy: {
    lead: "A brand becomes something you never forget.",
    title: "Made once.",
    titleEm: "Impact forever.",
    body: "What we create is not made for the moment alone. It is shaped to hold its meaning, its beauty, and its place long after the first impression has passed. Every project is built to endure, with the same care on the hundredth day as on the first.",
  },
  fame: {
    title: "Wall of Fame",
    cta: "See the portfolio",
    categories: [
      "Art Direction",
      "Photography",
      "Branding",
      "Identity",
      "Website",
    ],
  },
  portfolio: {
    meta: "Selected work — Salazar Concept.",
    back: "Back",
    eyebrow: "Selected work",
    title: "EVERY ANGLE.",
    titleLines: ["EVERY", "ANGLE."],
    lede: "Five pieces. Five habitats. One chameleon looking at each brand from every side.",
    scroll: "Scroll to turn",
    indexLabel: "Index",
    of: "of",
    outroTitle: "Your angle next.",
    outroBody: "We don’t create to be seen. We create to be felt — tell us what you want the world to feel.",
    outroCta: "Start a journey",
    projects: [
      {
        blurb:
          "A world built for Walkys — direction that holds the frame still while the energy moves.",
      },
      {
        blurb:
          "Light, texture and appetite. Photography that makes Tia Xica taste like a place you already miss.",
      },
      {
        blurb:
          "A brand system for Taiponte that settles into stone, timber and the quiet of a finished house.",
      },
      {
        blurb:
          "SEK, rewritten as a mark you recognise before you read it — sharp, calm, impossible to forget.",
      },
      {
        blurb:
          "The same identity, now online. A website that moves with the precision of the brand behind it.",
      },
    ],
  },
  footer: {
    contact: "CONTACT US",
    studio: "SALAZAR CONCEPT — STUDIO",
    agency: "CREATIVE AGENCY",
    follow: "FOLLOW",
    question: "So — what is your idea?",
  },
  inquiry: {
    start: "Start journey",
    back: "Back",
    send: "Send",
    next: "Continue",
    required: "Required",
    failed: "Couldn’t send, try again in a moment",
    done: "We’ll write back soon.",
    subject: "Start journey",
    mail: { name: "Name", email: "Email", phone: "Phone", idea: "Idea" },
    fields: {
      name: {
        label: "01 — Name",
        placeholder: "Your name",
        error: "Just your name is enough",
      },
      idea: {
        label: "02 — Idea",
        placeholder: "Describe your idea",
        error: "A few words is plenty",
      },
      email: {
        label: "03 — Email",
        placeholder: "you@email.com",
        error: "That email looks incomplete",
      },
      phone: {
        label: "04 — Phone",
        placeholder: "+351 912 345 678",
        error: "That number looks incomplete",
      },
    },
  },
};

const pt: Dictionary = {
  meta: {
    description:
      "O Salazar Concept é um conceito universal, inspirado num ícone capaz de olhar para um mercado a 360 graus.",
  },
  switcher: { label: "Idioma", veil: "Português" },
  intro: {
    curtainTop: "ABRAÇA",
    curtainBottom: "O CONCEITO",
    phrase: "ARTE DE TODOS OS ÂNGULOS.",
    statement: "NÃO CRIAMOS PARA SER VISTOS.",
    statementLines: ["NÃO CRIAMOS PARA", "SER VISTOS."],
    sense: "CRIAMOS PARA SER SENTIDOS.",
    senseLines: ["CRIAMOS PARA", "SER SENTIDOS."],
    aboutTitle: "Salazar Concept, Agência Criativa,",
    aboutBody:
      "Os verdadeiros conceitos são aqueles que exprimem uma definição muito forte e que estão bem consolidados por todos, em todo o mundo. O Salazar Concept é um conceito universal, inspirado num ícone capaz de olhar para um mercado a 360 graus, de se camuflar e de se adaptar a diferentes ecossistemas ou habitats de negócio.",
    industries: [
      { lead: "DA", name: "CONSTRUÇÃO," },
      { lead: "À", name: "RESTAURAÇÃO," },
      { lead: "AO", name: "DESPORTO," },
      { lead: "À", name: "MODA." },
    ],
    industriesLabel: "Da construção, à restauração, ao desporto, à moda.",
  },
  legacy: {
    lead: "Uma marca torna-se algo que nunca esqueces.",
    title: "Feito uma vez.",
    titleEm: "Impacto para sempre.",
    body: "O que criamos não é feito só para o momento. É pensado para manter o seu significado, a sua beleza e o seu lugar muito depois da primeira impressão. Cada projeto é construído para durar, com o mesmo cuidado no centésimo dia que no primeiro.",
  },
  fame: {
    title: "Mural da Fama",
    cta: "Ver o portfólio",
    categories: [
      "Direção de Arte",
      "Fotografia",
      "Branding",
      "Identidade",
      "Website",
    ],
  },
  portfolio: {
    meta: "Trabalho seleccionado — Salazar Concept.",
    back: "Voltar",
    eyebrow: "Trabalho seleccionado",
    title: "TODOS OS ÂNGULOS.",
    titleLines: ["TODOS OS", "ÂNGULOS."],
    lede: "Cinco peças. Cinco habitats. Um camaleão a olhar para cada marca de todos os lados.",
    scroll: "Desliza para virar",
    indexLabel: "Índice",
    of: "de",
    outroTitle: "O teu ângulo a seguir.",
    outroBody: "Não criamos para ser vistos. Criamos para ser sentidos — diz-nos o que queres que o mundo sinta.",
    outroCta: "Começar a viagem",
    projects: [
      {
        blurb:
          "Um mundo para a Walkys — direcção que segura o enquadramento enquanto a energia se move.",
      },
      {
        blurb:
          "Luz, textura e apetite. Fotografia que faz a Tia Xica saborear a um sítio de que já tens saudades.",
      },
      {
        blurb:
          "Um sistema de marca para a Taiponte que assenta na pedra, na madeira e no silêncio de uma casa pronta.",
      },
      {
        blurb:
          "A SEK, reescrita como uma marca que reconheces antes de a leres — limpa, calma, impossível de esquecer.",
      },
      {
        blurb:
          "A mesma identidade, agora online. Um website que se move com a precisão da marca que o carrega.",
      },
    ],
  },
  footer: {
    contact: "FALA CONNOSCO",
    studio: "SALAZAR CONCEPT — ESTÚDIO",
    agency: "AGÊNCIA CRIATIVA",
    follow: "SEGUE",
    question: "Então — qual é a tua ideia?",
  },
  inquiry: {
    start: "Começar a viagem",
    back: "Voltar",
    send: "Enviar",
    next: "Continuar",
    required: "Obrigatório",
    failed: "Não foi possível enviar, tenta de novo daqui a pouco",
    done: "Respondemos em breve.",
    subject: "Nova viagem",
    mail: { name: "Nome", email: "Email", phone: "Telefone", idea: "Ideia" },
    fields: {
      name: {
        label: "01 — Nome",
        placeholder: "O teu nome",
        error: "Basta o teu nome",
      },
      idea: {
        label: "02 — Ideia",
        placeholder: "Descreve a tua ideia",
        error: "Bastam umas palavras",
      },
      email: {
        label: "03 — Email",
        placeholder: "tu@email.com",
        error: "Esse email parece incompleto",
      },
      phone: {
        label: "04 — Telefone",
        placeholder: "+351 912 345 678",
        error: "Esse número parece incompleto",
      },
    },
  },
};

export const DICTIONARIES: Record<Lang, Dictionary> = { en, pt };
