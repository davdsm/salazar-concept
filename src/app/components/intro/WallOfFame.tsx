"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MaskedLine from "@/app/components/intro/MaskedLine";

type Project = {
  category: string;
  industry: string;
  src: string;
};

/* Cinco estandartes. A ordem alterna claro/escuro para o título em difference
   ter sempre contraste por baixo, seja onde for que o pano esteja. */
const PROJECTS: Project[] = [
  { category: "Photography", industry: "Science", src: "/images/industries/science.jpg" },
  { category: "Branding Kit", industry: "Restauration", src: "/images/industries/restauration.jpg" },
  { category: "Art Direction", industry: "Construction", src: "/images/industries/construction.jpg" },
  { category: "Identity", industry: "Retail", src: "/images/legacy/detail-a.jpg" },
  { category: "Campaign", industry: "Culture", src: "/images/legacy/hero.jpg" },
];

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;      // 0..1 dentro da bandeira

uniform vec4 uRect;    // x, y, largura, altura — em pixels do canvas
uniform vec2 uRes;
uniform float uTime;
uniform float uPhase;  // desencontra cada bandeira das vizinhas
uniform float uHover;
uniform float uReveal;

out vec2 vUv;
out float vShade;

void main() {
  vec2 uv = aPos;
  vUv = uv;

  float t = uTime + uPhase;

  /* Presa no varão: não se mexe em cima e abre em baixo. É esta curva que
     separa uma bandeira de um retângulo a tremer. */
  float hang = pow(uv.y, 1.25);
  float amp = (0.55 + uHover * 1.6) * hang;

  float w1 = sin(uv.y * 4.2 - t * 1.15) * 0.62;
  float w2 = sin(uv.y * 7.3 + uv.x * 2.1 - t * 1.75) * 0.28;
  float wave = (w1 + w2) * amp;

  vec2 p = uv;
  p.x += wave * 0.085;
  p.y += sin(uv.x * 3.1 + t * 0.95) * hang * 0.022;

  // Entrada: cai do varão e assenta.
  p.y -= (1.0 - uReveal) * 0.22;

  vec2 px = uRect.xy + p * uRect.zw;
  vec2 ndc = (px / uRes) * 2.0 - 1.0;
  gl_Position = vec4(ndc.x, -ndc.y, 0.0, 1.0);

  /* A luz vem da inclinação da onda, não de um valor arbitrário: é o declive
     do pano que decide se a dobra apanha ou perde luz. */
  float slope = cos(uv.y * 4.2 - t * 1.15) * 4.2 * 0.62 * amp;
  vShade = 1.0 + slope * 0.10;
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
in float vShade;
out vec4 outColor;

uniform sampler2D uTex;
uniform float uReveal;
uniform float uDim;
uniform vec3 uPaper;
uniform vec2 uUvScale;   // recorte "cover"
uniform vec2 uUvOffset;

void main() {
  /* As fotografias não têm todas o mesmo formato, e o estandarte é bem mais
     alto do que largo. Sem este recorte a imagem era esticada para caber. */
  vec2 uv = vUv * uUvScale + uUvOffset;
  vec3 c = texture(uTex, uv).rgb * vShade;
  // As não-apontadas recuam para o bege do fundo em vez de escurecerem.
  c = mix(c, uPaper, uDim * 0.42);
  outColor = vec4(c, uReveal);
}`;

const COLS = 16;
const ROWS = 20;

export default function WallOfFame() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const title = titleRef.current;
    if (!section || !stage || !canvas || !title) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const titleChars = title.querySelectorAll(".text-char");
    const titleTl = gsap.timeline({ paused: true });
    if (reduce) {
      gsap.set(titleChars, { yPercent: 0 });
    } else {
      gsap.set(titleChars, { yPercent: 130, y: 0 });
      titleTl.to(titleChars, {
        yPercent: 0,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.028,
      });
    }

    let titleDelay: gsap.core.Tween | null = null;
    let titlePlayed = false;
    const playTitle = () => {
      if (titlePlayed) return;
      titlePlayed = true;
      if (!reduce) titleTl.play();
    };

    /* O pin do hero desvia o ScrollTrigger; o IO dispara quando o título
       está mesmo no ecrã, por cima das bandeiras — não no flash de montagem. */
    const titleIo = new IntersectionObserver(
      (entries) => {
        if (!entries[entries.length - 1]?.isIntersecting) return;
        titleIo.disconnect();
        if (reduce) playTitle();
        else titleDelay = gsap.delayedCall(0.28, playTitle);
      },
      { threshold: 0.4, rootMargin: "0px 0px -16% 0px" }
    );
    titleIo.observe(title);

    const killTitle = () => {
      titleDelay?.kill();
      titleIo.disconnect();
      titleTl.kill();
    };

    /* O título faz mais caminho que as bandeiras: entra mais abaixo e
       sai mais acima, para o scroll o arrastar através dos panos. */
    const titleTravel = () => Math.min(window.innerHeight * 0.85, 900);
    const syncParallax = () => {
      if (reduce) {
        title.style.transform = "";
        return;
      }
      const r = stage.getBoundingClientRect();
      const p =
        (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      title.style.transform = `translate3d(0, ${(p * titleTravel()).toFixed(2)}px, 0)`;
    };
    syncParallax();

    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) {
      // Sem WebGL2 as bandeiras ficam estáticas via CSS de fallback.
      stage.classList.add("is-flat");
      let flatRaf = 0;
      const tickFlat = () => {
        syncParallax();
        flatRaf = requestAnimationFrame(tickFlat);
      };
      if (!reduce) flatRaf = requestAnimationFrame(tickFlat);
      return () => {
        cancelAnimationFrame(flatRaf);
        killTitle();
      };
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("WallOfFame shader:", gl.getShaderInfoLog(sh));
      }
      return sh;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const u = {
      rect: gl.getUniformLocation(program, "uRect"),
      res: gl.getUniformLocation(program, "uRes"),
      time: gl.getUniformLocation(program, "uTime"),
      phase: gl.getUniformLocation(program, "uPhase"),
      hover: gl.getUniformLocation(program, "uHover"),
      reveal: gl.getUniformLocation(program, "uReveal"),
      dim: gl.getUniformLocation(program, "uDim"),
      uvScale: gl.getUniformLocation(program, "uUvScale"),
      uvOffset: gl.getUniformLocation(program, "uUvOffset"),
      tex: gl.getUniformLocation(program, "uTex"),
      paper: gl.getUniformLocation(program, "uPaper"),
    };

    // Malha da bandeira: os vértices é que ondulam, por isso precisa de linhas
    // que cheguem para a curva ler como pano e não como papel dobrado.
    const verts: number[] = [];
    const idx: number[] = [];
    for (let y = 0; y <= ROWS; y++) {
      for (let x = 0; x <= COLS; x++) verts.push(x / COLS, y / ROWS);
    }
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const a = y * (COLS + 1) + x;
        idx.push(a, a + COLS + 1, a + 1, a + 1, a + COLS + 1, a + COLS + 2);
      }
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    gl.bindVertexArray(null);

    const flags = PROJECTS.map((p, i) => ({
      tex: gl.createTexture()!,
      ready: false,
      aspect: 1, // largura/altura da fotografia, para o recorte cover
      phase: i * 1.9,
      hover: 0,
      hoverTo: 0,
      reveal: 0,
    }));

    flags.forEach((flag, i) => {
      gl.bindTexture(gl.TEXTURE_2D, flag.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([238, 235, 229, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const img = new Image();
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, flag.tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        flag.aspect = img.naturalWidth / Math.max(img.naturalHeight, 1);
        flag.ready = true;
      };
      img.src = PROJECTS[i].src;
    });

    let W = 0;
    let H = 0;
    const layout: { x: number; y: number; w: number; h: number }[] = [];

    /* A altura do palco vem da largura, e não ao contrário.
       Antes era fixa em CSS enquanto a das bandeiras dependia da largura
       disponível: num telemóvel davam 207px dentro de um palco de 390px e
       sobravam 152px de canvas vazio. Derivando-a aqui, não há vazio em
       largura nenhuma. */
    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = Math.max(1, stage.clientWidth);
      const n = PROJECTS.length;

      // Quanto mais estreito o ecrã, mais esguio o estandarte — senão cinco
      // panos lado a lado num telemóvel leem-se como confete.
      const ratio = cssW < 560 ? 3.2 : cssW < 900 ? 2.8 : 2.25;
      const gapR = 0.09; // do lado da bandeira, não do canvas

      let fw = cssW / (n + (n - 1) * gapR);
      let fh = fw * ratio;

      // Em ecrãs baixos (telemóvel deitado) a altura manda, e a largura
      // recua para manter a proporção.
      const maxH = window.innerHeight * 0.68;
      if (fh > maxH) {
        fh = maxH;
        fw = fh / ratio;
      }

      const cssH = Math.round(fh / 0.88);
      if (Math.abs(stage.clientHeight - cssH) > 1) {
        stage.style.height = `${cssH}px`;
      }

      W = Math.max(1, Math.round(cssW * dpr));
      H = Math.max(1, Math.round(cssH * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      gl.viewport(0, 0, W, H);

      const flagW = fw * dpr;
      const flagH = fh * dpr;
      const gap = flagW * gapR;
      const totalW = n * flagW + (n - 1) * gap;
      const left = (W - totalW) / 2;
      const top = (H - flagH) / 2;

      layout.length = 0;
      for (let i = 0; i < n; i++) {
        layout.push({ x: left + i * (flagW + gap), y: top, w: flagW, h: flagH });
      }
    };

    measure();

    const paper = [0.937, 0.925, 0.902];
    let time = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduce) time += dt;
      syncParallax();

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform2f(u.res, W, H);
      gl.uniform1f(u.time, time);
      gl.uniform3f(u.paper, paper[0], paper[1], paper[2]);

      const anyHover = flags.some((f) => f.hoverTo > 0);

      flags.forEach((flag, i) => {
        if (!flag.ready) return;
        const ease = 1 - Math.exp(-dt / 0.22);
        flag.hover += (flag.hoverTo - flag.hover) * ease;

        const r = layout[i];
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, flag.tex);
        gl.uniform1i(u.tex, 0);
        gl.uniform4f(u.rect, r.x, r.y, r.w, r.h);
        gl.uniform1f(u.phase, flag.phase);
        gl.uniform1f(u.hover, flag.hover);
        gl.uniform1f(u.reveal, flag.reveal);
        gl.uniform1f(u.dim, anyHover ? 1 - flag.hover : 0);

        // cover: encolhe o eixo sobrante e centra o que fica de fora
        const flagAspect = r.w / r.h;
        let sx = 1;
        let sy = 1;
        if (flag.aspect > flagAspect) sx = flagAspect / flag.aspect;
        else sy = flag.aspect / flagAspect;
        gl.uniform2f(u.uvScale, sx, sy);
        gl.uniform2f(u.uvOffset, (1 - sx) / 2, (1 - sy) / 2);
        gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
      });

      gl.bindVertexArray(null);
      if (visible) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    /* Cada bandeira desce e assenta, uma a seguir à outra, quando a secção
       entra. Escalonado para lerem como uma fila e não como um bloco.

       O disparo vem do IntersectionObserver e não do ScrollTrigger: acima
       desta secção há um pin que só existe depois do Intro montar, e um
       trigger criado antes disso mede a página sem o pin spacer e dispara
       centenas de píxeis fora do sítio. O IO não depende dessa ordem. */
    let revealed = false;
    const revealTl = gsap.timeline({ paused: true });
    flags.forEach((flag, i) => {
      revealTl.to(flag, { reveal: 1, duration: 0.9, ease: "power3.out" }, i * 0.11);
    });
    const revealNow = () => {
      if (revealed) return;
      revealed = true;
      if (reduce) flags.forEach((f) => (f.reveal = 1));
      else revealTl.play();
    };

    /* As bandeiras vivem no canvas, mas as legendas são HTML: sem isto o
       destaque acontecia só metade das vezes. */
    const items = Array.from(
      section.querySelectorAll<HTMLElement>(".fame-item"),
    );
    const syncLegend = () => {
      const any = flags.some((f) => f.hoverTo > 0);
      items.forEach((el, i) => {
        el.classList.toggle("is-on", flags[i]?.hoverTo > 0);
        el.classList.toggle("is-off", any && !(flags[i]?.hoverTo > 0));
      });
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      flags.forEach((flag, i) => {
        const r = layout[i];
        const inside = x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
        flag.hoverTo = inside ? 1 : 0;
      });
      syncLegend();
    };
    const onLeave = () => {
      flags.forEach((f) => (f.hoverTo = 0));
      syncLegend();
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    const io = new IntersectionObserver((entries) => {
      const now = entries[entries.length - 1]?.isIntersecting ?? true;
      if (now) {
        revealNow();
        syncParallax();
      }
      if (now && !visible) {
        visible = true;
        last = performance.now();
        raf = requestAnimationFrame(draw);
      } else if (!now) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(stage);

    return () => {
      killTitle();
      cancelAnimationFrame(raf);
      revealTl.kill();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
      flags.forEach((f) => gl.deleteTexture(f.tex));
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(ibo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <section ref={sectionRef} className="fame" aria-labelledby="fame-title">
      <div ref={stageRef} className="fame-stage">
        <canvas ref={canvasRef} className="fame-canvas" aria-hidden="true" />
        <h2 ref={titleRef} id="fame-title" className="fame-title">
          <MaskedLine text="Wall of Fame" />
        </h2>
      </div>

      <ul className="fame-legend">
        {PROJECTS.map((p) => (
          <li className="fame-item" key={p.category + p.industry}>
            <span className="fame-cat">{p.category}</span>
            <span className="fame-ind">{p.industry}</span>
          </li>
        ))}
      </ul>

      <a className="fame-cta" href="/work">
        <span>See the portfolio</span>
        <svg viewBox="0 0 24 12" aria-hidden="true">
          <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </a>
    </section>
  );
}
