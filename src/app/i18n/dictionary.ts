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
  switcher: { label: string; veil: string; showroom: string };
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
    lede: string;
    filterLabel: string;
    filterAll: string;
    filters: Record<string, string>;
    project: {
      back: string;
      cta: string;
      approach: string;
      outcome: string;
      next: string;
      cases: Record<
        string,
        {
          title: string;
          lede: string;
          body: string;
          approach: string;
          outcome: string;
          frames: readonly [string, string, string];
        }
      >;
    };
  };
  transition: { home: string; work: string };
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
  switcher: { label: "Language", veil: "English", showroom: "Showroom" },
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
    meta: "Selected work · Salazar Concept.",
    back: "Back",
    eyebrow: "Selected work",
    title: "Every angle.",
    lede: "A showroom of brands seen from every side: art direction, photography, identity and the habitats we build around them.",
    filterLabel: "Filter work",
    filterAll: "All",
    filters: {
      "art-direction": "Art Direction",
      photography: "Photography",
      branding: "Branding",
      identity: "Identity",
      website: "Website",
      direction: "Direction",
      campaign: "Campaign",
      fashion: "Fashion",
      food: "Food",
      sports: "Sports",
    },
    project: {
      back: "Showroom",
      cta: "Start a journey",
      approach: "Approach",
      outcome: "What held",
      next: "Next project",
      cases: {
        "tia-xica": {
          title: "Light you can taste.",
          lede: "Photography that makes Tia Xica feel like a place you already miss: warm glass, slow lamps, appetite in the frame.",
          body: "We built a visual language around the table: texture first, people second, brand always present without shouting. Every frame is a habitat.",
          approach:
            "Shoot for appetite and memory. Keep the palette close to the room: brass, linen, deep shadow, so the brand sits inside the meal, not on top of it.",
          outcome:
            "A library of images that works for menu, social and the room itself. Guests recognise the place before they read the name.",
          frames: ["Service", "Atmosphere", "Detail"],
        },
        walkys: {
          title: "A world that moves.",
          lede: "Art direction for Walkys: still frames with energy underneath, product as character, city as stage.",
          body: "Direction held the frame while the shoe carried the story. Industrial metal, cool air, a chameleon looking at fashion from the ground up.",
          approach:
            "Build a single habitat: crate, fence, sky. Let materials do the talking. Keep type off the hero and let the object earn the silence.",
          outcome:
            "A campaign world that stretches from lookbook to wall of fame: sharp, wearable, hard to forget.",
          frames: ["Product", "Habitat", "Motion"],
        },
        taiponte: {
          title: "Stone that speaks soft.",
          lede: "A brand system for Taiponte that settles into timber, rock and the quiet of a finished house.",
          body: "Identity as architecture: mark, material, silence. We designed for the long view: plaques, documents, spaces that outlast the launch week.",
          approach:
            "Start from the site. Extract contrast from stone and chalk. Keep the chameleon as a quiet witness, not a mascot.",
          outcome:
            "A system that feels built, not applied: readable on a gate, a proposal and a night photograph.",
          frames: ["Mark", "Material", "Place"],
        },
        "sek-identity": {
          title: "A mark before a word.",
          lede: "SEK, rewritten as a sign you recognise before you read it: sharp, calm, impossible to mistype in memory.",
          body: "Geometry with air. We reduced the identity to a few cuts of light against landscape, so the logo could live on glass, print and coast.",
          approach:
            "Pair the mark with habitat photography. Let negative space do half the work. Keep secondary type quiet and precise.",
          outcome:
            "An identity that holds at every scale: from a favicon to a bay at golden hour.",
          frames: ["Symbol", "Coast", "System"],
        },
        "sek-website": {
          title: "The same calm, online.",
          lede: "SEK on the web: motion with the precision of the mark, pages that feel measured rather than busy.",
          body: "We translated identity into interface: slow reveals, clear hierarchy, imagery that breathes. The site is another room in the same house.",
          approach:
            "Design for scroll as a corridor. Keep interactions few and exact. Let photography carry temperature; UI stays almost invisible.",
          outcome:
            "A digital surface that feels continuous with the brand: not a brochure pasted onto a template.",
          frames: ["Screen", "Flow", "Touch"],
        },
        movimento: {
          title: "Bodies in blue light.",
          lede: "Direction for a stage that refuses stillness: cool spotlights, open arms, a story told in gesture.",
          body: "We framed performance as brand: contrast, silhouette, the moment just before the jump. Emotion first, logo later.",
          approach:
            "Shoot for kinetic stillness. Prefer one strong gesture over a crowded scene. Keep colour intentional and rare.",
          outcome:
            "Images that sell the night before the ticket: and still work the morning after.",
          frames: ["Gesture", "Stage", "Afterglow"],
        },
        palco: {
          title: "Sky as set design.",
          lede: "A campaign built on horizon lines: railings, weather, the pause before the show begins.",
          body: "Outside the theatre, the brand still had to feel like arrival. We used air and architecture as the overture.",
          approach:
            "Treat the empty balcony as a character. Minimal type. Maximum atmosphere. Let weather finish the composition.",
          outcome:
            "A campaign language that extends from poster to entrance without losing breath.",
          frames: ["Threshold", "Weather", "Arrival"],
        },
        estudio: {
          title: "Kitchen as cathedral.",
          lede: "Studio photography for craft: steel, steam, hands that know the recipe by heart.",
          body: "We lit work as ritual. Black and white where colour would distract; grain where polish would lie.",
          approach:
            "Stay close to process. Prefer honesty over food styling. Keep the frame humble so the craft can be loud.",
          outcome:
            "A set of images that respect the kitchen and still feel premium on a wall.",
          frames: ["Craft", "Heat", "Quiet"],
        },
        atelier: {
          title: "Fashion in mid-air.",
          lede: "A floating product world for Atelier: sky, lace, the shoe as a small architecture.",
          body: "We removed the ground and kept the desire. Clean air, sharp product, a habitat that could only belong to this brand.",
          approach:
            "Isolate the object. Use sky as studio. Keep shadows soft enough to feel expensive, hard enough to feel real.",
          outcome:
            "Hero assets that travel from campaign to e-commerce without losing altitude.",
          frames: ["Object", "Air", "Desire"],
        },
        mesa: {
          title: "One bite, whole brand.",
          lede: "Food as portrait: close, precise, no props that steal the scene.",
          body: "We treated sushi like jewellery: light, edge, negative space. Appetite is a kind of attention.",
          approach:
            "Macro with restraint. One subject, one idea. Let colour come from the plate, not the grade.",
          outcome:
            "A visual bite that works on a menu board and a billboard the same way.",
          frames: ["Bite", "Edge", "Plate"],
        },
        pista: {
          title: "Legs that write the match.",
          lede: "Sports direction from the ground: boots, grass, the second before the pass.",
          body: "We looked at the game the way a chameleon looks at habitat: low, alert, adapted. Brand lives in the motion, not the badge.",
          approach:
            "Crop for force. Prefer field texture over stadium spectacle. Keep human scale in every frame.",
          outcome:
            "Campaign stills that feel mid-play: useful for social, print and the tunnel wall.",
          frames: ["Field", "Force", "Pace"],
        },
      },
    },
  },
  transition: { home: "Concept", work: "Portfolio" },
  footer: {
    contact: "CONTACT US",
    studio: "SALAZAR CONCEPT · STUDIO",
    agency: "CREATIVE AGENCY",
    follow: "FOLLOW",
    question: "So, what is your idea?",
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
        label: "01 · Name",
        placeholder: "Your name",
        error: "Just your name is enough",
      },
      idea: {
        label: "02 · Idea",
        placeholder: "Describe your idea",
        error: "A few words is plenty",
      },
      email: {
        label: "03 · Email",
        placeholder: "you@email.com",
        error: "That email looks incomplete",
      },
      phone: {
        label: "04 · Phone",
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
  switcher: { label: "Idioma", veil: "Português", showroom: "Showroom" },
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
    meta: "Trabalho seleccionado · Salazar Concept.",
    back: "Voltar",
    eyebrow: "Trabalho seleccionado",
    title: "Todos os ângulos.",
    lede: "Um showroom de marcas vistas de todos os lados: direcção de arte, fotografia, identidade e os habitats que construímos à volta delas.",
    filterLabel: "Filtrar trabalho",
    filterAll: "Tudo",
    filters: {
      "art-direction": "Direção de Arte",
      photography: "Fotografia",
      branding: "Branding",
      identity: "Identidade",
      website: "Website",
      direction: "Direção",
      campaign: "Campanha",
      fashion: "Moda",
      food: "Food",
      sports: "Desporto",
    },
    project: {
      back: "Showroom",
      cta: "Começar a viagem",
      approach: "Abordagem",
      outcome: "O que ficou",
      next: "Projeto seguinte",
      cases: {
        "tia-xica": {
          title: "Luz que se saboreia.",
          lede: "Fotografia que faz a Tia Xica sentir-se a um sítio de que já tens saudades: vidro quente, candeeiros lentos, apetite no enquadramento.",
          body: "Construímos uma linguagem visual à volta da mesa: textura primeiro, pessoas depois, marca sempre presente sem gritar. Cada frame é um habitat.",
          approach:
            "Filmar para o apetite e para a memória. Manter a paleta perto da sala: latão, linho, sombra funda, para a marca assentar dentro da refeição, não por cima.",
          outcome:
            "Uma biblioteca de imagens que serve menu, social e a própria sala. Os clientes reconhecem o sítio antes de lerem o nome.",
          frames: ["Serviço", "Atmosfera", "Detalhe"],
        },
        walkys: {
          title: "Um mundo que se move.",
          lede: "Direção de arte para a Walkys: frames quietos com energia por baixo, o produto como personagem, a cidade como palco.",
          body: "A direcção segurou o enquadramento enquanto o sapato carregava a história. Metal industrial, ar fresco, um camaleão a olhar a moda desde o chão.",
          approach:
            "Construir um só habitat: contentor, rede, céu. Deixar os materiais falarem. Tirar tipografia do herói e deixar o objecto merecer o silêncio.",
          outcome:
            "Um mundo de campanha que vai do lookbook ao mural da fama: afiado, vestível, difícil de esquecer.",
          frames: ["Produto", "Habitat", "Movimento"],
        },
        taiponte: {
          title: "Pedra que fala baixo.",
          lede: "Um sistema de marca para a Taiponte que assenta na madeira, na rocha e no silêncio de uma casa pronta.",
          body: "Identidade como arquitectura: marca, material, silêncio. Desenhámos para o longo prazo: placas, documentos, espaços que sobrevivem à semana de lançamento.",
          approach:
            "Começar pelo sítio. Extrair contraste da pedra e do giz. Manter o camaleão como testemunha quieta, não como mascote.",
          outcome:
            "Um sistema que parece construído, não aplicado: legível num portão, numa proposta e numa fotografia nocturna.",
          frames: ["Marca", "Material", "Lugar"],
        },
        "sek-identity": {
          title: "Uma marca antes da palavra.",
          lede: "A SEK, reescrita como um sinal que reconheces antes de o leres: limpa, calma, impossível de esquecer.",
          body: "Geometria com ar. Reduzimos a identidade a poucos cortes de luz contra a paisagem, para o logo viver em vidro, impressão e costa.",
          approach:
            "Emparelhar a marca com fotografia de habitat. Deixar o espaço negativo fazer metade do trabalho. Manter a tipografia secundária quieta e precisa.",
          outcome:
            "Uma identidade que segura em todas as escalas: do favicon a uma baía ao pôr do sol.",
          frames: ["Símbolo", "Costa", "Sistema"],
        },
        "sek-website": {
          title: "A mesma calma, online.",
          lede: "A SEK na web: movimento com a precisão da marca, páginas que se sentem medidas e não ocupadas.",
          body: "Traduzimos identidade em interface: revelações lentas, hierarquia clara, imagem que respira. O site é mais uma sala da mesma casa.",
          approach:
            "Desenhar o scroll como um corredor. Poucas interacções, todas exactas. A fotografia traz temperatura; a UI quase desaparece.",
          outcome:
            "Uma superfície digital contínua com a marca: não um brochure colado num template.",
          frames: ["Ecrã", "Fluxo", "Toque"],
        },
        movimento: {
          title: "Corpos em luz azul.",
          lede: "Direção para um palco que recusa a quietude: holofotes frios, braços abertos, uma história contada em gesto.",
          body: "Enquadrámos a performance como marca: contraste, silhueta, o instante antes do salto. Emoção primeiro, logo depois.",
          approach:
            "Filmar quietude cinética. Preferir um gesto forte a uma cena cheia. Cor intencional e rara.",
          outcome:
            "Imagens que vendem a noite antes do bilhete: e ainda funcionam na manhã seguinte.",
          frames: ["Gesto", "Palco", "Rescaldo"],
        },
        palco: {
          title: "O céu como cenário.",
          lede: "Uma campanha feita de horizontes: grades, tempo, a pausa antes do espectáculo.",
          body: "Fora do teatro, a marca ainda tinha de sentir-se a uma chegada. Usámos ar e arquitectura como abertura.",
          approach:
            "Tratar a varanda vazia como personagem. Tipografia mínima. Atmosfera máxima. Deixar o tempo acabar a composição.",
          outcome:
            "Uma linguagem de campanha que vai do cartaz à entrada sem perder fôlego.",
          frames: ["Limiar", "Tempo", "Chegada"],
        },
        estudio: {
          title: "Cozinha como catedral.",
          lede: "Fotografia de estúdio para o ofício: aço, vapor, mãos que sabem a receita de cor.",
          body: "Iluminámos o trabalho como ritual. Preto e branco onde a cor distrairia; grain onde o polish mentiria.",
          approach:
            "Ficar perto do processo. Preferir honestidade ao food styling. Manter o frame humilde para o ofício poder ser alto.",
          outcome:
            "Um conjunto de imagens que respeita a cozinha e ainda se sente premium numa parede.",
          frames: ["Ofício", "Calor", "Quieto"],
        },
        atelier: {
          title: "Moda a meio do ar.",
          lede: "Um mundo de produto a flutuar para o Atelier: céu, cordão, o sapato como pequena arquitectura.",
          body: "Tiramos o chão e ficámos com o desejo. Ar limpo, produto afiado, um habitat que só podia ser desta marca.",
          approach:
            "Isolar o objecto. Usar o céu como estúdio. Sombras moles o bastante para parecerem caras, duras o bastante para parecerem reais.",
          outcome:
            "Assets de herói que viajam da campanha ao e-commerce sem perder altitude.",
          frames: ["Objecto", "Ar", "Desejo"],
        },
        mesa: {
          title: "Uma dentada, a marca toda.",
          lede: "Comida como retrato: perto, precisa, sem props a roubar a cena.",
          body: "Tratámos o sushi como joalharia: luz, aresta, espaço negativo. Apetite é uma forma de atenção.",
          approach:
            "Macro com contenção. Um sujeito, uma ideia. A cor vem do prato, não da grade.",
          outcome:
            "Uma dentada visual que funciona num menu e num outdoor da mesma maneira.",
          frames: ["Dentada", "Aresta", "Prato"],
        },
        pista: {
          title: "Pernas que escrevem o jogo.",
          lede: "Direção desportiva desde o chão: botas, relva, o segundo antes do passe.",
          body: "Olhámos o jogo como um camaleão olha um habitat: baixo, alerta, adaptado. A marca vive no movimento, não no emblema.",
          approach:
            "Cortar para a força. Preferir textura do campo ao espectáculo do estádio. Escala humana em todos os frames.",
          outcome:
            "Stills de campanha que parecem a meio do lance: úteis para social, impressão e o túnel.",
          frames: ["Campo", "Força", "Ritmo"],
        },
      },
    },
  },
  transition: { home: "Conceito", work: "Portfólio" },
  footer: {
    contact: "FALA CONNOSCO",
    studio: "SALAZAR CONCEPT · ESTÚDIO",
    agency: "AGÊNCIA CRIATIVA",
    follow: "SEGUE",
    question: "Então, qual é a tua ideia?",
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
        label: "01 · Nome",
        placeholder: "O teu nome",
        error: "Basta o teu nome",
      },
      idea: {
        label: "02 · Ideia",
        placeholder: "Descreve a tua ideia",
        error: "Bastam umas palavras",
      },
      email: {
        label: "03 · Email",
        placeholder: "tu@email.com",
        error: "Esse email parece incompleto",
      },
      phone: {
        label: "04 · Telefone",
        placeholder: "+351 912 345 678",
        error: "Esse número parece incompleto",
      },
    },
  },
};

export const DICTIONARIES: Record<Lang, Dictionary> = { en, pt };
